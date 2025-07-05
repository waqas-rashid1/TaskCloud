const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is working!');
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "API is running" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// dummy data for tasks
const tasks = [
  {
    id: "1",
    title: "testing task",
    description: "testng task description",
    category: "work",
    deadline: "2024-01-15T10:00:00",
    completed: false,
    priority: "high",
    createdAt: "2024-01-10T08:00:00",
  },
];

// get /api/tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// post /api/tasks
app.post("/api/tasks", (req, res) => {
  const { title, description, category, deadline, priority } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = {
    id: uuidv4(),
    title,
    description: description || "",
    category: category || "work",
    deadline: deadline || "",
    completed: false,
    priority: priority || "medium",
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// get /api/tasks/:id
app.get("/api/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json(task);
});

// put /api/tasks/:id
app.put("/api/tasks/:id", (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id === req.params.id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const updatedTask = { ...tasks[taskIndex], ...req.body };
  tasks[taskIndex] = updatedTask;
  res.json(updatedTask);
});

// delete /api/tasks/:id
app.delete("/api/tasks/:id", (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id === req.params.id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(taskIndex, 1);
  res.json({ message: "Task deleted successfully" });
});

// patch /api/tasks/:id/toggle (toggle task completion status)
app.patch("/api/tasks/:id/toggle", (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id === req.params.id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  res.json(tasks[taskIndex]);
});

// get /api/stats (Get task statistics)
app.get("/api/stats", (req, res) => {
  const total = tasks.length
  const completed = tasks.filter((t) => t.completed).length
  const pending = tasks.filter((t) => !t.completed).length
  const overdue = tasks.filter((t) => !t.completed && t.deadline && new Date(t.deadline) < new Date()).length

  res.json({ total, completed, pending, overdue })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})