"use client"

import { useAuth } from "../contexts/AuthContext"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            border: "4px solid rgba(255, 255, 255, 0.3)",
            borderTop: "4px solid white",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
      </div>
    )
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute
