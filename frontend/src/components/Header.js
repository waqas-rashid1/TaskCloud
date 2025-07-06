import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Plus, Home, FileCheck2, User, LogOut } from "lucide-react"
import { useState } from "react"

const Header = () => {
  const location = useLocation()
  const { user, logout } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
  }

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
              fontSize: "20px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <FileCheck2 size={24} color="#ffffff" />
            <span className="mobile-hide">TaskCloud</span>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Navigation Links */}
            <div className="mobile-stack" style={{ gap: "12px" }}>
              <Link
                to="/"
                className={`btn ${location.pathname === "/" ? "btn-secondary" : "btn-primary"}`}
                style={{
                  background: location.pathname === "/" ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                  padding: "8px 16px",
                }}
              >
                <Home size={16} />
                <span className="mobile-hide">Dashboard</span>
              </Link>
              <Link
                to="/add-task"
                className={`btn ${location.pathname === "/add-task" ? "btn-secondary" : "btn-primary"}`}
                style={{
                  background:
                    location.pathname === "/add-task" ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                  padding: "8px 16px",
                }}
              >
                <Plus size={16} />
                <span className="mobile-hide">Add Task</span>
              </Link>
            </div>

            {/* User Menu */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                <User size={16} />
                <span className="mobile-hide">{user?.name}</span>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: "0",
                    marginTop: "8px",
                    background: "white",
                    borderRadius: "8px",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                    minWidth: "200px",
                    zIndex: 1000,
                  }}
                >
                  <div style={{ padding: "16px", borderBottom: "1px solid #e2e8f0" }}>
                    <p style={{ fontWeight: "600", color: "#1f2937", marginBottom: "4px" }}>{user?.name}</p>
                    <p style={{ fontSize: "14px", color: "#6b7280" }}>{user?.email}</p>
                  </div>
                  <div style={{ padding: "8px" }}>
                    <button
                      onClick={handleLogout}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        background: "none",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        color: "#ef4444",
                        fontSize: "14px",
                        fontWeight: "500",
                        transition: "background-color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = "#fef2f2")}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* Click outside to close menu */}
      {showUserMenu && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
          }}
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  )
}

export default Header
