import express from 'express';
import { Quote } from '../config/models/quote-model.js';

const quoteRouter = express.Router()

// Quote routes
quoteRouter.get('/quotes', async (req, res) => {
    const quotes = await Quote.find();
    res.status(200).json(quotes);
});

quoteRouter.post('/quotes', async (req, res) => {
    const newQuote = new Quote(req.body);
    await newQuote.save();
    res.status(200).json(newQuote);
});

quoteRouter.delete('/quotes', async (req, res) => {
    try {
        await Quote.deleteMany({});
        res.status(200).json({ message: 'All quotes deleted from the database.' });
    } catch (error) {
        console.error('Error clearing quotes from the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

quoteRouter.get('/quote', async (req, res) => {
    try {
        const count = await Quote.countDocuments();
        const randomIndex = Math.floor(Math.random() * count);
        const randomQuote = await Quote.findOne().skip(randomIndex);

        if (randomQuote) {
            res.status(200).json(randomQuote);
        } else {
            res.status(404).json({ error: 'Quote not found' });
        }
    } catch (error) {
        console.error('Error fetching quote:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default quoteRouter