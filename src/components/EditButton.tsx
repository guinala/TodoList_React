import '../App.css';

function EditButton(onClickEvent) {
  return (
    <li>
      <button onClick={onClickEvent} className=''>
        <span>✏️</span>
      </button>
    </li>
  );
}

export default EditButton
