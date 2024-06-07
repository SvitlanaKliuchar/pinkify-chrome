import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [newContactName, setNewContactName] = useState('');
  const { user } = useUser();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get(`/api/contacts/${user.primaryEmailAddress.emailAddress}`);
        console.log("Fetched contacts:", res.data);

        // Filter out duplicate contacts
        const uniqueContacts = res.data.reduce((acc, contact) => {
          if (!acc.some(c => c.contactEmail === contact.contactEmail)) {
            acc.push(contact);
          }
          return acc;
        }, []);
        setContacts(uniqueContacts);
      } catch (error) {
        console.log('Error fetching contacts', error);
      }
    };

    if (user) {
      fetchContacts();
    }
  }, [user]);

  const saveContactName = async (contactEmail) => {
    try {
      await axios.post(`/api/contacts/update`, { email: user.primaryEmailAddress.emailAddress, contactEmail, contactName: newContactName });
      setContacts(prevContacts => prevContacts.map(contact => 
        contact.contactEmail === contactEmail ? { ...contact, contactName: newContactName } : contact
      ));
      setEditingContact(null);
      setNewContactName('');
    } catch (error) {
      console.log('Error updating contact name', error);
    }
  };
  return (
    <div className="contacts-container">
      {contacts.map((contact, index) => (
        <div className="contact" key={index}>
          <div>{contact.contactEmail}</div>
          {contact.contactName ? (
            <div className='contact-name' >{contact.contactName}</div>
          ) : editingContact === contact.contactEmail ? (
            <div className='contact-name-input'>
              <input
                type="text"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
                placeholder="Enter name"
                className='name-input'
              />
              <button onClick={() => saveContactName(contact.contactEmail)} className='btn save-name-btn'>Save</button>
            </div>
          ) : (
            <button className="add-name-btn" onClick={() => setEditingContact(contact.contactEmail)}>Add Name</button>
          )}
        </div>
      ))}
    </div>
  );
}
