
import * as React from 'react';
import { useAuth } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";
import { getRandomQuote } from '../quotes';
import './App.css';

export default function MainLayout() {
    const { userId, isLoaded } = useAuth();
    const navigate = useNavigate();
    const [quote, setQuote] = React.useState('');

    React.useEffect(() => {
        if (isLoaded && !userId) {
            navigate("/sign-in");
        } else if (isLoaded && userId) {
            setQuote(getRandomQuote());
        }
    }, [isLoaded, userId]);

    const handleSpotifyLogin = () => {
        const clientId = 'your_spotify_client_id';
        const redirectUri = 'http://localhost:3000/callback';
        const scopes = 'user-library-read user-read-playback-state user-modify-playback-state';

        window.location = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    };

    if (!isLoaded) return "Loading...";

    return (
        <div>
            <div id="quote">{quote}</div>
            <button id="spotify-login" onClick={handleSpotifyLogin}>
                Login to Spotify
            </button>
            <div id="player"></div>
            <Outlet />
        </div>
    );
}
