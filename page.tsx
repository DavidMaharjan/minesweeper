
'use client';
import React, { useEffect, useState } from 'react';

const initialGrid = [
  [
    { item: '0', displayed: false },
    { item: '1', displayed: false },
    { item: '2', displayed: false },
    { item: '1', displayed: false },
    { item: '', displayed: false },
    { item: '', displayed: false },
    { item: '', displayed: false },
    { item: '1', displayed: false },
    { item: '', displayed: false },
    { item: '💣', displayed: false },
  ],
  [
    { item: '💣', displayed: false },
    { item: '', displayed: false },
    { item: '', displayed: false },
    { item: '1', displayed: false },
    { item: '', displayed: false },
    { item: '', displayed: false },
    { item: '', displayed: false },
    { item: '1', displayed: false },
    { item: '', displayed: false },
    { item: '', displayed: false },
  ],
  [
    { item: '💣', displayed: false },
    { item: '', displayed: false },
    { item: '', displayed: false },
    { item: '1', displayed: false },
    { item: '', displayed: false },
    { item: '', displayed: false },
    { item: '1', displayed: false },
    { item: '2', displayed: false },
    { item: '', displayed: false },
    { item: '', displayed: false },
  ],
  [
    { item: '', displayed: false },
    { item: '', displayed: false },
    { item: '', displayed: false },
    { item: '💣', displayed: false },
    { item: '3', displayed: false },
    { item: '', displayed: false },
    { item: '1', displayed: false },
    { item: '1', displayed: false },
    { item: '', displayed: false },
    { item: '3', displayed: false },
  ],
];

const deepCloneGrid = (grid) =>
  grid.map((row) => row.map((cell) => ({ ...cell })));

const Mine = () => {
  const [mineGrid, setMineGrid] = useState(deepCloneGrid(initialGrid));
  const [timer, setTimer] = useState(30);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (timer > 0 && !gameOver) {
      const timeoutId = setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [timer, gameOver]);

  const handleMineClick = (row, col) => {
    if (gameOver || timer === 0) return;

    const newGrid = deepCloneGrid(mineGrid);
    newGrid[row][col].displayed = true;

    if (newGrid[row][col].item !== '💣') {
      setScore((prev) => prev + Number(newGrid[row][col].item));
      setMineGrid(newGrid);
    } else if (newGrid[row][col].item === '💣') {
      revealBombs(newGrid);
      setGameOver(true);
    }

   
  };

  const revealBombs = (grid) => {
    const revealedGrid = grid.map((row) =>
      row.map((cell) => ({
        ...cell,
        displayed: cell.displayed || cell.item === '💣',
      }))
    );
    setMineGrid(revealedGrid);
  };

  const handleRestart = () => {
    setMineGrid(deepCloneGrid(initialGrid));
    setTimer(10);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start py-6">
      <h1 className="text-2xl font-bold mb-2">💣 Minesweeper 💣</h1>
      <div className="mb-2">
        <span className="mr-4">⏰ Time Left: {timer}</span>
        <span>⭐ Score: {score}</span>
      </div>

      {gameOver && (
        <p className="text-red-500 font-bold mb-2">
          💥 Game Over! You clicked on a mine!
        </p>
      )}
      {timer === 0 && !gameOver && (
        <p className="text-yellow-400 font-bold mb-2">⏳ Time’s up!</p>
      )}

      <div className="grid gap-0.5">
        {mineGrid.map((row, rowIndex) => (
          <div className="flex" key={rowIndex}>
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                onClick={() => handleMineClick(rowIndex, colIndex)}
                className={`h-12 w-12 flex items-center justify-center text-lg font-bold cursor-pointer transition-colors rounded
                  ${
                    cell.displayed
                      ? 'bg-white text-black'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }
                  border-2 border-gray-300`}
              >
                {cell.displayed ? cell.item : ''}
              </div>
            ))}
          </div>
        ))}
      </div>

      {(gameOver || timer === 0) && (
        <button
          onClick={handleRestart}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
        >
          🔄 Restart Game
        </button>
      )}
    </div>
  );
};

export default Mine;
