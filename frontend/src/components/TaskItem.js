"use client"
import { Link } from "react-router-dom"
import { Edit, Trash2, Clock, Calendar } from "lucide-react"
import { format, differenceInDays, parseISO } from "date-fns"

const TaskItem = ({ task, onToggleComplete, onDelete }) => {
    const getDeadlineStatus = (deadline, completed) => {
        if (completed) return "completed"
        if (!deadline) return "none"

        const deadlineDate = parseISO(deadline)
        const today = new Date()
        const daysUntil = differenceInDays(deadlineDate, today)

        if (daysUntil < 0) return "overdue"
        if (daysUntil <= 1) return "urgent"
        if (daysUntil <= 3) return "soon"
        return "normal"
    }

    const deadlineStatus = getDeadlineStatus(task.deadline, task.completed)

    return (
        <div
      className="card"
      style={{
        opacity: task.completed ? 0.7 : 1,
        transition: "all 0.3s ease",
        marginBottom: "16px",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
        {/* Checkbox */}
        <input
          type="checkbox"
          className="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          style={{ marginTop: "4px" }}
        />

        {/* Task Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: task.completed ? "#9ca3af" : "#1f2937",
                  textDecoration: task.completed ? "line-through" : "none",
                  marginBottom: "8px",
                  wordBreak: "break-word",
                }}
              >
                {task.title}
              </h3>

              {task.description && (
                <p
                  style={{
                    color: task.completed ? "#9ca3af" : "#6b7280",
                    marginBottom: "12px",
                    lineHeight: "1.5",
                    fontSize: "14px",
                    wordBreak: "break-word",
                  }}
                >
                  {task.description}
                </p>
              )}

              {/* Badges */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center", marginBottom: "8px" }}>
                <span className={`badge badge-${task.category}`}>
                  {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                </span>

                <span className={`badge badge-${task.priority}`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>

                {task.deadline && (
                  <span className={`badge badge-${deadlineStatus}`}>
                    <Clock size={10} />
                    {format(parseISO(task.deadline), "MMM dd")}
                  </span>
                )}
              </div>

              <span
                style={{
                  fontSize: "11px",
                  color: "#9ca3af",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Calendar size={10} />
                Created {format(parseISO(task.createdAt), "MMM dd")}
              </span>
            </div>

            {/* Actions */}
            <div className="mobile-stack" style={{ flexShrink: 0 }}>
              <Link
                to={`/edit-task/${task.id}`}
                className="btn btn-secondary"
                style={{ padding: "8px", minWidth: "40px" }}
              >
                <Edit size={14} />
              </Link>
              <button
                onClick={() => onDelete(task.id)}
                className="btn btn-danger"
                style={{ padding: "8px", minWidth: "40px" }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default TaskItem
