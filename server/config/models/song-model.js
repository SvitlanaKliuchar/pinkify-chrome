import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    title: String,
    filename: String,
});

export const Song = mongoose.model('Song', songSchema);

