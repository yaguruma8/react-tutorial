import React from 'react';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const Square = (props) => {
  const [value, setValue] = useState(null);

  return (
    <button
      className='square'
      onClick={() => {
        console.log('click');
        setValue((prev) => 'X')
      }}
    >
      {value}
    </button>
  );
};

const Board = () => {
  function renderSquare(i) {
    return <Square value={i} />;
  }

  const status = 'Next player: X';

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

// ======================================== render

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Game />);
