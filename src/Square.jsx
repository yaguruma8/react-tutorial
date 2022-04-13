export const Square = (props) => {
  return (
    <button className='square' value={props.no}>
      {props.mark}
    </button>
  );
};