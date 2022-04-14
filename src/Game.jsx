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

  const steps = history.map((item, step) => {
    const coordinate = calcCoordinate(item.pos);
    const desc = step
      ? `Go to move #${step} (${coordinate.col}, ${coordinate.row})`
      : 'Go to game start';
    return (
      <li key={step}>
        <button onClick={() => jumpTo(step)}>{desc}</button>
      </li>
    );
  });

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  function handleClick(e) {
    e.preventDefault();
    // マス以外のdiv.game-boardの範囲をクリックした場合
    if (e.target.value === undefined) {
      e.stopPropagation();
      return;
    }
    const newSquares = [...current.squares];
    const pos = Number(e.target.value);
    // 既にマスが埋まっているか勝者が決まっている
    if (newSquares[pos] || winner) {
      e.stopPropagation();
      return;
    }

    newSquares[pos] = xIsNext ? 'X' : 'O';
    const prevHistory = history.slice(0, stepNumber + 1);
    const newHistory = { squares: newSquares, pos: pos };
    setHistory([...prevHistory, newHistory]);
    setXIsNext((prev) => !prev);
    setStepNumber((prev) => prev + 1);

    e.stopPropagation();
  }

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className='game'>
      <div className='game-board' onClick={(e) => handleClick(e)}>
        <Board squares={current.squares} />
      </div>
      <div className='game-info'>
        <div>{status}</div>
        <ol>{steps}</ol>
      </div>
    </div>
  );
};
