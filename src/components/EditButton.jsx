import '../App.css';

function EditButton({onClickEvent}) 
{
  return (
    <button onClick={onClickEvent} className='p-1.5 rounded-lg bg-slate-700 hover:bg-indigo-600 text-slate-300 hover:text-white transition-colors text-xs'>✏️</button>
  );
}

export default EditButton
