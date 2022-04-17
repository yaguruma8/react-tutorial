export const Square = (props) => {
  return (
    <button
      className={props.isWin ? 'square win-square' : 'square'}
      data-num={props.num}
    >
      {props.mark}
    </button>
  );
};
