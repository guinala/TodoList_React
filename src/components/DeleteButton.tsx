import '../App.css';

function DeleteButton(onClickEvent) {
  return (
    <li>
      <button onClick={onClickEvent}className=''>
        <span>🗑️</span>
      </button>
    </li>
  );
}

export default DeleteButton
