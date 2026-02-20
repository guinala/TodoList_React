import '../App.css';

function Task({ children, onClick, isCompleted }) {
  return (
    <li>
      <button onClick={onClick} className={isCompleted ? 'todo__task-button todo__task-button--done' : 'todo__task-button'}>
        <span className={isCompleted ? 'todo__check todo__check--checked' : 'todo__check'}>{isCompleted ? '✓' : ''}</span>
        <span className="todo__task-content">{children}</span>
      </button>
    </li>
  );
}

export default Task
