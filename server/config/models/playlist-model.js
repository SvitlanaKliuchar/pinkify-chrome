import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }]
});

export const Playlist = mongoose.model('Playlist', playlistSchema);
