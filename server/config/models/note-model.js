import mongoose from "mongoose";
import { format } from "date-fns";

const noteSchema = new mongoose.Schema({
    sender: {type: String, required: true},
    message: {type: String, required: true},
    receiver: {type: String, required: true},
    timestamp: { type: Date, default: () => format(new Date(), "yyyy-MM-dd HH:mm:ss") }
});

export const Note = mongoose.model('Note', noteSchema);
