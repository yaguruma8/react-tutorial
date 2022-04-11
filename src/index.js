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

const Board = (props) => {
  function renderSquare(i) {
    return (
      <Square
        value={props.squares[i]}
        onClick={() => {
          props.onClick(i);
        }}
      />
    );
  }

  return (
    <div>
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
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);

  const current = history[history.length - 1];
  const winner = calcWinner(current.squares);

  function handleClick(i) {
    if (current.squares[i] || winner) {
      return;
    }
    const newSquares = [...current.squares];
    newSquares[i] = xIsNext ? 'X' : 'O';
    setHistory((prev) => [...prev, { squares: newSquares }]);
    setXIsNext((prev) => !prev);
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
