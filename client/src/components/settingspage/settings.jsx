import { useState, useEffect } from 'react';
import { useUser, UserButton } from '@clerk/clerk-react';
import axios from 'axios';

const Settings = () => {
    const { user } = useUser();
    const [activeTab, setActiveTab] = useState('user');
    const [songs, setSongs] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get(`/api/get-all-songs?userId=${user.id}`);
                setSongs(response.data);
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };

        fetchSongs();
    }, [user.id]);

    const handleDeleteSongs = async () => {
        try {
            await axios.delete('/api/delete-all-songs');
            setMessage('All songs deleted successfully!');
        } catch (error) {
            console.error('Error deleting all songs:', error);
            setMessage('Error deleting all songs. Please try again.');
        }
    };

    const handleDeleteNotes = async () => {
        try {
            await axios.delete('/api/delete-all-notes');
            setMessage('All notes deleted successfully!');
        } catch (error) {
            console.error('Error deleting all notes:', error);
            setMessage('Error deleting all notes. Please try again.');
        }
    };

    const handleDeleteDrawings = async () => {
        try {
            await axios.delete('/api/delete-all-drawings');
            setMessage('All drawings deleted successfully!');
        } catch (error) {
            console.error('Error deleting all drawings:', error);
            setMessage('Error deleting all drawings. Please try again.');
        }
    };

    const handleDownloadSong = async (youtubeId, title) => {
        try {
            const response = await axios.get(`/api/download-song/${youtubeId}`, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${title}.mp3`);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading the song:', error);
            setMessage('Error downloading the song. Please try again.');
        }
    };

    return (
        <div className="settings">
            <div className="tabs">
                <button onClick={() => setActiveTab('user')} className={activeTab === 'user' ? 'active' : ''}>User Information</button>
                <button onClick={() => setActiveTab('music')} className={activeTab === 'music' ? 'active' : ''}>Music Settings</button>
                <button onClick={() => setActiveTab('cleanup')} className={activeTab === 'cleanup' ? 'active' : ''}>Clean Up</button>
            </div>

            {activeTab === 'user' && (
                <div className="profile">
                    <h4>Profile</h4>
                    <UserButton />
                    <p>Name: {user.fullName}</p>
                    <p>Email: {user.primaryEmailAddress.emailAddress}</p>
                </div>
            )}

            {activeTab === 'music' && (
                <div className="playlists">
                    <h3>Your Playlist</h3>
                    <ul>
                        {songs.map((song, index) => (
                            <li key={index}>
                                {song.title}
                                <button onClick={() => handleDownloadSong(song.youtubeId, song.title)}>Download</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {activeTab === 'cleanup' && (
                <div className="actions">
                    <button onClick={handleDeleteSongs}>Delete All Songs</button>
                    <button onClick={handleDeleteNotes}>Delete All Notes</button>
                    <button onClick={handleDeleteDrawings}>Delete All Drawings</button>
                </div>
            )}

            {message && <p>{message}</p>}
        </div>
    );
};

export default Settings;
