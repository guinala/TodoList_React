import React, { useState, useEffect } from "react";
import "./App.css";
import { sileo, Toaster } from "sileo";
import EmptyState from "./components/EmptyState";
import Task from "./components/Task";

interface TaskItem {
  content: string;
  state: "pending" | "completed";
}

function TodoList() {
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [taskDisplay, setNewTask] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingIndex, setEditingIndex] = useState<number | undefined>();
  const [editingContent, setEditingContent] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    const trimmed = taskDisplay.trim();

    if (!trimmed) return;

    const newTask: TaskItem = { content: trimmed, state: "pending" };
    setTasks([...tasks, newTask]);
    setNewTask("");

    sileo.success({
      title: "New Task Added!",
      fill: "black",
    });
  }

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const content = event.target.value;
    setNewTask(content);
  }

  function handleKey(event: React.KeyboardEvent<HTMLInputElement>) {
    const key = event.key;

    if (key === "Enter") {
      addTask();
    }
  }

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  const counts = {
    all: tasks.length,
    pending: tasks.filter((t: TaskItem) => t.state === "pending").length,
    completed: tasks.filter((t: TaskItem) => t.state === "completed").length,
  };

  // const filteredTasks = tasks
  //   .filter((task: TaskItem) =>
  //     filter === "all" ? true : task.state === filter,
  //   )
  //   .filter((task: TaskItem) =>
  //     task.content.toLowerCase().includes(search.trim().toLowerCase()),
  //   );

  const filteredTasks = tasks.filter(
    (task: TaskItem) =>
      (filter === "all" || task.state === filter) &&
      task.content.toLowerCase().includes(search.trim().toLowerCase()),
  );

  function toggleTask(index: number) {
    setTasks(
      tasks.map((t: TaskItem, i: number) =>
        i === index
          ? { ...t, state: t.state === "pending" ? "completed" : "pending" }
          : t,
      ),
    );
  }

  function deleteTask(index: number) {
    setTasks(tasks.filter((_: TaskItem, i: number) => i !== index));
  }

  function startEdit(index: number) {
    setEditingIndex(index);
    setEditingContent(tasks[index].content);
  }

  function saveEdit(index: number) {
    const trimmed = editingContent.trim();

    if (!trimmed) return;

    setTasks(
      tasks.map((t: TaskItem, i: number) =>
        i === index ? { ...t, content: trimmed } : t,
      ),
    );

    setEditingIndex(undefined);
    setEditingContent("");
  }

  function cancelEdit() {
    setEditingIndex(undefined);
    setEditingContent("");
  }

  const filterButtons = [
    { key: "all", label: "All", count: counts.all },
    { key: "pending", label: "Pending", count: counts.pending },
    { key: "completed", label: "Completed", count: counts.completed },
  ];

  return (
    <>
      <Toaster position="top-right" />
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          My To-Do List
        </h1>

        <div className="w-full max-w-xl">
          <div className="flex gap-2 mb-3">
            <input
              value={taskDisplay}
              onChange={handleInput}
              onKeyDown={handleKey}
              className="flex-1 px-3 py-2 rounded-lg border border-slate-600 bg-slate-800 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-500"
              placeholder="Escribe una tarea..."
            />
            <button
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-lg transition-colors"
              onClick={addTask}
            >
              +
            </button>
          </div>

          <div className="mb-3">
            <input
              value={search}
              onChange={handleSearchChange}
              className="todo__search-input"
              placeholder="Buscar tareas..."
            />
          </div>

          <div className="todo__filters flex gap-2 mb-4">
            {filterButtons.map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filter === key
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {label} ({count})
              </button>
            ))}
          </div>

          {filteredTasks.length === 0 ? (
            <EmptyState />
          ) : (
            <ul className="todo__task-list">
              {filteredTasks.map((task) => {
                const index = tasks.indexOf(task);
                return (
                  <Task
                    key={index}
                    isCompleted={task.state === "completed"}
                    isEditing={editingIndex === index}
                    editingContent={editingContent}
                    onEditContentChange={setEditingContent}
                    onClick={() => toggleTask(index)}
                    onClickEdit={() => startEdit(index)}
                    onClickDelete={() => deleteTask(index)}
                    onSaveEdit={() => saveEdit(index)}
                    onCancelEdit={cancelEdit}
                  >
                    {task.content}
                  </Task>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default TodoList;
