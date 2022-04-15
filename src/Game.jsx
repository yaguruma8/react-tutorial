import { useState } from 'react';
import { Board } from './Board';
import { calcWinner, calcCoordinate } from './utils';

export const Game = () => {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), pos: null },
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

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
    const newSquares = [...current.squares];
    const pos = Number(e.target.value);
    // 既にマスが埋まっているか勝者が決まっている場合は何もしない
    if (newSquares[pos] || winner) {
      e.stopPropagation();
      return;
    }
    // 現在の着手位置まで履歴を切り詰めてから新しい履歴を追加する
    newSquares[pos] = xIsNext ? 'X' : 'O';
    const prevHistory = history.slice(0, stepNumber + 1);
    const newHistory = { squares: newSquares, pos: pos };
    setHistory([...prevHistory, newHistory]);
    setXIsNext((prev) => !prev);
    setStepNumber((prev) => prev + 1);

    e.stopPropagation();
  }

  return (
    <div className='game'>
      <div className='game-board'>
        <Board squares={current.squares} onClick={(e) => handleClick(e)}/>
      </div>
      <div className='game-info'>
        <div>{status}</div>
        <ol>{steps}</ol>
      </div>
    </div>
  );
};
