const express = require('express');
const router = express.Router();
const Comic = require('../models/Comic');

// Get all comics
router.get('/', async (req, res) => {
    try {
        const comics = await Comic.find();
        res.json(comics);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get comic by ID
router.get('/:id', async (req, res) => {
    try {
        const comic = await Comic.findById(req.params.id);
        if (!comic) {
            return res.status(404).json({ message: 'Comic not found' });
        }
        res.json(comic);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// Search comics by title
router.get('/search', async (req, res) => {
    const { title } = req.query;
    try {
        const comics = await Comic.find({ title: { $regex: title, $options: 'i' } });
        res.json(comics);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// Search comics by genre
router.get('/genre/:genre', async (req, res) => {
    const { genre } = req.params;
    try {
        const comics = await Comic.find({ genre: { $regex: genre, $options: 'i' } });
        res.json(comics);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
