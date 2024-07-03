import express from 'express';
import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import Song from '../config/models/song-model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const songRouter = express.Router();

//serve static files from the songs directory
songRouter.use('/songs', express.static(path.join(__dirname, '..', 'songs')));

//helper function to convert a YouTube URL to MP3 and save it
const convertToMp3 = (url, outputPath) => {
    return new Promise((resolve, reject) => {
        ffmpeg(ytdl(url, { quality: 'highestaudio' }))
            .audioCodec('libmp3lame')
            .audioBitrate(192)
            .toFormat('mp3')
            .save(outputPath)
            .on('end', resolve)
            .on('error', reject);
    });
};

//endpoint to process YouTube URLs and save songs to the database and filesystem
songRouter.post('/process-urls/:userId', async (req, res) => {
    const userId = req.params.userId
    const { urls } = req.body;
    const songs = [];

    try {
        for (const url of urls) {
            try {
                console.log(`Processing URL: ${url}`);
                const info = await ytdl.getInfo(url);
                console.log(`Got video info: ${info.videoDetails.title}`);
                
                const songName = info.videoDetails.title;
                const youtubeId = info.videoDetails.videoId;
                const duration = parseInt(info.videoDetails.lengthSeconds, 10);

                const outputDir = path.resolve(__dirname, '..', 'songs');
                await fs.ensureDir(outputDir);
                console.log(`Ensured directory exists: ${outputDir}`);

                const filePath = path.join(outputDir, `${youtubeId}.mp3`);
                await convertToMp3(url, filePath);
                console.log(`Converted to MP3: ${filePath}`);

                const lastSong = await Song.findOne().sort({ id: -1 });
                const nextId = lastSong ? lastSong.id + 1 : 1;

                const song = new Song({
                    id: nextId,
                    title: songName,
                    filePath,
                    youtubeId,
                    duration,
                    userId: userId
                });

                await song.save();
                console.log(`Saved song to database: ${songName}`);
                songs.push(song);
            } catch (error) {
                console.error(`Error processing URL ${url}:`, error);
            }
        }

        if (songs.length === 0) {
            return res.status(500).json({ error: 'Error processing all URLs.' });
        }

        res.json({ songs });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Unexpected error while processing URLs.' });
    }
});

//endpoint to serve a specific song file by its filename
songRouter.get('/songs/:filename', async (req, res) => {
    const { filename } = req.params;
    const filePath = path.resolve(__dirname, '..', 'songs', filename);
    
    try {
        const exists = await fs.pathExists(filePath);
        if (!exists) {
            return res.status(404).json({ error: 'File not found' });
        }
        res.set('Content-Type', 'audio/mpeg');
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).json({ error: 'Error sending file' });
            }
        });
    } catch (error) {
        console.error('Error serving file:', error);
        res.status(500).json({ error: 'Error serving file' });
    }
});

//endpoint to check if there are any songs in the database
songRouter.get('/has-songs', async (req, res) => {
    try {
        const songCount = await Song.countDocuments();
        res.json({ hasSongs: songCount > 0 });
    } catch (error) {
        console.error('Error checking for songs:', error);
        res.status(500).json({ error: 'Error checking for songs' });
    }
});

//endpoint to fetch details of the currently playing song
songRouter.get('/play', async (req, res) => {
    try {
        const song = await Song.findOne().sort({ id: 1 });
        if (song) {
            res.json({ song: { title: song.title, filename: path.basename(song.filePath) } });
        } else {
            res.status(404).json({ error: 'No songs found' });
        }
    } catch (error) {
        console.error('Error fetching currently playing song:', error);
        res.status(500).json({ error: 'Error fetching currently playing song' });
    }
});

//endpoint to fetch all songs in the playlist of a specific user
songRouter.get('/playlist/:userId', async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).send({ message: 'User ID is required' });
    }

    try {
        const songs = await Song.find({ userId: userId });
        res.send({ songs });
    } catch (error) {
        console.error('Error fetching playlist:', error);
        res.status(500).send({ message: 'Error fetching playlist' });
    }
});

//endpoint to fetch details of a specific song by its id
songRouter.get('/songs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const song = await Song.findOne({ id: parseInt(id, 10) });
        if (song) {
            res.json({ song });
        } else {
            res.status(404).json({ error: 'Song not found' });
        }
    } catch (error) {
        console.error('Error fetching song by id:', error);
        res.status(500).json({ error: 'Error fetching song' });
    }
});

export default songRouter;
