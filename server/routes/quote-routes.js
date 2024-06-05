import express from 'express'
import { Quote } from '../config/models/quote-model.js'

const quoteRouter = express.Router()

router.get('/api/quotes', async (req, res) => {
    const quotes = await Quote.find()
    res.status(200).json(quotes)
})

router.post('/api/quotes', async (req, res) => {
    const newQuote = new Quote(req.body)
    await newQuote.save()
    res.status(200).json(newQuote)
})

router.get('/api/quote/:id', async (req, res) => {
    const quote = await Quote.findOne()
})

export default quoteRouter