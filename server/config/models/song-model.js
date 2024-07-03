import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    filePath: { type: String, required: true },
    youtubeId: { type: String, required: true },
    duration: { type: Number, required: true },
    userId: { type: String, required: true },
});

const Song = mongoose.model('Song', songSchema);

export default Song;
