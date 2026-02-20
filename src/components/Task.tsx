import '../App.css';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

function Task({ children, onClickAdd, onClickEdit, onClickDelete, isCompleted }) {
  return (
    <li>
      <button onClick={onClickAdd} className={isCompleted ? 'todo__task-button todo__task-button--done' : 'todo__task-button'}>
        <span className={isCompleted ? 'todo__check todo__check--checked' : 'todo__check'}>{isCompleted ? '✓' : ''}</span>
        <span className="todo__task-content">{children}</span>
        <EditButton onClick={onClickEdit}></EditButton>
        <DeleteButton onClick={onClickDelete}></DeleteButton>
      </button>
    </li>
  );
}

export default Task
