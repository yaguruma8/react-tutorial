export const Square = (props) => {
  return (
    <button
      className={props.isWin ? 'square win-square' : 'square'}
      value={props.num}
    >
      {props.mark}
    </button>
  );
};
