const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tasks = []; // This will hold our tasks in memory
let idCounter = 1; // Simple ID counter for tasks

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Task Checklist API'); // Message for root endpoint
});

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  const newTask = {
    id: idCounter++,
    title,
    completed: false,
    createdAt: new Date().toLocaleString(), // Add createdAt timestamp
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Toggle task completion
app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (task) {
    task.completed = !task.completed;
    res.json(task);
  } else {
    res.status(404).send('Task not found');
  }
});

// Edit a task
app.put('/tasks/:id/edit', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (task) {
    task.title = req.body.title;
    res.json(task);
  } else {
    res.status(404).send('Task not found');
  }
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
