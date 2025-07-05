"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-hot-toast"
import { Save, ArrowLeft } from "lucide-react"
import { taskService } from "../services/taskService"

const TaskForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = Boolean(id)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "work",
    deadline: "",
    priority: "medium",
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isEditing) {
      fetchTask()
    }
  }, [id, isEditing])

  const fetchTask = async () => {
    try {
      setLoading(true)
      const task = await taskService.getTask(id)
      setFormData({
        title: task.title,
        description: task.description,
        category: task.category,
        deadline: task.deadline,
        priority: task.priority,
      })
    } catch (error) {
      toast.error("Failed to fetch task")
      navigate("/")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      toast.error("Title is required")
      return
    }

    try {
      setLoading(true)
      if (isEditing) {
        await taskService.updateTask(id, formData)
        toast.success("Task updated successfully")
      } else {
        await taskService.createTask(formData)
        toast.success("Task created successfully")
      }
      navigate("/")
    } catch (error) {
      toast.error(isEditing ? "Failed to update task" : "Failed to create task")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div
      style={{
        minHeight: "calc(100vh - 80px)",
        padding: "32px 0",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      }}
    >
      <div className="container">
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ marginBottom: "32px" }}>
            <button onClick={() => navigate("/")} className="btn btn-secondary" style={{ marginBottom: "16px" }}>
              <ArrowLeft size={16} />
              Back to Dashboard
            </button>

            <h1
              style={{
                fontSize: "32px",
                fontWeight: "700",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "8px",
              }}
            >
              {isEditing ? "Edit Task" : "Create New Task"}
            </h1>
            <p style={{ color: "#6b7280", fontSize: "16px" }}>
              {isEditing ? "Update your task details below" : "Fill in the details to create a new task"}
            </p>
          </div>

          {/* Form */}
          <div className="card" style={{ padding: "32px" }}>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {/* Title */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "600",
                      color: "#374151",
                    }}
                  >
                    Task Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    className="input"
                    placeholder="Enter task title..."
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "600",
                      color: "#374151",
                    }}
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    className="textarea"
                    placeholder="Enter task description..."
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>

                {/* Category and Priority */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontWeight: "600",
                        color: "#374151",
                      }}
                    >
                      Category
                    </label>
                    <select name="category" className="select" value={formData.category} onChange={handleChange}>
                      <option value="work">Work</option>
                      <option value="personal">Personal</option>
                      <option value="learning">Learning</option>
                      <option value="health">Health</option>
                      <option value="finance">Finance</option>
                    </select>
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontWeight: "600",
                        color: "#374151",
                      }}
                    >
                      Priority
                    </label>
                    <select name="priority" className="select" value={formData.priority} onChange={handleChange}>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                {/* Deadline */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "600",
                      color: "#374151",
                    }}
                  >
                    Deadline
                  </label>
                  <input
                    type="datetime-local"
                    name="deadline"
                    className="input"
                    value={formData.deadline}
                    onChange={handleChange}
                  />
                </div>

                {/* Submit Button */}
                <div style={{ display: "flex", gap: "16px", justifyContent: "flex-end" }}>
                  <button type="button" onClick={() => navigate("/")} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    <Save size={16} />
                    {loading ? "Saving..." : isEditing ? "Update Task" : "Create Task"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskForm
