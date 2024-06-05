import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
    text: String,
    author: String,
});

export const Quote = mongoose.model('Quote', quoteSchema);
