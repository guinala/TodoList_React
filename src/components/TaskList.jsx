import "../App.css";
import EmptyState from "./EmptyState";
import Task from "./Task";

function TaskList({
  tasks,
  filteredTasks,
  editingIndex,
  editingContent,
  onEditContentChange,
  onToggle,
  onEdit,
  onDelete,
  onSaveEdit,
  onCancelEdit,
}) {
  if (filteredTasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul className="flex flex-col gap-2 p-0 list-none m-0">
      {filteredTasks.map((task) => {
        const index = tasks.indexOf(task);
        return (
          <Task
            key={index}
            index={index}
            isCompleted={task.state === "completed"}
            isEditing={editingIndex === index}
            editingContent={editingContent}
            onEditContentChange={onEditContentChange}
            onClick={() => onToggle(index)}
            onClickEdit={() => onEdit(index)}
            onClickDelete={() => onDelete(index)}
            onSaveEdit={() => onSaveEdit(index)}
            onCancelEdit={onCancelEdit}
          >
            {task.content}
          </Task>
        );
      })}
    </ul>
  );
}

export default TaskList;
