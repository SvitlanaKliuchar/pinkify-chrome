import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectToDb } from './config/connectToDB.js'
import { Song } from './config/models/song-model.js'
import { Quote } from './config/models/quote-model.js'
import path from 'path'
import { fileURLToPath } from 'url'
import { saveSongsToDB } from './config/saveToDB.js'
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

connectToDb()

//serve static files from the "songs" directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let songs = []; // Array to store song metadata

// Function to load songs from the MongoDB database
const loadSongs = async () => {
    songs = await Song.find({}, '_id filename').lean() // Fetch only _id and filename fields
}

// Load songs when the server starts
loadSongs()

let currentSongIndex = null

app.use('/songs', express.static(path.join(__dirname, 'songs')))

saveSongsToDB()

// Route to play a random song
app.get('/play', async (req, res) => {
    await loadSongs(); // Reload songs before selecting a random song
    currentSongIndex = Math.floor(Math.random() * songs.length);
    const randomSong = songs[currentSongIndex];
    res.json({ id: randomSong._id, filename: randomSong.filename });
});

// Route to play a previous song
app.get('/prev', async (req, res) => {
    await loadSongs(); // Reload songs before navigating to the previous song
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    const previousSong = songs[currentSongIndex];
    res.json({ id: previousSong._id, filename: previousSong.filename });
});
// Route to play the next song
app.get('/next', async (req, res) => {
    await loadSongs(); 
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    const nextSong = songs[currentSongIndex];
    res.json({ id: nextSong._id, filename: nextSong.filename });
});

app.get('/api/songs', async (req, res) => {
    const songs = await Song.find()
    res.status(200).json(songs)
})

app.post('/api/songs', async (req, res) => {
    const newSong = new Song(req.body)
    await newSong.save()
    res.status(200).json(newSong)
})
// Route to clear all songs from the database
app.delete('/api/songs', async (req, res) => {
    try {
        // Delete all documents from the Song collection
        await Song.deleteMany({});
        
        res.status(200).json({ message: 'All songs deleted from the database.' });
    } catch (error) {
        console.error('Error clearing songs from the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//i will add delete song later 

app.get('/api/quotes', async (req, res) => {
    const quotes = await Quote.find()
    res.status(200).json(quotes)
})

app.post('/api/quotes', async (req, res) => {
    const newQuote = new Quote(req.body)
    await newQuote.save()
    res.status(200).json(newQuote)
})

app.get('/api/quote/:id', async (req, res) => {
    const quote = await Quote.findOne()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
