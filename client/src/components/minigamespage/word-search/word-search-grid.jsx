import React, { useState } from 'react';

const WordSearchGrid = ({ words, markWordAsFound }) => {
  const [selectedLetters, setSelectedLetters] = useState([]);
  const grid = [
    ['W', 'E', 'L', 'C', 'O', 'M', 'E'],
    ['O', 'O', 'R', 'O', 'E', 'A', 'R'],
    ['R', 'E', 'A', 'C', 'T', 'N', 'P'],
    ['D', 'S', 'I', 'T', 'A', 'R', 'Y'],
    ['S', 'L', 'I', 'D', 'E', 'S', 'U'],
    ['A', 'N', 'T', 'E', 'C', 'H', 'N'],
    ['R', 'E', 'A', 'C', 'T', 'N', 'P'],
  ];

  const handleSelectLetter = (row, col) => {
    const newSelectedLetters = [...selectedLetters, { row, col }];
    setSelectedLetters(newSelectedLetters);
    checkWord(newSelectedLetters);
  };

  const checkWord = (selectedLetters) => {
    const selectedWord = selectedLetters.map(({ row, col }) => grid[row][col]).join('');
    const foundWord = words.find(word => word.text === selectedWord);
    if (foundWord) {
      markWordAsFound(foundWord.text);
      setSelectedLetters([]);
    }
  };

  return (
    <div className="word-search-grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="word-search-row">
          {row.map((letter, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`word-search-cell ${selectedLetters.some(({ row, col }) => row === rowIndex && col === colIndex) ? 'selected' : ''}`}
              onClick={() => handleSelectLetter(rowIndex, colIndex)}
            >
              {letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WordSearchGrid;