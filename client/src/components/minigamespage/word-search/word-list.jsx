import React from 'react';

const WordList = ({ words }) => {
  return (
    <div className="word-list">
      <h2>Words to Find</h2>
      <ul>
        {words.map((word, index) => (
          <li key={index} className={`word ${word.found ? 'found' : ''}`}>
            {word.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WordList;
