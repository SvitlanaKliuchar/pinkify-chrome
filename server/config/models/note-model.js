import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    sender: {type: String, required: true},
    message: {type: String, required: true},
    receiver: {type: String, required: true}
});

export const Note = mongoose.model('Note', noteSchema);
