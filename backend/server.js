const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 5000;

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "taskcloud",
});

// DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("✅ Connected to MySQL database");
});

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
// const tasks = [
//   {
//     id: "1",
//     title: "testing task",
//     description: "testng task description",
//     category: "work",
//     deadline: "2024-01-15T10:00:00",
//     completed: false,
//     priority: "high",
//     createdAt: "2024-01-10T08:00:00",
//   },
// ];

// get /api/tasks - Get all tasks
app.get("/api/tasks", (req, res) => {
  const { category, status, search, sortBy } = req.query;

  let sql = "SELECT * FROM tasks WHERE 1=1";
  const params = [];

  if (category && category !== "all") {
    sql += " AND category = ?";
    params.push(category);
  }

  if (status && status !== "all") {
    if (status === "completed") {
      sql += " AND completed = 1";
    } else if (status === "pending") {
      sql += " AND completed = 0";
    }
  }

  if (search) {
    sql += " AND (title LIKE ? OR description LIKE ?)";
    const keyword = `%${search}%`;
    params.push(keyword, keyword);
  }

  if (sortBy) {
    switch (sortBy) {
      case "deadline":
        sql += " ORDER BY deadline ASC";
        break;
      case "priority":
        sql += ` ORDER BY 
          CASE priority
            WHEN 'high' THEN 3
            WHEN 'medium' THEN 2
            WHEN 'low' THEN 1
            ELSE 0
          END DESC`;
        break;
      case "created":
        sql += " ORDER BY createdAt DESC";
        break;
    }
  }

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
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
    deadline: deadline || null,
    completed: false,
    priority: priority || "medium",
    createdAt: new Date(),
  };

  const sql = `INSERT INTO tasks (id, title, description, category, deadline, completed, priority, createdAt)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [
      newTask.id,
      newTask.title,
      newTask.description,
      newTask.category,
      newTask.deadline,
      newTask.completed,
      newTask.priority,
      newTask.createdAt,
    ],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json(newTask);
    }
  );
});

// get /api/tasks/:id
app.get("/api/tasks/:id", (req, res) => {
  const sql = "SELECT * FROM tasks WHERE id = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Task not found" });
    res.json(results[0]);
  });
});

// put /api/tasks/:id
app.put("/api/tasks/:id", (req, res) => {
  const sql = "UPDATE tasks SET ? WHERE id = ?";
  db.query(sql, [req.body, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Task updated successfully" });
  });
});

// delete /api/tasks/:id
app.delete("/api/tasks/:id", (req, res) => {
  db.query("DELETE FROM tasks WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Task deleted successfully" });
  });
});

// patch /api/tasks/:id/toggle (toggle task completion status)
app.patch("/api/tasks/:id/toggle", (req, res) => {
  const sql = "UPDATE tasks SET completed = NOT completed WHERE id = ?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Task completion toggled" });
  });
});

// get /api/stats (Get task statistics)
app.get("/api/stats", (req, res) => {
  const sql = `
    SELECT 
      COUNT(*) AS total,
      SUM(completed = 1) AS completed,
      SUM(completed = 0) AS pending,
      SUM(completed = 0 AND deadline < NOW()) AS overdue
    FROM tasks
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})