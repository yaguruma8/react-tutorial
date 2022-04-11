import { useState } from "react";
import { Board } from "./Board";
import { calcWinner } from "./utils";


export const Game = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const current = history[stepNumber];

  const winner = calcWinner(current.squares);

  const moves = history.map((_, move) => {
    const desc = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  function handleClick(i) {
    const newSquares = [...current.squares];
    if (newSquares[i] || winner) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    const pastHistory = history.slice(0, stepNumber + 1);
    setHistory([...pastHistory, { squares: newSquares }]);
    setXIsNext((prev) => !prev);
    setStepNumber((prev) => prev + 1);
  }

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className='game'>
      <div className='game-board'>
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className='game-info'>
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};
