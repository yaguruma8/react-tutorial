import { Square } from './Square';
import { Fragment } from 'react';
import { isWinSquare } from './utils';

export const Board = (props) => {
  function renderSquare(i) {
    return (
      <Square
        mark={props.squares[i]}
        num={i}
        isWin={isWinSquare(props.squares, i)}
      />
    );
  }

  const grid = [];
  for (let y = 0; y < 3; y++) {
    const row = [];
    for (let x = 0; x < 3; x++) {
      const serialNo = 3 * y + x;
      row.push(<Fragment key={serialNo}>{renderSquare(serialNo)}</Fragment>);
    }
    grid.push(
      <div className='board-row' key={y}>
        {row}
      </div>
    );
  }

  return <div onClick={(e) => props.onClick(e)}>{grid}</div>;
};
