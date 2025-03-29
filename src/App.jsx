import { useState } from 'react';
import './App.css';
import Square from './Square/Square';

function getRandomMines() {
  const mineCount = Math.floor(Math.random() * 5) + 3; // Random number between 3 and 7
  let randomNumbers = new Set();
  
  while (randomNumbers.size < mineCount) {
    randomNumbers.add(Math.floor(Math.random() * 25) + 1);
  }
  
  return Array.from(randomNumbers);
}

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [mines, setMines] = useState(getRandomMines());
  const [reset, setReset] = useState(false);

  const resetGame = () => {
    setGameOver(false);
    setScore(0);
    setMines(getRandomMines()); 
    setReset(prev => !prev); 
  };

  return (
    <>
      <div className='d-flex gap-10'>
        <div className='totalScore'>
          <p>Total Score</p>
          <p>{score} PTS 🎯</p>
        </div>
        <div className='d-grid'>
          {Array.from({ length: 25 }, (_, index) => (
            <Square 
              key={index + 1}
              setScore={setScore} 
              gameOver={gameOver} 
              setGameOver={setGameOver} 
              mine={mines.includes(index + 1)}
              reset={reset} 
            />
          ))}
        </div>
      </div>
      <button onClick={resetGame} className='reset-button'>
        🔄 Reset Game
      </button>
    </>
  );
}

export default App;
