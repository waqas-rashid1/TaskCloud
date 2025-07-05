const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
const app = express();
const PORT = 5000;

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'taskcloud',
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is working!');
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "API is running" });
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Access token required" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" });
    req.user = user;
    next();
  });
};

app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name)
      return res.status(400).json({ error: "Email, password, and name are required" });

    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0)
      return res.status(400).json({ error: "User already exists with this email" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();

    await db.query("INSERT INTO users (id, email, password, name) VALUES (?, ?, ?, ?)", [id, email, hashedPassword, name]);

    const token = jwt.sign({ userId: id, email }, JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ message: "User registered successfully", token, user: { id, email, name } });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password are required" });

    const [results] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (results.length === 0)
      return res.status(401).json({ error: "Invalid email or password" });

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ error: "Invalid email or password" });

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ message: "Login successful", token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/tasks", authenticateToken, async (req, res) => {
  try {
    const { category, status, search, sortBy } = req.query;
    let sql = "SELECT * FROM tasks WHERE user_id = ?";
    const params = [req.user.userId];

    if (category && category !== "all") {
      sql += " AND category = ?";
      params.push(category);
    }

    if (status && status !== "all") {
      if (status === "completed") sql += " AND completed = 1";
      else if (status === "pending") sql += " AND completed = 0";
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

    const [results] = await db.query(sql, params);
    res.json(results);
  } catch (err) {
    console.error("Get tasks error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/tasks", authenticateToken, async (req, res) => {
  try {
    const { title, description, category, deadline, priority } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const newTask = {
      id: uuidv4(),
      title,
      description: description || "",
      category: category || "work",
      deadline: deadline || null,
      completed: false,
      priority: priority || "medium",
      createdAt: new Date(),
      user_id: req.user.userId,
    };

    const sql = `INSERT INTO tasks (id, title, description, category, deadline, completed, priority, createdAt, user_id)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    await db.query(sql, [newTask.id, newTask.title, newTask.description, newTask.category, newTask.deadline, newTask.completed, newTask.priority, newTask.createdAt, newTask.user_id]);
    res.status(201).json(newTask);
  } catch (err) {
    console.error("Create task error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/tasks/:id", authenticateToken, async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM tasks WHERE id = ? AND user_id = ?", [req.params.id, req.user.userId]);
    if (results.length === 0) return res.status(404).json({ error: "Task not found" });
    res.json(results[0]);
  } catch (err) {
    console.error("Get task by ID error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/tasks/:id", authenticateToken, async (req, res) => {
  try {
    const [result] = await db.query("UPDATE tasks SET ? WHERE id = ? AND user_id = ?", [req.body, req.params.id, req.user.userId]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task updated successfully" });
  } catch (err) {
    console.error("Update task error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/tasks/:id", authenticateToken, async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM tasks WHERE id = ? AND user_id = ?", [req.params.id, req.user.userId]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Delete task error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.patch("/api/tasks/:id/toggle", authenticateToken, async (req, res) => {
  try {
    const [result] = await db.query("UPDATE tasks SET completed = NOT completed WHERE id = ? AND user_id = ?", [req.params.id, req.user.userId]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task completion toggled" });
  } catch (err) {
    console.error("Toggle task completion error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/stats", authenticateToken, async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT 
        COUNT(*) AS total,
        SUM(completed = 1) AS completed,
        SUM(completed = 0) AS pending,
        SUM(completed = 0 AND deadline < NOW()) AS overdue
      FROM tasks
      WHERE user_id = ?
    `, [req.user.userId]);

    res.json(results[0]);
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
