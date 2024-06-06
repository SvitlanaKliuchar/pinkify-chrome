import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDb } from './config/connectToDB.js';
import { Song } from './config/models/song-model.js';
import { Quote } from './config/models/quote-model.js';
import { Note } from './config/models/note-model.js'
import path from 'path';
import { fileURLToPath } from 'url';
import { saveSongsToDB, saveQuotesToDB } from './config/saveToDB.js';
import songRouter from './routes/song-routes.js';
import noteRouter from './routes/note-routes.js';
import quoteRouter from './routes/quote-routes.js';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cors()); 
app.use('/songs', express.static(path.join(__dirname, 'songs')));

const checkAndSaveData = async() => {
    await connectToDb()

    const songs = await Song.find();
    const quotes = await Quote.find();

    if (songs.length === 0) {
        await saveSongsToDB();  
    }

    if (quotes.length === 0) {
        await saveQuotesToDB();  
    }
}
checkAndSaveData()


app.use('/', noteRouter);
app.use('/', songRouter)
app.use('/', quoteRouter)



const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
