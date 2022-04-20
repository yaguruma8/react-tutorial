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
  for (const line of winLines) {
    if (isFilledSameMark(squares, line)) {
      return squares[line[0]];
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
  for (const line of filterLines) {
    if (isFilledSameMark(squares, line)) {
      return true;
    }
  }
  return false;
}

export function isDraw(squares) {
  return !squares.includes(null) && !calcWinner(squares);
}

function isFilledSameMark(squares, line) {
  // lineの各番号のマスが全てnullでなく、かつ、全て同じMarkならtrue
  const first = squares[line[0]];
  return line.every((v) => squares[v] !== null && squares[v] === first);
}
