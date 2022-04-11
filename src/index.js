import React from 'react';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const Square = (props) => {
  return (
    <button className='square' onClick={props.onClick}>
      {props.value}
    </button>
  );
};

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function renderSquare(i) {
    return (
      <Square
        value={squares[i]}
        onClick={() => {
          handleClick(i);
        }}
      />
    );
  }

  const winner = calcWinner(squares);

  function handleClick(i) {
    if (squares[i] || winner) {
      return;
    }
    const newSquares = [...squares];
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext((prev) => !prev);
  }

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div>
      <div className='status'>{status}</div>
      <div className='board-row'>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className='board-row'>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className='board-row'>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const Game = () => {
  return (
    <div className='game'>
      <div className='game-board'>
        <Board />
      </div>
      <div className='game-info'>
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
};

// ======================================== helper
function calcWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ======================================== render

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Game />);
