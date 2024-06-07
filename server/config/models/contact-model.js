import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    user: {type: String, required: true},
    contactEmail: {type: String, required:true},
    contactName: {type: String},
});

export const Contact = mongoose.model('Contact', contactSchema);

