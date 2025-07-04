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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
