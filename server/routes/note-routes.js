import express from 'express';
import { Note } from '../config/models/note-model.js'


const noteRouter = express.Router()

// Route to send a note
noteRouter.post('/send-note', async (req, res) => {
    const { sender, receiver, message, timestamp } = req.body;

    try {
        // Create a new instance of the Note model
        const newNote = new Note({ sender, receiver, message, timestamp });

        // Save the note to the database
        await newNote.save();

        res.status(200).json({ message: 'Note sent successfully' });
    } catch (error) {
        console.error('Error sending note:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Route to get all notes for a user
noteRouter.get('/user-notes/:email', async (req, res) => {
    const email = req.params.email;
    console.log('Received email:', email);

    const userNotes = await Note.find({receiver:email})

    console.log('User notes:', userNotes);

    res.status(200).json(userNotes);
})

// Route to delete all notes that are being stored for a specific user
noteRouter.delete('/user-notes/:email', async (req, res) => {
    try {
        const email = req.params.email
        await Note.deleteMany({receiver:email})
        res.status(200).json({ message: 'All quotes deleted from the database.' });
    } catch (error) {
        console.error('Error clearing quotes from the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default noteRouter