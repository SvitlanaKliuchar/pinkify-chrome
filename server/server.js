import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDb } from './config/connectToDB.js';
import { Quote } from './config/models/quote-model.js';
import path from 'path';
import { fileURLToPath } from 'url';
import {  saveQuotesToDB } from './config/saveToDB.js';
import songRouter from './routes/song-routes.js';
import noteRouter from './routes/note-routes.js';
import quoteRouter from './routes/quote-routes.js';
import contactRouter from './routes/contact-routes.js';
import drawingRouter from './routes/drawing-routes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const checkAndSaveData = async() => {
    await connectToDb()

    const quotes = await Quote.find();

    if (quotes.length === 0) {
        await saveQuotesToDB();  
    }
}
checkAndSaveData()


app.use('/', noteRouter);
app.use('/', songRouter)
app.use('/', quoteRouter)
app.use('/', contactRouter)
app.use('/', drawingRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
