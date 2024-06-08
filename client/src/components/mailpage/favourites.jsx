import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { PiTrashLight } from "react-icons/pi";
import { GoHeart, GoHeartFill } from "react-icons/go";

export default function Favourites() {
    const [favItems, setFavItems] = useState([]);
    const { user } = useUser();

    const fetchFavItems = async () => {
        try {
            if (user) {
                const notesRes = await axios.get(`/api/fav-notes/${user.primaryEmailAddress.emailAddress}`);
                const drawingsRes = await axios.get(`/api/all-fav-drawings/${user.primaryEmailAddress.emailAddress}`);
                setFavItems([...notesRes.data, ...drawingsRes.data]);
            }
        } catch (error) {
            console.log("Error fetching favorite items", error);
        }
    };

    useEffect(() => {
        fetchFavItems();
    }, [user]);

    const handleFavButton = async (item) => {
        try {
            if (item.image) {
                // It's a drawing
                if (!item.isFavorite) {
                    await axios.post(`/api/fav-drawing`, { sender: item.sender, receiver: item.receiver, image: item.image });
                } else {
                    await axios.delete(`/api/fav-drawing/${user.primaryEmailAddress.emailAddress}/${item._id}`);
                }
            } else {
                // It's a note
                if (!item.isFavorite) {
                    await axios.post(`/api/fav-note`, { sender: item.sender, receiver: item.receiver, message: item.message });
                } else {
                    await axios.delete(`/api/fav-note/${user.primaryEmailAddress.emailAddress}/${item._id}`);
                }
            }
            item.isFavorite = !item.isFavorite;
            setFavItems(prevItems => prevItems.map(i => (i._id === item._id ? { ...item } : i)));
        } catch (error) {
            console.log("Error toggling favorite item", error);
        }
    };

    const handleDeleteButton = async (item) => {
        try {
            if (item.image) {
                await axios.delete(`/api/drawings/${user.primaryEmailAddress.emailAddress}/${item._id}`);
            } else {
                await axios.delete(`/api/user-note/${user.primaryEmailAddress.emailAddress}/${item._id}`);
            }
            setFavItems(prevItems => prevItems.filter(i => i._id !== item._id));
        } catch (error) {
            console.log("Error deleting item", error);
        }
    };

    return (
        <div className="all-notes-container">
            {favItems.map((item) => (
                <div key={item._id} className={item.isFavorite ? "fav-note-container" : "note-container"}>
                    <div className="sender">
                        <div className="sender-child">{item.sender}</div>
                        <div className="btn-container">
                            <button className="btn fav-btn" onClick={() => handleFavButton(item)}>
                                {item.isFavorite ? <GoHeartFill /> : <GoHeart />}
                            </button>
                            <button className="btn delete-btn" onClick={() => handleDeleteButton(item)}>
                                <PiTrashLight />
                            </button>
                        </div>
                    </div>
                    <div className="message">
                        {item.image ? <img className="drawing-img" src={item.image} alt={`Drawing from ${item.sender}`} /> : <p>{item.message}</p>}
                    </div>
                    <div className="timestamp">{item.timestamp}</div>
                </div>
            ))}
        </div>
    );
}
