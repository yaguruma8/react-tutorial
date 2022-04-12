export const Square = (props) => {
  return (
    <button className='square' onClick={props.onClick} value={props.no}>
      {props.value}
    </button>
  );
};