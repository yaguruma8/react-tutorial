import { useState } from 'react';
import { Board } from './Board';
import { calcWinner, calcCoordinate } from './utils';

export const Game = () => {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), pos: null },
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [isAsc, setIsAsc] = useState(true);

  const current = history[stepNumber];

  const winner = calcWinner(current.squares);

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  const steps = history.map((item, step) => {
    const coordinate = calcCoordinate(item.pos);
    const desc = step
      ? `Go to move #${step} (${coordinate.col}, ${coordinate.row})`
      : 'Go to game start';
    return (
      <li key={step}>
        <button
          onClick={() => jumpTo(step)}
          className={step === stepNumber ? 'current-history' : ''}
        >
          {desc}
        </button>
      </li>
    );
  });

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  function handleClick(e) {
    e.preventDefault();
    const current = history[stepNumber];
    const squares = [...current.squares];
    const pos = Number(e.target.dataset.num);
    if (Number.isNaN(pos) || squares[pos] || calcWinner(squares)) {
      e.stopPropagation();
      return;
    }
    // 現在の着手位置まで履歴を切り詰めてから新しい履歴を追加する
    squares[pos] = xIsNext ? 'X' : 'O';
    const prevHistory = history.slice(0, stepNumber + 1);
    const newHistory = { squares, pos };
    setHistory([...prevHistory, newHistory]);
    setXIsNext((prev) => !prev);
    setStepNumber((prev) => prev + 1);

    e.stopPropagation();
  }

  function toggle() {
    setIsAsc((prev) => !prev);
  }

  return (
    <div className='game'>
      <div className='game-board'>
        <Board squares={current.squares} onClick={(e) => handleClick(e)} />
      </div>
      <div className='game-info'>
        <div>{status}</div>
        <button className='toggle-button' onClick={() => toggle()}>
          {isAsc ? 'change ↓' : 'change ↑'}
        </button>
        {isAsc ? <ol>{steps}</ol> : <ol reversed>{steps.reverse()}</ol>}
      </div>
    </div>
  );
};
