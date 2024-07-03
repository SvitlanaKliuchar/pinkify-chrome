import { useState } from 'react';
import axios from 'axios';
import {useUser} from '@clerk/clerk-react'

const BuildPlaylist = () => {
    const [youtubeUrls, setYoutubeUrls] = useState(['']);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const {user} = useUser();

    const handleUrlChange = (index, event) => {
        const newUrls = [...youtubeUrls];
        newUrls[index] = event.target.value;
        setYoutubeUrls(newUrls);
    };

    const handleAddUrl = () => {
        setYoutubeUrls([...youtubeUrls, '']);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post(`/api/process-urls/${user.id}`, { urls: youtubeUrls });
            setMessage('Playlist created successfully!');
            console.log('Processed songs:', response.data.songs);
        } catch (error) {
            console.error('Error processing URLs:', error);
            setMessage('Error processing URLs. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="build-playlist">
            <form onSubmit={handleSubmit} className='build-playlist-form'>
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
                <button type="button" onClick={handleAddUrl} className='btn add-url-btn'>Add Another URL</button>
                {message && <p>{message}</p>}
                <button type="submit" disabled={loading} className='btn create-playlist-btn'>{loading ? 'Processing...' : 'Create Playlist'}</button>
            </form>
        </div>
    );
};

export default BuildPlaylist;
