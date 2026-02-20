import React, { useState } from 'react';
import './App.css';
import EmptyState from './components/EmptyState';
import Task from './components/Task';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [taskDisplay, setNewTask] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  function addTask() 
  {
    const newTask = { content: taskDisplay, state: 'pending' };
    setTasks([...tasks, newTask]);
    setNewTask('');
  }

  function handleInput(event) 
  {
    const content = event.target.value;
    setNewTask(content);
  }

  function handleKey(event) 
  {
    const key = event.key;

    if(key === 'Enter')
    {
      addTask();
    }
  }

  function handleSearchChange(event) 
  {
    setSearch(event.target.value);
  }

  function filterAllTasks() 
  {
    setFilter('all');
  }

  function filterPendingTasks() 
  {
    setFilter('pending');
  }

  function filterCompletedTasks() 
  {
    setFilter('completed');
  }

  const counts = 
  {
    all: tasks.length,
    pending: tasks.filter(t => t.state === 'pending').length,
    completed: tasks.filter(t => t.state === 'completed').length,
  };

  const filteredTasks = tasks
    .filter(task => (filter === 'all' ? true : task.state === filter))
    .filter(task => task.content.toLowerCase().includes(search.trim().toLowerCase()));

  function toggleTask(index: number) 
  {
    setTasks(tasks.map((t, i) => (i === index ? { ...t, state: t.state === 'pending' ? 'completed' : 'pending' } : t)));
  }

  function deleteTask(index: number) 
  {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  return (
    <>
      <div className="todo__container">
        <h1 className="todo__title">My To-Do List</h1>

        <div className="todo__input-area">
          <input value={taskDisplay} onChange={handleInput} onKeyDown={handleKey} className="todo__input" placeholder="Escribe una tarea..." />
          <button className="todo__add-button" onClick={addTask}>+</button>
        </div>

        <div className="todo__search">
          <input value={search} onChange={handleSearchChange} className="todo__search-input" placeholder="Buscar tareas..." />
        </div>

        <div className="todo__filters">
          <button onClick={filterAllTasks}>All ({counts.all})</button>
          <button onClick={filterPendingTasks}>Pending ({counts.pending})</button>
          <button onClick={filterCompletedTasks}>Completed ({counts.completed})</button>
        </div>

        {filteredTasks.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="todo__task-list">
            {filteredTasks.map((task) => {
              const index = tasks.indexOf(task);
              return (
                <Task key={index} onClick={() => toggleTask(index)} isCompleted={task.state === 'completed'}>
                  {task.content}
                </Task>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}

export default TodoList;
