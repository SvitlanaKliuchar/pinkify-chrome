import React from "react";
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { useState, useEffect } from "react";
import { PiTrashLight } from "react-icons/pi";
import { GoHeart, GoHeartFill } from "react-icons/go";

export default function Drawings() {
    const [drawings, setDrawings] = useState([]);
    const { user } = useUser();

    const fetchDrawings = async () => {
        try {
            if (user) {
                const res = await axios.get(`/api/drawings/${user.primaryEmailAddress.emailAddress}`);
                setDrawings(res.data);
            }
        } catch (error) {
            console.log("Error fetching drawings", error);
        }
    };

    useEffect(() => {
        fetchDrawings();
    }, [user]);

    const toggleFavoriteDrawing = async (drawing) => {
        try {
            await axios.post('/api/toggle-fav-drawing', {
                email: user.primaryEmailAddress.emailAddress,
                drawingId: drawing._id
            });
            drawing.isFavorite = !drawing.isFavorite;
            setDrawings(drawings.map(d => (d._id === drawing._id ? { ...drawing } : d)));
        } catch (error) {
            console.log("Error toggling favorite drawing", error);
        }
    };

    const deleteDrawing = async (drawing) => {
        try {
            await axios.delete(`/api/drawings/${user.primaryEmailAddress.emailAddress}/${drawing._id}`);
            setDrawings(drawings.filter(d => d._id !== drawing._id));
        } catch (error) {
            console.log("Error deleting drawing", error);
        }
    };

    return (
        <div className="all-notes-container">
            {drawings.map(drawing => (
                <div key={drawing._id} className={drawing.isFavorite ? "fav-note-container" : "note-container"}>
                    <div className="sender">
                        <div className="sender-child">{drawing.sender}</div>
                        <div className="btn-container">
                            <button className="btn fav-btn" onClick={() => toggleFavoriteDrawing(drawing)}>
                                {drawing.isFavorite ? <GoHeartFill /> : <GoHeart />}
                            </button>
                            <button className="btn delete-btn" onClick={() => deleteDrawing(drawing)}>
                                <PiTrashLight />
                            </button>
                        </div>
                    </div>
                    <div className="message">
                        <img className="drawing-img" src={drawing.image} alt={`Drawing from ${drawing.sender}`} />
                    </div>
                    <div className="timestamp">{drawing.timestamp}</div>
                </div>
            ))}
        </div>
    );
}
