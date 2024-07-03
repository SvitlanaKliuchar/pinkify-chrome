import express from 'express';
import { Contact } from '../config/models/contact-model.js';

const contactRouter = express.Router();

//get all contacts for a specific user
contactRouter.get('/contacts/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const contacts = await Contact.find({ user: email });
        res.status(200).json(contacts);
    } catch (error) {
        console.error("Error getting all contacts", error);
        res.status(500).send("Error getting all contacts");
    }
});

//add a new contact to contacts db
contactRouter.post('/contacts/new', async (req, res) => {
    try {
        const { user, contactEmail, contactName } = req.body;

        //check if the contact already exists
        const existingContact = await Contact.findOne({ user, contactEmail });
        if (existingContact) {
            console.log(`Contact already exists: ${contactEmail}`);
            return res.status(400).json({ message: 'Contact already exists' });
        }

        const newContact = new Contact({ user, contactEmail, contactName });
        await newContact.save();
        console.log(`New contact added: ${contactEmail}`);

        res.status(200).json(newContact);
    } catch (error) {
        console.error("Error adding new contact", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//endpoint to update contact name
contactRouter.put('/contacts/update', async (req, res) => {
    try {
        const { email, contactEmail, contactName } = req.body;
        const updatedContact = await Contact.findOneAndUpdate(
            { user: email, contactEmail },
            { contactName },
            { new: true }
        );
        console.log(`Contact updated: ${contactEmail} with name ${contactName}`);
        res.status(200).json(updatedContact);
    } catch (error) {
        console.error("Error updating contact name", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default contactRouter;
