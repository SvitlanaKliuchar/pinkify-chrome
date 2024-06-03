export const quotes = [
    "Quote 1",
    "Quote 2",
    "Quote 3"
  ];
  
export default function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
  