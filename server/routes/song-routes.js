import express from 'express';
import { Song } from '../config/models/song-model.js';


const songRouter = express.Router()
let songs = [];
let currentSongIndex = null;

export const loadSongs = async () => {
    songs = await Song.find({}, '_id filename').lean(); // Fetch only _id and filename fields
};

// Song routes
songRouter.get('/play', async (req, res) => {
    await loadSongs(); // Reload songs before selecting a random song
    currentSongIndex = Math.floor(Math.random() * songs.length);
    const randomSong = songs[currentSongIndex];
    res.json({ id: randomSong._id, filename: randomSong.filename });
});

songRouter.get('/prev', async (req, res) => {
    await loadSongs(); // Reload songs before navigating to the previous song
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    const previousSong = songs[currentSongIndex];
    res.json({ id: previousSong._id, filename: previousSong.filename });
});

songRouter.get('/next', async (req, res) => {
    await loadSongs(); 
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    const nextSong = songs[currentSongIndex];
    res.json({ id: nextSong._id, filename: nextSong.filename });
});

songRouter.get('/songs', async (req, res) => {
    const songs = await Song.find();
    res.status(200).json(songs);
});

songRouter.post('/songs', async (req, res) => {
    const newSong = new Song(req.body);
    await newSong.save();
    res.status(200).json(newSong);
});

songRouter.delete('/songs', async (req, res) => {
    try {
        await Song.deleteMany({});
        res.status(200).json({ message: 'All songs deleted from the database.' });
    } catch (error) {
        console.error('Error clearing songs from the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default songRouter