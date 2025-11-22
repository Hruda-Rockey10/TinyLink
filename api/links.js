const express = require('express');
const router = express.Router();
const db = require('../db');

// Helper to validate URL
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Helper to validate code
function isValidCode(code) {
    return /^[A-Za-z0-9]{6,8}$/.test(code);
}

// Helper to generate random code
function generateCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    const length = Math.floor(Math.random() * 3) + 6; // 6 to 8
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// GET /api/links - List all links
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM links ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /api/links - Create link
router.post('/', async (req, res) => {
    const { url, code } = req.body;

    if (!url || !isValidUrl(url)) {
        return res.status(400).json({ error: 'invalid url' });
    }

    let finalCode = code;

    if (finalCode) {
        if (!isValidCode(finalCode)) {
            return res.status(400).json({ error: 'invalid code' });
        }
        // Check if exists
        const existing = await db.query('SELECT * FROM links WHERE code = $1', [finalCode]);
        if (existing.rows.length > 0) {
            return res.status(409).json({ error: 'code already exists' });
        }
    } else {
        // Generate unique code
        let isUnique = false;
        while (!isUnique) {
            finalCode = generateCode();
            const existing = await db.query('SELECT * FROM links WHERE code = $1', [finalCode]);
            if (existing.rows.length === 0) {
                isUnique = true;
            }
        }
    }

    try {
        const result = await db.query(
            'INSERT INTO links (code, url) VALUES ($1, $2) RETURNING *',
            [finalCode, url]
        );
        res.status(201).json({ code: result.rows[0].code, url: result.rows[0].url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/links/:code - Stats for one code
router.get('/:code', async (req, res) => {
    const { code } = req.params;
    try {
        const result = await db.query('SELECT * FROM links WHERE code = $1', [code]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE /api/links/:code - Delete link
router.delete('/:code', async (req, res) => {
    const { code } = req.params;
    try {
        const result = await db.query('DELETE FROM links WHERE code = $1 RETURNING *', [code]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'not found' });
        }
        res.json({ ok: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
