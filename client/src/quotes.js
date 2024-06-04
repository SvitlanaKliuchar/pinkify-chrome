export const quotes = [
    "Quote 1",
    "Quote 2",
    "Quote 3",
    "Quote 4",
    "Quote 5",
    "Quote 6",
    "Quote 7",
    "Quote 8",
    "Quote 9"
  ];
  
export function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
  