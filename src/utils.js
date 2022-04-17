const winLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function calcWinner(squares) {
  for (const [a, b, c] of winLines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export function calcCoordinate(pos) {
  if (pos === null) {
    return null;
  }
  const col = Math.floor(pos / 3) + 1;
  const row = (pos % 3) + 1;
  return { col, row };
}

export function isWinSquare(squares, num) {
  // 勝者が決まっていなければfalse
  if (!calcWinner(squares)) {
    return false;
  }
  const filterLines = winLines.filter((line) => line.includes(num));
  for (const [a, b, c] of filterLines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return true;
    }
  }
  return false;
}

export function isDraw(squares) {
  return !squares.includes(null) && !calcWinner(squares);
}
