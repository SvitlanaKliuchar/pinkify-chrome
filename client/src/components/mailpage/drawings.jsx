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
                console.log(res.data);
                setDrawings(res.data);
            }
        } catch (error) {
            console.log("Error fetching drawings", error);
        }
    }
    useEffect(() => {
        fetchDrawings();
    }, [user]);

    if (!drawings) {
        return <div>Loading...</div>;
    }

    const addFavDrawing = async (drawing) => {
        try {
            await axios.post(`/api/fav-drawing`, {
                sender: drawing.sender,
                receiver: drawing.receiver,
                image: drawing.image,
            });
            console.log('Fav drawing added successfully!',{
                sender: drawing.sender,
                receiver: drawing.receiver,
                image: drawing.image,
            });
        } catch (error) {
            console.log("Error adding fav drawing on frontend", error);
        }
    };

    const removeFavDrawing = async (drawing) => {
        try {
            await axios.delete(`/api/fav-drawing/${user.primaryEmailAddress.emailAddress}/${drawing._id}`);
            console.log('Fav drawing removed successfully!');
        } catch (error) {
            console.log("Error removing fav drawing on frontend", error);
        }
    };

    const handleFavButton = async (drawing) => {
        try {
            if (!drawing.isFav) {
                await addFavDrawing(drawing);
            } else {
                await removeFavDrawing(drawing);
            }
            // Update the favorite status of the specific drawing
            drawing.isFav = !drawing.isFav;
            // Update the drawings state to reflect the change
            setDrawings(prevDrawings => {
                return prevDrawings.map(d => {
                    if (d._id === drawing._id) {
                        return { ...drawing };
                    }
                    return d;
                });
            });
        } catch (error) {
            console.log("Error toggling fav drawing", error);
        }
    };



    const deleteDrawing = async (drawing) => {
        try {
            await axios.delete(`/api/drawings/${user.primaryEmailAddress.emailAddress}/${drawing._id}`);
            console.log("Drawing deleted successfully");
            const updatedDrawings = drawings.filter((d) => d._id !== drawing._id);
            setDrawings(updatedDrawings);
        } catch (error) {
            console.log("Error removing drawing", error);
        }
    };

    const handleDeleteButton = (drawing) => {
        return () => { 
            deleteDrawing(drawing);
        };
    };

    return (
        <div className="all-notes-container">
            {drawings.map((drawing) => (
                <div key={drawing._id} className={drawing.isFav ? "fav-note-container" : "note-container"}>
                    <div className="sender">
                        <div className="sender-child">{drawing.sender}</div>
                        <div className="btn-container">
                            <button className="btn fav-btn" onClick={() => {handleFavButton(drawing)}}>
                            {drawing.isFav ? <GoHeartFill /> : <GoHeart />}</button>
                            <button className="btn delete-btn" onClick={handleDeleteButton(drawing)}>
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
};
