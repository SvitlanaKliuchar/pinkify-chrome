import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDb } from './config/connectToDB.js';
import { Song } from './config/models/song-model.js';
import { Quote } from './config/models/quote-model.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { saveSongsToDB, saveQuotesToDB } from './config/saveToDB.js';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let currentSongIndex = null;
let songs = [];

const loadSongs = async () => {
    songs = await Song.find({}, '_id filename').lean(); // Fetch only _id and filename fields
};

// Middleware
app.use(express.json());
app.use(cors()); 
app.use('/songs', express.static(path.join(__dirname, 'songs')));

// Connect to database and load initial data
connectToDb();
saveSongsToDB();
saveQuotesToDB();

// Song routes
app.get('/play', async (req, res) => {
    await loadSongs(); // Reload songs before selecting a random song
    currentSongIndex = Math.floor(Math.random() * songs.length);
    const randomSong = songs[currentSongIndex];
    res.json({ id: randomSong._id, filename: randomSong.filename });
});

app.get('/prev', async (req, res) => {
    await loadSongs(); // Reload songs before navigating to the previous song
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    const previousSong = songs[currentSongIndex];
    res.json({ id: previousSong._id, filename: previousSong.filename });
});

app.get('/next', async (req, res) => {
    await loadSongs(); 
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    const nextSong = songs[currentSongIndex];
    res.json({ id: nextSong._id, filename: nextSong.filename });
});

app.get('/songs', async (req, res) => {
    const songs = await Song.find();
    res.status(200).json(songs);
});

app.post('/songs', async (req, res) => {
    const newSong = new Song(req.body);
    await newSong.save();
    res.status(200).json(newSong);
});

app.delete('/songs', async (req, res) => {
    try {
        await Song.deleteMany({});
        res.status(200).json({ message: 'All songs deleted from the database.' });
    } catch (error) {
        console.error('Error clearing songs from the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Quote routes
app.get('/quotes', async (req, res) => {
    const quotes = await Quote.find();
    res.status(200).json(quotes);
});

app.post('/quotes', async (req, res) => {
    const newQuote = new Quote(req.body);
    await newQuote.save();
    res.status(200).json(newQuote);
});

app.get('/quotes/:id', async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id);
        if (quote) {
            res.status(200).json(quote);
        } else {
            res.status(404).json({ error: 'Quote not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
