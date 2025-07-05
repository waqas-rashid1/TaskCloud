import TaskItem from "./TaskItem"
import { Calendar } from "lucide-react"

const TaskList = ({ tasks, onToggleComplete, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="card" style={{ padding: "48px", textAlign: "center" }}>
        <Calendar size={48} style={{ color: "#d1d5db", margin: "0 auto 16px" }} />
        <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>No tasks found</h3>
        <p style={{ color: "#6b7280" }}>Try adjusting your filters or create a new task to get started!</p>
      </div>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggleComplete={onToggleComplete} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default TaskList