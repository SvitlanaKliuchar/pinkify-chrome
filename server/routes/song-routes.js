import express from 'express';
import { Song } from '../config/models/song-model.js';
import ytdl from 'ytdl-core';


const songRouter = express.Router()

songRouter.post('/process-urls', async (req, res) => {
    const { urls } = req.body;
    const songs = [];

    for (let url of urls) {
        try {
            const info = await ytdl.getInfo(url);
            const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
            const songName = info.videoDetails.title;
            const filename = `${songName}.mp3`;
            const output = path.resolve(__dirname, 'songs', filename);

            ytdl(url, { format: format })
                .pipe(fs.createWriteStream(output));

            const song = new Song({ title: songName, filename });
            await song.save();

            songs.push({ title: songName, filename });
        } catch (error) {
            console.error('Error processing URL:', error);
            return res.status(500).json({ error: 'Error processing one or more URLs.' });
        }
    }

    res.json({ songs });
});

songRouter.get('/songs/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.resolve(__dirname, 'songs', filename);
    res.sendFile(filePath);
});

songRouter.get('/has-songs', async (req, res) => {
    const songCount = await Song.countDocuments();
    res.json({ hasSongs: songCount > 0 });
});

songRouter.get('/play', async (req, res) => {
    const song = await Song.findOne();
    if (song) {
        res.json({ filename: song.filename });
    } else {
        res.status(404).json({ error: 'No songs found' });
    }
});

songRouter.get('/prev', async (req, res) => {
    // Implement logic for previous song
});

songRouter.get('/next', async (req, res) => {
    // Implement logic for next song
});

export default songRouter