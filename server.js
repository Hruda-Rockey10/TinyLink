const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const db = require('./db');
const linksRouter = require('./api/links');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/links', linksRouter);

// Health Check
app.get('/healthz', (req, res) => {
    res.json({ ok: true, version: '1.0' });
});

// Redirect Route
app.get('/:code', async (req, res, next) => {
    const { code } = req.params;

    // Skip if it's a static file request that fell through (though express.static should handle it)
    // or if it's 'index.html' etc.
    if (code === 'index.html' || code === 'stats.html') {
        return next();
    }

    try {
        // Atomic update
        const result = await db.query(
            'UPDATE links SET clicks = clicks + 1, last_clicked = now() WHERE code = $1 RETURNING url',
            [code]
        );

        if (result.rows.length > 0) {
            return res.redirect(result.rows[0].url);
        } else {
            // If not found, we can serve 404 page or JSON. Spec says "return 404 (HTML or JSON OK)"
            // Since we have a frontend, maybe serving a 404 page is better, but for now let's send 404 status.
            // We can also check if the user is trying to access a frontend route like /code/:code
            // But /code/:code is handled by the frontend router usually, or we serve index.html?
            // The spec says: GET /code/:code -> Stats page.
            // Since we are using a simple SPA/static setup, we might need to handle /code/:code specifically to serve the stats page.
            // Let's check if the code matches the stats page pattern.
            return res.status(404).send('Not Found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Serve Stats Page for /code/:code
app.get('/code/:code', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'stats.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
