import React from "react"
import axios from 'axios'
import {useUser} from '@clerk/clerk-react'
import { useState, useEffect } from "react"
import { PiTrashLight } from "react-icons/pi";
import { GoHeart, GoHeartFill } from "react-icons/go";

export default function Note(){
    const [notes, setNotes] = useState([])
    const {user} = useUser()


    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await axios.get(`/api/user-notes/${user.primaryEmailAddress.emailAddress}`)
                console.log(res.data)
                setNotes(res.data)



            } catch (error) {
                console.log("Error fetching notes", error)
            }
        }
    fetchNotes()
    }, [user])

    if (!notes) {
        return <div>Loading...</div>;
    }

  return (<div className="all-notes-container">
            {notes.map((note) => (
                <div key={note._id} className="note-container">
                    <div className="sender">
                        <div className="sender-child">{note.sender}</div>
                        <button className="btn fav-btn"><GoHeart /></button>
                        <button className="btn delete-btn">< PiTrashLight /></button>
                    </div>
                    <div className="message">{note.message}</div>
                    <div className="timestamp">{note.timestamp}</div>
                </div>
            ))}
        </div>)
};

