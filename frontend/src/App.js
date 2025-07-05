import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header";
import TaskForm from "./pages/TaskForm";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
        <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-task" element={<TaskForm />} />
            <Route path="/edit-task/:id" element={<TaskForm />} />
          </Routes>
        </main>
        </div>
    </Router>
  );
}

export default App;
