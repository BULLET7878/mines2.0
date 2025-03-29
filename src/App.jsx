import { useState } from 'react';
import './App.css';
import Square from './square/square';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let randomNumbers = [];

while (randomNumbers.length < 5) {
  let randomNumber = getRandomInt(1, 25);
  if (!randomNumbers.includes(randomNumber)) {
    randomNumbers.push(randomNumber);
  }
}

console.log(randomNumbers);
function App() {

  let [gameOver, setGameOver] = useState(false);
  let [score, setScore] = useState(0);
  let items = [];

  for (let index = 1; index < 26; index++) {
    if(randomNumbers.includes(index))
      {
        items.push(<Square setScore={setScore} gameOver={gameOver} setGameOver={setGameOver} mine={true} key={index} />);
      } else {
        items.push(<Square setScore={setScore} gameOver={gameOver} setGameOver={setGameOver} key={index} />);
      }
  }

  return (
    <>
      <div className='d-flex gap-10'>
        <div className='totalScore'>
          <p>Total Score</p>
          <p>{score} PTS🎯</p>
        </div>
        <div className='d-grid'>
          {items}
        </div>
      </div>
    </>
  )
}

export default App;