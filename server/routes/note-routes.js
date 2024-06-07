import express from 'express';
import { Note } from '../config/models/note-model.js';
import { Contact } from '../config/models/contact-model.js'

const noteRouter = express.Router();

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

    try {
        // Fetch all notes for the user
        const userNotes = await Note.find({ receiver: email });

        // Fetch all contacts for the user
        const userContacts = await Contact.find({ user: email });

        // Create a set of contact emails for quick lookup
        const contactEmails = new Set(userContacts.map(contact => contact.contactEmail));

        // Iterate through all notes, check if sender is in contacts, and if not, add them
        const newContacts = [];
        for (const note of userNotes) {
            if (!contactEmails.has(note.sender)) {
                const newContact = new Contact({
                    user: email,
                    contactEmail: note.sender,
                });
                await newContact.save();
                contactEmails.add(note.sender); // Update the set to include the new contact
                newContacts.push(newContact); // Collect new contacts
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

// Route to add a favorite note
noteRouter.post('/fav-note', async (req, res) => {
    const { sender, receiver, message, timestamp } = req.body;

    try {
        // Create a new instance of the Note model
        const newFavoriteNote = new Note({ sender, receiver, message, timestamp, isFavorite: true });

        // Save the favorite note to the database
        await newFavoriteNote.save();

        res.status(200).json({ message: 'Favorite note added successfully' });
    } catch (error) {
        console.error('Error adding favorite note:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to remove a favorite note
noteRouter.delete('/fav-note/:email/:_id', async (req, res) => {
    const email = req.params.email;
    const noteId = req.params._id;

    try {
        await Note.deleteOne({ receiver: email, _id: noteId, isFavorite: true });
        res.status(200).json({ message: `Favorite note with id ${noteId} was removed from the database.` });
    } catch (error) {
        console.error('Error removing favorite note:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default noteRouter;
