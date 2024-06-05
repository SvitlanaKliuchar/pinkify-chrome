import fs from 'fs'; // Import the fs module for file system operations
import { Song } from './models/song-model.js'; // Import your Song model

// Function to read files from the songs directory and save them to the database
export const saveSongsToDB = async () => {
    try {
        // Read the files in the songs directory
        const files = fs.readdirSync('./songs');

        // Loop through each file and save it to the database
        for (const file of files) {
            // Extract the title from the filename
            const parts = file.split(' '); // Split on space
            const title = parts.slice(1).join(' ').replace('.flac', ''); // Join all parts after the first one
            // Create a new instance of the Song model for each song
            const newSong = new Song({
                title: title, // Set the title of the song
                filename: file // Set the filename of the song
            });

            // Save the song to the database
            await newSong.save();
        }

        console.log('Songs saved to the database successfully.');
    } catch (error) {
        console.error('Error saving songs to the database:', error);
    }
};
