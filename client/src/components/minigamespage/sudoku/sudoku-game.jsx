import React, { useState } from "react";

const generateSudokuGrid = () => {
  const grid = [
    [5, 3, null, null, 7, null, null, null, null],
    [6, null, null, 1, 9, 5, null, null, null],
    [null, 9, 8, null, null, null, null, 6, null],
    [8, null, null, null, 6, null, null, null, 3],
    [4, null, null, 8, null, 3, null, null, 1],
    [7, null, null, null, 2, null, null, null, 6],
    [null, 6, null, null, null, null, 2, 8, null],
    [null, null, null, 4, 1, 9, null, null, 5],
    [null, null, null, null, 8, null, null, 7, 9],
  ];
  return grid;
};

const isValidMove = (grid, row, col, num) => {
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num || grid[x][col] === num) {
      return false;
    }
  }

  const startRow = row - (row % 3);
  const startCol = col - (col % 3);

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if (grid[x + startRow][y + startCol] === num) {
        return false;
      }
    }
  }

  return true;
};

const SudokuGame = () => {
  const [grid, setGrid] = useState(generateSudokuGrid());
  const [selectedCell, setSelectedCell] = useState(null);

  const handleChange = (e, row, col) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1 || value > 9) {
      return;
    }
    if (isValidMove(grid, row, col, value)) {
      const newGrid = grid.map((r, rowIndex) =>
        r.map((cell, cellIndex) =>
          rowIndex === row && cellIndex === col ? value : cell
        )
      );
      setGrid(newGrid);
    } else {
      setSelectedCell({ row, col });
    }
  };

  const handleFocus = (row, col) => {
    setSelectedCell({ row, col });
  };

  const handleBlur = () => {
    setSelectedCell(null);
  };

  const handleKeyDown = (e, row, col) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      const newGrid = grid.map((r, rowIndex) =>
        r.map((cell, cellIndex) =>
          rowIndex === row && cellIndex === col ? null : cell
        )
      );
      setGrid(newGrid);
    }
  };

  return (
    <div className="game-sudoku">
      <div className="sudoku-grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="sudoku-row">
            {row.map((cell, cellIndex) => (
              <input
                key={cellIndex}
                type="text"
                maxLength="1"
                value={cell || ""}
                onChange={(e) => handleChange(e, rowIndex, cellIndex)}
                onFocus={() => handleFocus(rowIndex, cellIndex)}
                onBlur={handleBlur}
                onKeyDown={(e) => handleKeyDown(e, rowIndex, cellIndex)}
                className={`sudoku-cell ${
                  selectedCell &&
                  selectedCell.row === rowIndex &&
                  selectedCell.col === cellIndex
                    ? "selected"
                    : ""
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SudokuGame;
