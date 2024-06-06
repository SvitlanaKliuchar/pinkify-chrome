import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

export default function SendNote() {
    const [emailInput, setEmailInput] = useState('');
    const [noteInput, setNoteInput] = useState('');
    const [userLoaded, setUserLoaded] = useState(false);
    const { user } = useUser();

    useEffect(() => {
        // Check if user is loaded
        if (user) {
            setUserLoaded(true);
            console.log('User loaded:', user);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userLoaded) {
            console.error('User not loaded yet');
            return;
        }

        try {
            console.log('Sending note data:', {
                sender: user.primaryEmailAddress?.emailAddress,
                receiver: emailInput,
                message: noteInput,
            });

            // sending note data to backend API
            await axios.post(`/api/send-note`, {
                sender: user.primaryEmailAddress?.emailAddress, 
                receiver: emailInput, 
                message: noteInput,
            });

            console.log('Note sent successfully!');
            
            const newNote = response.data;
            setNotes([...notes, newNote]);
        } catch (error) {
            console.error('Error sending note:', error);
            alert('Failed to send note. Please try again.');
        }

        setEmailInput('');
        setNoteInput('');
    }

    return (
        <div className="send-note-container">
            <form onSubmit={handleSubmit}>
                <label className="label">Send a note to a friend</label>
                <input 
                    type="text" 
                    id="email" 
                    name="email" 
                    placeholder="email:" 
                    required
                    value={emailInput} 
                    onChange={(e) => setEmailInput(e.target.value)} 
                />
                <textarea 
                    name="note" 
                    id="note" 
                    rows={5} 
                    cols={25} 
                    required
                    value={noteInput} 
                    onChange={(e) => setNoteInput(e.target.value)} 
                />
                <button type="submit" className="btn send-btn">send</button>
            </form>
        </div>
    );
}
