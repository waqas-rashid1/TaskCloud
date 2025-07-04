const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is working!');
});

app.get('/api/tasks', (req, res) => {
  res.json([
    { id: 1, title: "Build backend", completed: false },
    { id: 2, title: "Connect to frontend", completed: false }
  ]);
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