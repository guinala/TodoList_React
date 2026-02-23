import "../App.css";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

function Task({
  children,
  isCompleted,
  isEditing,
  editingContent,
  onEditContentChange,
  onClick,
  onClickEdit,
  onClickDelete,
  onSaveEdit,
  onCancelEdit,
}) {
  if (isEditing) {
    return (
      <li className="flex items-center gap-2 bg-slate-800 border border-indigo-500 rounded-xl px-4 py-3 shadow">
        <input
          autoFocus
          value={editingContent}
          onChange={(e) => onEditContentChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSaveEdit();
            if (e.key === "Escape") onCancelEdit();
          }}
          className="flex-1 bg-transparent text-white text-sm focus:outline-none"
        />
        <button
          onClick={onSaveEdit}
          className="text-xs px-2 py-1 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors"
        >
          Save
        </button>
        <button
          onClick={onCancelEdit}
          className="text-xs px-2 py-1 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors"
        >
          Cancel
        </button>
      </li>
    );
  }

  return (
    <li
      className={`flex items-center gap-3 border rounded-xl px-4 py-3 shadow text-left text-sm transition-colors ${
        isCompleted
          ? "bg-emerald-950 border-emerald-700 text-emerald-300"
          : "bg-slate-800 border-slate-600 text-white"
      }`}
    >
      <button
        onClick={onClick}
        className="flex-shrink-0 p-0 bg-transparent border-0 cursor-pointer"
      >
        <span
          className={`todo__check ${isCompleted ? "todo__check--checked" : ""}`}
        >
          {isCompleted ? "✓" : ""}
        </span>
      </button>

      <span
        className={`flex-1 ${isCompleted ? "line-through opacity-70" : ""}`}
      >
        {children}
      </span>

      <div className="flex gap-1">
        {!isCompleted && <EditButton onClickEvent={onClickEdit} />}
        <DeleteButton onClickEvent={onClickDelete} />
      </div>
    </li>
  );
}

export default Task;
