import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const MusicPlayer = () => {
    const { user, isLoaded } = useUser();
    const [isPlaying, setIsPlaying] = useState(false);
    const [playlist, setPlaylist] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hasSongs, setHasSongs] = useState(true);
    const audioRef = useRef(new Audio());
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded && user) {
            const fetchPlaylist = async () => {
                try {
                    const res = await axios.get(`/api/playlist/${user.id}`);
                    if (res.data.songs.length > 0) {
                        setPlaylist(res.data.songs);
                    } else {
                        setHasSongs(false);
                    }
                } catch (error) {
                    console.log('Error fetching playlist:', error);
                }
            };
            fetchPlaylist();
        }
    }, [isLoaded, user]);

    useEffect(() => {
        if (isPlaying) {
            playCurrentSong();
        }
    }, [currentIndex]);

    const playCurrentSong = async () => {
        try {
            const currentSong = playlist[currentIndex];
            if (currentSong && currentSong.youtubeId) {
                const filePath = `/api/songs/${currentSong.youtubeId}.mp3`;
                audioRef.current.src = filePath;
                await audioRef.current.play();
                console.log(`Playing song: ${filePath}`);
            } else {
                console.log('Current song id is undefined', currentSong);
            }
        } catch (error) {
            console.log('Error playing song:', error);
        }
    };

    const handlePlay = () => {
        if (hasSongs && playlist.length > 0) {
            playCurrentSong();
            setIsPlaying(true);
        } else {
            navigate('/build-playlist');
        }
    };

    const handlePause = () => {
        audioRef.current.pause();
        setIsPlaying(false);
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < playlist.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const currentSongTitle = playlist[currentIndex]?.title || 'No song playing';

    if (!isLoaded || !user) {
        return <div>Loading...</div>;
    }

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
            <div className="current-song">{currentSongTitle}</div>
        </div>
    );
};

export default MusicPlayer;
