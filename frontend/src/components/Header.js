import { Link, useLocation } from "react-router-dom"
import { Plus, Home, CheckSquare } from "lucide-react"

const Header = () => {
  const location = useLocation()

  return (
    <header
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "16px 0",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="container">
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "24px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <CheckSquare size={28} />
            Smart Task Manager
          </Link>

          <div style={{ display: "flex", gap: "16px" }}>
            <Link
              to="/"
              className={`btn ${location.pathname === "/" ? "btn-secondary" : "btn-primary"}`}
              style={{
                background: location.pathname === "/" ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)",
                color: "white",
                border: "2px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              <Home size={16} />
              Dashboard
            </Link>
            <Link
              to="/add-task"
              className={`btn ${location.pathname === "/add-task" ? "btn-secondary" : "btn-primary"}`}
              style={{
                background: location.pathname === "/add-task" ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)",
                color: "white",
                border: "2px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              <Plus size={16} />
              Add Task
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
