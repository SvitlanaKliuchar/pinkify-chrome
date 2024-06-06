import React from "react";
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { useState, useEffect } from "react";
import { PiTrashLight } from "react-icons/pi";
import { GoHeart, GoHeartFill } from "react-icons/go";

export default function Note() {
    const [notes, setNotes] = useState([]);
    const { user } = useUser();

    const fetchNotes = async () => {
        try {
            if (user) { // Ensure user object exists before fetching notes
                const res = await axios.get(`/api/user-notes/${user.primaryEmailAddress.emailAddress}`);
                console.log(res.data);
                setNotes(res.data);
            }
        } catch (error) {
            console.log("Error fetching notes", error);
        }
    }
    useEffect(() => {
        fetchNotes();
    }, [user]);

    if (!notes) {
        return <div>Loading...</div>;
    }

    const addFavNote = async (note) => {
        try {
            await axios.post(`/api/fav-note`, {
                sender: note.sender,
                receiver: note.receiver,
                message: note.message,
            });
            console.log('Fav note added successfully!',{
                sender: note.sender,
                receiver: note.receiver,
                message: note.message,
            });
        } catch (error) {
            console.log("Error adding fav note on frontend", error);
        }
    };

    const removeFavNote = async (note) => {
        try {
            await axios.delete(`/api/fav-note/${user.primaryEmailAddress.emailAddress}/${note._id}`);
            console.log('Fav note removed successfully!');
        } catch (error) {
            console.log("Error removing fav note on frontend", error);
        }
    };

    const handleFavButton = async (note) => {
        try {
            if (!note.isFav) {
                await addFavNote(note);
            } else {
                await removeFavNote(note);
            }
            // Update the favorite status of the specific note
            note.isFav = !note.isFav;
            // Update the notes state to reflect the change
            setNotes(prevNotes => {
                return prevNotes.map(n => {
                    if (n._id === note._id) {
                        return { ...note };
                    }
                    return n;
                });
            });
        } catch (error) {
            console.log("Error toggling fav note", error);
        }
    };



    const deleteNote = async (note) => {
        try {
            await axios.delete(`/api/user-note/${user.primaryEmailAddress.emailAddress}/${note._id}`);
            console.log("Note deleted successfully");
            const updatedNotes = notes.filter((n) => n._id !== note._id);
            setNotes(updatedNotes);
        } catch (error) {
            console.log("Error removing note", error);
        }
    };

    const handleDeleteButton = (note) => {
        return () => { 
            deleteNote(note);
        };
    };

    return (
        <div className="all-notes-container">
            {notes.map((note) => (
                <div key={note._id} className={note.isFav ? "fav-note-container" : "note-container"}>
                    <div className="sender">
                        <div className="sender-child">{note.sender}</div>
                        <div className="btn-container">
                            <button className="btn fav-btn" onClick={() => {handleFavButton(note)}}>
                            {note.isFav ? <GoHeartFill /> : <GoHeart />}</button>
                            <button className="btn delete-btn" onClick={handleDeleteButton(note)}>
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
};
