import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState('');
    const [hasSongs, setHasSongs] = useState(true);
    const audioRef = useRef(new Audio());
    const navigate = useNavigate();

    useEffect(() => {
        const checkSongs = async () => {
            try {
                const res = await axios.get('/api/has-songs');
                setHasSongs(res.data.hasSongs);
                if (!res.data.hasSongs) {
                    navigate('/build-playlist');
                }
            } catch (error) {
                console.log('Error checking songs:', error);
            }
        };
        checkSongs();
    }, [navigate]);

    const handlePlay = async () => {
        try {
            if (!hasSongs) {
                navigate('/build-playlist');
                return;
            }
            const res = await axios.get('/api/play');
            const newSongFilename = res.data.filename;
            setCurrentSong(newSongFilename);
            setIsPlaying(true);
            audioRef.current.src = `/api/songs/${newSongFilename}`;
            audioRef.current.play();
        } catch (error) {
            console.log('Error fetching or playing a song:', error);
        }
    };

    const handlePause = () => {
        audioRef.current.pause();
        setIsPlaying(false);
    };

    const handlePrev = async () => {
        // Implement previous song functionality
    };

    const handleNext = async () => {
        // Implement next song functionality
    };

    return (
        <div className="music-player">
            <div className="controls">
                <button className="btn mp-btn prev" onClick={handlePrev}>
                    <FaStepBackward />
                </button>
                <button className="btn mp-btn play" onClick={isPlaying ? handlePause : handlePlay}>
                    {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button className="btn mp-btn next" onClick={handleNext}>
                    <FaStepForward />
                </button>
            </div>
            <div className="current-song">{currentSong}</div>
        </div>
    );
};

export default MusicPlayer;
