import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
        <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>
        </div>
    </Router>
  );
}

export default App;
