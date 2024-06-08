import express from 'express';
import { Note } from '../config/models/note-model.js';
import { Contact } from '../config/models/contact-model.js';

const noteRouter = express.Router();

// Route to send a note
noteRouter.post('/send-note', async (req, res) => {
    const { sender, receiver, message, timestamp } = req.body;

    try {
        const newNote = new Note({ sender, receiver, message, timestamp });
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

    try {
        const userNotes = await Note.find({ receiver: email });
        const userContacts = await Contact.find({ user: email });
        const contactEmails = new Set(userContacts.map(contact => contact.contactEmail));

        const newContacts = [];
        for (const note of userNotes) {
            if (!contactEmails.has(note.sender)) {
                const newContact = new Contact({ user: email, contactEmail: note.sender });
                await newContact.save();
                contactEmails.add(note.sender);
                newContacts.push(newContact);
            }
        }

        res.status(200).json(userNotes);
    } catch (error) {
        console.error('Error fetching user notes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to delete all notes that are being stored for a specific user
noteRouter.delete('/user-notes/:email', async (req, res) => {
    const email = req.params.email;

    try {
        await Note.deleteMany({ receiver: email });
        res.status(200).json({ message: 'All notes deleted from the database.' });
    } catch (error) {
        console.error('Error clearing notes from the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to delete a specific note for a specific user
noteRouter.delete('/user-note/:email/:_id', async (req, res) => {
    const email = req.params.email;
    const noteId = req.params._id;

    try {
        await Note.deleteOne({ receiver: email, _id: noteId });
        res.status(200).json({ message: `Note with id ${noteId} was deleted from the database.` });
    } catch (error) {
        console.error('Error deleting a note from the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

noteRouter.post('/toggle-fav-note', async (req, res) => {
    const { email, noteId } = req.body;

    try {
        const note = await Note.findOne({ _id: noteId, receiver: email });
        if (note) {
            note.isFavorite = !note.isFavorite;
            await note.save();
            res.status(200).json({ message: 'Favorite status toggled successfully', note });
        } else {
            res.status(404).json({ error: 'Note not found' });
        }
    } catch (error) {
        console.error('Error toggling favorite note:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Route to get all favorite notes
noteRouter.get('/fav-notes/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const favoriteNotes = await Note.find({ receiver: email, isFavorite: true });
        res.status(200).json(favoriteNotes);
    } catch (error) {
        console.error('Error fetching favorite notes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default noteRouter;
