import express from 'express'
import { Song } from '../config/models/song-model'

const router = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let currentSongIndex = null
let songs = []; 

const loadSongs = async () => {
    songs = await Song.find({}, '_id filename').lean() // Fetch only _id and filename fields
}

loadSongs()

// Route to play a random song
router.get('/play', async (req, res) => {
    await loadSongs(); // Reload songs before selecting a random song
    currentSongIndex = Math.floor(Math.random() * songs.length);
    const randomSong = songs[currentSongIndex];
    res.json({ id: randomSong._id, filename: randomSong.filename });
});

// Route to play a previous song
router.get('/prev', async (req, res) => {
    await loadSongs(); // Reload songs before navigating to the previous song
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    const previousSong = songs[currentSongIndex];
    res.json({ id: previousSong._id, filename: previousSong.filename });
});
// Route to play the next song
router.get('/next', async (req, res) => {
    await loadSongs(); 
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    const nextSong = songs[currentSongIndex];
    res.json({ id: nextSong._id, filename: nextSong.filename });
});

router.get('/api/songs', async (req, res) => {
    const songs = await Song.find()
    res.status(200).json(songs)
})

router.post('/api/songs', async (req, res) => {
    const newSong = new Song(req.body)
    await newSong.save()
    res.status(200).json(newSong)
})
// Route to clear all songs from the database
router.delete('/api/songs', async (req, res) => {
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