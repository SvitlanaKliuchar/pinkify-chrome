import fs from 'fs'
import { Song } from './models/song-model.js'
import { Quote } from './models/quote-model.js'

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

const mainAuthor = "Haruki Murakami"
const quotesToAdd = [
    { text: "Quote 1 text", author: mainAuthor },
    { text: "Quote 2 text", author: mainAuthor },
    { text: "Quote 2 text", author: mainAuthor },
    { text: "Quote 2 text", author: mainAuthor },
    { text: "Quote 2 text", author: mainAuthor },
    { text: "Quote 2 text", author: mainAuthor },
    { text: "Quote 2 text", author: mainAuthor },
    { text: "Quote 2 text", author: mainAuthor },
    { text: "Quote 2 text", author: mainAuthor },
  ];



export const saveQuotesToDB = async () => {
    try {
        for (const quoteData of quotesToAdd) {
            const newQuote = new Quote(quoteData);
            await newQuote.save();
            console.log("Quote added:", newQuote);
          }
        console.log("All quotes added successfully.");
    } catch (error) {
        console.error("Error adding quotes:", error);
    }
}