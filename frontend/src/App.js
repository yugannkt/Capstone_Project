// export default App;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [filter, setFilter] = useState('all');

  // Base URL for the API
  const API_URL = process.env.REACT_APP_API_URL || 'http://107.23.221.2:5000'; // Fallback to localhost for development

  const fetchTasks = async () => {
    const response = await axios.get(`${API_URL}/tasks`);
    setTasks(response.data);
  };

  const addTask = async () => {
    if (!taskTitle) return; // Prevent adding empty tasks
    const response = await axios.post(`${API_URL}/tasks`, { title: taskTitle });
    setTasks([...tasks, response.data]);
    setTaskTitle('');
  };

  const editTask = async (task) => {
    const newTitle = prompt('Edit Task', task.title);
    if (newTitle) {
      const response = await axios.put(`${API_URL}/tasks/${task.id}/edit`, { title: newTitle });
      setTasks(tasks.map(t => (t.id === task.id ? response.data : t)));
    }
  };

  const toggleTask = async (task) => {
    const response = await axios.put(`${API_URL}/tasks/${task.id}`);
    setTasks(tasks.map(t => (t.id === task.id ? response.data : t)));
  };

  const deleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await axios.delete(`${API_URL}/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true; // all
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Task Checklist</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Add a new task"
        />
        <button className="btn btn-primary" onClick={addTask}>Add Task</button>
      </div>
      <div className="mb-3">
        <button className="btn btn-secondary mr-2" onClick={() => setFilter('all')}>All</button>
        <button className="btn btn-info mr-2" onClick={() => setFilter('active')}>Active</button>
        <button className="btn btn-success mr-2" onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <ul className="list-group">
        {filteredTasks.map(task => (
          <li key={task.id} className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'list-group-item-success' : ''}`}>
            <div>
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</span>
              <br />
              <small className="text-muted">Created at: {task.createdAt}</small>
            </div>
            <div>
              <button className="btn btn-warning btn-sm" onClick={() => editTask(task)}>Edit</button>
              <button className="btn btn-success btn-sm" onClick={() => toggleTask(task)}>Toggle</button>
              <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
