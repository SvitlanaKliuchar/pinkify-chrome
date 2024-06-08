import React from "react";
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { useState, useEffect } from "react";
import { PiTrashLight } from "react-icons/pi";
import { GoHeart, GoHeartFill } from "react-icons/go";

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const { user } = useUser();

    const fetchNotes = async () => {
        try {
            if (user) {
                const res = await axios.get(`/api/user-notes/${user.primaryEmailAddress.emailAddress}`);
                setNotes(res.data);
            }
        } catch (error) {
            console.log("Error fetching notes", error);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, [user]);

    const toggleFavoriteNote = async (note) => {
        try {
            await axios.post('/api/toggle-fav-note', {
                email: user.primaryEmailAddress.emailAddress,
                noteId: note._id
            });
            note.isFavorite = !note.isFavorite;
            setNotes(notes.map(n => (n._id === note._id ? { ...note } : n)));
        } catch (error) {
            console.log("Error toggling favorite note", error);
        }
    };

    const deleteNote = async (note) => {
        try {
            await axios.delete(`/api/user-note/${user.primaryEmailAddress.emailAddress}/${note._id}`);
            setNotes(notes.filter(n => n._id !== note._id));
        } catch (error) {
            console.log("Error deleting note", error);
        }
    };

    return (
        <div className="all-notes-container">
            {notes.map(note => (
                <div key={note._id} className={note.isFavorite ? "fav-note-container" : "note-container"}>
                    <div className="sender">
                        <div className="sender-child">{note.sender}</div>
                        <div className="btn-container">
                            <button className="btn fav-btn" onClick={() => toggleFavoriteNote(note)}>
                                {note.isFavorite ? <GoHeartFill /> : <GoHeart />}
                            </button>
                            <button className="btn delete-btn" onClick={() => deleteNote(note)}>
                                <PiTrashLight />
                            </button>
                        </div>
                    </div>
                    <div className="message">{note.message}</div>
                    <div className="timestamp">{note.timestamp}</div>
                </div>
            ))}
        </div>
    );
}
