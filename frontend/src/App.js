import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
