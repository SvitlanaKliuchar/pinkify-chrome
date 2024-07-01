import React, { useState } from 'react';
import WordSearchGrid from './word-search-grid.jsx';

const WordSearchGame = () => {
  const [words, setWords] = useState([
    { text: 'REACT', found: false },
    { text: 'WELCOME', found: false },
    { text: 'SLIDES', found: false },
  ]);

  const markWordAsFound = (foundWordText) => {
    const updatedWords = words.map(word =>
      word.text === foundWordText ? { ...word, found: true } : word
    );
    setWords(updatedWords);
  };

  const resetGame = () => {
    setWords(words.map(word => ({ ...word, found: false })));
  };

  return (
    <div className="word-search-game">
      <h1>Word Search Game</h1>
      <WordSearchGrid words={words} markWordAsFound={markWordAsFound} />
      <button className='word-search-reset-button' onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default WordSearchGame;