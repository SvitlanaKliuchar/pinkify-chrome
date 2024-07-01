import { useState } from 'react';
import axios from 'axios';

const BuildPlaylist = () => {
    const [youtubeUrls, setYoutubeUrls] = useState(['']);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

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
            await axios.post('/api/process-urls', { urls: youtubeUrls });
            setMessage('Playlist created successfully!');
        } catch (error) {
            console.error('Error processing URLs:', error);
            setMessage('Error processing URLs. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="build-playlist">
            <h2>Create Your Playlist</h2>
            <form onSubmit={handleSubmit}>
                {youtubeUrls.map((url, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={url}
                            onChange={(event) => handleUrlChange(index, event)}
                            placeholder="Enter YouTube URL"
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddUrl}>Add Another URL</button>
                <button type="submit" disabled={loading}>{loading ? 'Processing...' : 'Create Playlist'}</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default BuildPlaylist;
