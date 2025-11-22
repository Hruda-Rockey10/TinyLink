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

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'client/dist')));

// API Routes
app.use('/api/links', linksRouter);

// Health Check
app.get('/healthz', (req, res) => {
    res.json({ ok: true, version: '1.0' });
});

// Redirect Route
app.get('/:code', async (req, res, next) => {
    const { code } = req.params;

    // Skip if it's a frontend route (React Router handles these)
    // This allows /code/:code to work for the Stats page
    if (code === 'code' || code === 'api' || code === 'healthz') {
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
            // Not found - let React Router handle it (might be a frontend route)
            return next();
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Fallback route for React Router (must be last)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
