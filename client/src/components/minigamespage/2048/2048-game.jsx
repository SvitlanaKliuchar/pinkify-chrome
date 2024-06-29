import React, { useState, useEffect } from "react";

const SIZE = 4;

const generateEmptyGrid = () => {
  return Array(SIZE).fill(null).map(() => Array(SIZE).fill(null));
};

const getRandomPosition = () => {
  const x = Math.floor(Math.random() * SIZE);
  const y = Math.floor(Math.random() * SIZE);
  return { x, y };
};

const addRandomNumber = (grid) => {
  let newGrid = [...grid];
  let added = false;
  while (!added) {
    const { x, y } = getRandomPosition();
    if (!newGrid[x][y]) {
      newGrid[x][y] = Math.random() > 0.5 ? 2 : 4;
      added = true;
    }
  }
  return newGrid;
};

const slideRowLeft = (row) => {
  const newRow = row.filter((tile) => tile !== null);
  while (newRow.length < SIZE) {
    newRow.push(null);
  }
  return newRow;
};

const combineRowLeft = (row, score) => {
  let newRow = [...row];
  for (let i = 0; i < SIZE - 1; i++) {
    if (newRow[i] && newRow[i] === newRow[i + 1]) {
      newRow[i] *= 2;
      score += newRow[i];
      newRow[i + 1] = null;
    }
  }
  return { newRow, score };
};

const moveLeft = (grid, score) => {
  let newGrid = grid.map((row) => slideRowLeft(row));
  let newScore = score;
  newGrid = newGrid.map((row) => {
    const result = combineRowLeft(row, newScore);
    newScore = result.score;
    return result.newRow;
  });
  newGrid = newGrid.map((row) => slideRowLeft(row));
  return { newGrid, newScore };
};

const rotateGrid = (grid) => {
  const newGrid = generateEmptyGrid();
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      newGrid[j][SIZE - 1 - i] = grid[i][j];
    }
  }
  return newGrid;
};

const isGridFull = (grid) => {
  return grid.every(row => row.every(cell => cell !== null));
};

const canMove = (grid) => {
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (!grid[i][j]) return true;
      if (i < SIZE - 1 && grid[i][j] === grid[i + 1][j]) return true;
      if (j < SIZE - 1 && grid[i][j] === grid[i][j + 1]) return true;
    }
  }
  return false;
};

const Game2048 = () => {
  const [grid, setGrid] = useState(addRandomNumber(addRandomNumber(generateEmptyGrid())));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const move = (direction) => {
    if (gameOver) return;

    let newGrid = [...grid];
    let newScore = score;

    for (let i = 0; i < direction; i++) {
      newGrid = rotateGrid(newGrid);
    }

    const result = moveLeft(newGrid, newScore);
    newGrid = result.newGrid;
    newScore = result.newScore;

    for (let i = 0; i < (4 - direction) % 4; i++) {
      newGrid = rotateGrid(newGrid);
    }

    if (JSON.stringify(newGrid) !== JSON.stringify(grid)) {
      newGrid = addRandomNumber(newGrid);
    }

    setGrid(newGrid);
    setScore(newScore);

    if (isGridFull(newGrid) && !canMove(newGrid)) {
      setGameOver(true);
    }
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowUp":
        move(0);
        break;
      case "ArrowRight":
        move(1);
        break;
      case "ArrowDown":
        move(2);
        break;
      case "ArrowLeft":
        move(3);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [grid, gameOver]);

  const resetGame = () => {
    setGrid(addRandomNumber(addRandomNumber(generateEmptyGrid())));
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="game-2048-container">
      {gameOver && <div className="game-over">Game Over</div>}
      <div className="score">Score: {score}</div>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className={`cell cell-${cell} ${cell !== null ? 'merge' : ''}`}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={resetGame} className="reset-button">Restart Game</button>
    </div>
  );
};

export default Game2048;
