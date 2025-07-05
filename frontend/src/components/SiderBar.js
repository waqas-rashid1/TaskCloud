import { BarChart3, AlertTriangle } from "lucide-react"

const Sidebar = ({ stats, upcomingTasks }) => {
  const getCategoryColor = (category) => {
    const colors = {
      work: "#3b82f6",
      personal: "#10b981",
      learning: "#8b5cf6",
      health: "#ef4444",
      finance: "#f59e0b",
    }
    return colors[category] || "#6b7280"
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Stats Card */}
      <div className="card" style={{ padding: "24px" }}>
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "600",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#1f2937",
          }}
        >
          <BarChart3 size={20} style={{ color: "#667eea" }} />
          Task Statistics
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#6b7280" }}>Total Tasks:</span>
            <span
              style={{
                fontWeight: "600",
                color: "#1f2937",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {stats.total}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#6b7280" }}>Completed:</span>
            <span style={{ fontWeight: "600", color: "#10b981" }}>{stats.completed}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#6b7280" }}>Pending:</span>
            <span style={{ fontWeight: "600", color: "#3b82f6" }}>{stats.pending}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#6b7280" }}>Overdue:</span>
            <span style={{ fontWeight: "600", color: "#ef4444" }}>{stats.overdue}</span>
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      {upcomingTasks.length > 0 && (
        <div className="card" style={{ padding: "24px" }}>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#1f2937",
            }}
          >
            <AlertTriangle size={20} style={{ color: "#f59e0b" }} />
            Upcoming Deadlines
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {upcomingTasks.slice(0, 5).map((task) => (
              <div
                key={task.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px",
                  background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: getCategoryColor(task.category),
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#1f2937",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {task.title}
                  </p>
                  <p style={{ fontSize: "12px", color: "#6b7280" }}>{new Date(task.deadline).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar
