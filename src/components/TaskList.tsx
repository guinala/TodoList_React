import "../App.css";
import EmptyState from "./EmptyState";
import Task from "./Task";

type TaskListProps = {
  tasks: { content: string; state: string }[];
  filteredTasks: { content: string; state: string }[];
  editingIndex: number | null;
  editingContent: string;
  onEditContentChange: (content: string) => void;
  onToggle: (index: number) => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  onSaveEdit: (index: number) => void;
  onCancelEdit: () => void;
};

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
}: TaskListProps) {
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
