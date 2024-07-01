import fs from 'fs'
import { Song } from './models/song-model.js'
import { Quote } from './models/quote-model.js'

const mainAuthor = "Haruki Murakami"

const quotesToAdd = [
    { text: "If you only read the books that everyone else is reading, you can only think what everyone else is thinking.", author: mainAuthor },
    { text: "And once the storm is over, you won’t remember how you made it through.", author: mainAuthor },
    { text: "Pain is inevitable. Suffering is optional.", author: mainAuthor },
    { text: "If you remember me, then I don't care if everyone else forgets.", author: mainAuthor },
    { text: "Whatever it is you're seeking won't come in the form you're expecting.", author: mainAuthor },
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
