export const Square = (props) => {
  return (
    <button
      className={props.isWin ? 'square win-square' : 'square'}
      onClick={props.onClick}
    >
      {props.mark}
    </button>
  );
};
