import { useState, useEffect } from 'react';
import { useUser, UserButton } from '@clerk/clerk-react';
import axios from 'axios';

const Settings = () => {
    const { user, isLoaded } = useUser();
    const [activeTab, setActiveTab] = useState('user');
    const [songs, setSongs] = useState([]);
    const [youtubeUrls, setYoutubeUrls] = useState(['']);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (isLoaded && user) {
            const fetchSongs = async () => {
                try {
                    const response = await axios.get(`/api/playlist/${user.id}`);
                    setSongs(response.data.songs);
                } catch (error) {
                    console.error('Error fetching songs:', error);
                }
            };
            fetchSongs();
        }
    }, [isLoaded, user]);

    const handleDeleteSongs = async () => {
        try {
            await axios.delete(`/api/delete-all-songs/${user.id}`);
            setMessage('All songs deleted successfully!');
        } catch (error) {
            console.error('Error deleting all songs:', error);
            setMessage('Error deleting all songs. Please try again.');
        }
    };

    const handleDeleteNotes = async () => {
        try {
            await axios.delete(`/api/delete-all-notes/${user.id}`);
            setMessage('All notes deleted successfully!');
        } catch (error) {
            console.error('Error deleting all notes:', error);
            setMessage('Error deleting all notes. Please try again.');
        }
    };

    const handleDeleteDrawings = async () => {
        try {
            await axios.delete(`/api/delete-all-drawings/${user.id}`);
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
    
    const handleUrlChange = (index, event) => {
        const newUrls = [...youtubeUrls];
        newUrls[index] = event.target.value;
        setYoutubeUrls(newUrls);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post(`/api/process-urls/${user.id}`, { urls: youtubeUrls, userId: user.id });
            setMessage('Songs added successfully!');
            setSongs([...songs, ...response.data.songs]);
            setYoutubeUrls(['']);
        } catch (error) {
            console.error('Error processing URLs:', error);
            setMessage('Error processing URLs. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isLoaded || !user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="settings">
            <div className="tabs-container">
                <button onClick={() => setActiveTab('user')} className={activeTab === 'user' ? 'tab active smaller-font' : 'tab smaller-font'}>User Info</button>
                <button onClick={() => setActiveTab('music')} className={activeTab === 'music' ? 'tab active smaller-font' : 'tab smaller-font'}>Your playlist</button>
                <button onClick={() => setActiveTab('cleanup')} className={activeTab === 'cleanup' ? 'tab active smaller-font' : 'tab smaller-font'}>Clean Up</button>
            </div>

            {activeTab === 'user' && (
                <div className="profile">
                    <UserButton />
                    <div className='user-info'>
                        <span>Name: </span><p>{user.fullName}</p>
                        <span>Email: </span><p>{user.primaryEmailAddress.emailAddress}</p>
                        <span>User Id: </span><p>{user.id}</p>
                    </div>
                    
                </div>
            )}

            {activeTab === 'music' && (
                <div className="playlist">
                    <ul className='song-list'>
                        {songs.map((song, index) => (<>
                            <li className='song' key={index}>
                                {song.title}
                            </li>
                            <button className='btn download-btn' onClick={() => handleDownloadSong(song.youtubeId, song.title)}>Download</button>
                            </>))}
                    </ul>
                    <form onSubmit={handleSubmit} className='update-playlist-form'>
                        {youtubeUrls.map((url, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(event) => handleUrlChange(index, event)}
                                    placeholder="Enter YouTube URL"
                                    className='url-input'
                                    required
                                />
                            </div>
                        ))}
                        <button type="submit" className='btn update-playlist-btn'>Update playlist</button>
                    </form>
                    {loading && <p>Loading...</p>}
                    {message && <p>{message}</p>}
                </div>
            )}

            {activeTab === 'cleanup' && (
                <div className="cleanup">
                    <button onClick={handleDeleteSongs} className='btn delete-all-btn'>Delete All Songs</button>
                    <button onClick={handleDeleteNotes} className='btn delete-all-btn'>Delete All Notes</button>
                    <button onClick={handleDeleteDrawings} className='btn delete-all-btn'>Delete All Drawings</button>
                    {message && <p>{message}</p>}
                </div>
            )}
        </div>
    );
};

export default Settings;
