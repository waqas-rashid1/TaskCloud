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
                padding: "24px",
                opacity: task.completed ? 0.7 : 1,
                transition: "all 0.3s ease",
            }}
        >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
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
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
                        <div style={{ flex: 1 }}>
                            <h3
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "600",
                                    color: task.completed ? "#9ca3af" : "#1f2937",
                                    textDecoration: task.completed ? "line-through" : "none",
                                    marginBottom: "8px",
                                }}
                            >
                                {task.title}
                            </h3>

                            {task.description && (
                                <p
                                    style={{
                                        color: task.completed ? "#9ca3af" : "#6b7280",
                                        marginBottom: "16px",
                                        lineHeight: "1.5",
                                    }}
                                >
                                    {task.description}
                                </p>
                            )}

                            {/* Badges */}
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
                                <span className={`badge badge-${task?.category || "default"}`}>
                                    {task?.category
                                        ? task.category.charAt(0).toUpperCase() + task.category.slice(1)
                                        : "Category"}
                                </span>

                                <span className={`badge badge-${task?.priority || "default"}`}>
                                    {task?.priority
                                        ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1)
                                        : "Priority"} Priority
                                </span>


                                {task.deadline && (
                                    <span className={`badge badge-${deadlineStatus}`}>
                                        <Clock size={12} />
                                        {format(parseISO(task.deadline), "MMM dd, HH:mm")}
                                    </span>
                                )}

                                <span
                                    style={{
                                        fontSize: "12px",
                                        color: "#9ca3af",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "4px",
                                    }}
                                >
                                    {task?.createdAt && !isNaN(Date.parse(task.createdAt)) ? (
                                        <>
                                            <Calendar size={12} />
                                            Created {format(parseISO(task.createdAt), "MMM dd")}
                                        </>
                                    ) : (
                                        <>
                                            <Calendar size={12} />
                                            Created —
                                        </>
                                    )}

                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: "flex", gap: "8px" }}>
                            <Link to={`/edit-task/${task.id}`} className="btn btn-secondary" style={{ padding: "8px" }}>
                                <Edit size={16} />
                            </Link>
                            <button onClick={() => onDelete(task.id)} className="btn btn-danger" style={{ padding: "8px" }}>
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskItem
