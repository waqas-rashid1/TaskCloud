"use client"

import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import FilterBar from "../components/FilterBar"
import Sidebar from "../components/SiderBar"
import TaskList from "../components/TaskList"
import { taskService } from "../services/taskService"
import "../index.css" 

const Dashboard = () => {
  const [tasks, setTasks] = useState([])
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, overdue: 0 })
  const [loading, setLoading] = useState(true)

  // Filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [sortBy, setSortBy] = useState("deadline")

  useEffect(() => {
    fetchTasks()
    fetchStats()
  }, [searchTerm, selectedCategory, selectedStatus, sortBy])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const data = await taskService.getTasks({
        search: searchTerm,
        category: selectedCategory,
        status: selectedStatus,
        sortBy: sortBy,
      })
      setTasks(data)
      // const res = await fetch("http://localhost:5000/api/tasks");
      // data = await res.json();
      // data.forEach(schedulePopupReminder);
    } catch (error) {
      toast.error("Failed to fetch tasks")
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const data = await taskService.getStats()
      setStats(data)
    } catch (error) {
      console.error("Failed to fetch stats")
    }
  }

  const handleToggleComplete = async (taskId) => {
    try {
      await taskService.toggleTask(taskId)
      fetchTasks()
      fetchStats()
      toast.success("Task updated successfully")
    } catch (error) {
      toast.error("Failed to update task")
    }
  }

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await taskService.deleteTask(taskId)
        fetchTasks()
        fetchStats()
        toast.success("Task deleted successfully")
      } catch (error) {
        toast.error("Failed to delete task")
      }
    }
  }

  const upcomingTasks = tasks.filter((task) => {
    if (task.completed || !task.deadline) return false
    const deadline = new Date(task.deadline)
    const today = new Date()
    const diffTime = deadline - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays >= 0 && diffDays <= 7
  })

  return (
    <div
      className="spacing-responsive"
      style={{
        minHeight: "calc(100vh - 80px)",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      }}
    >
      <div className="container">
        <div className="responsive-grid">
          {/* Sidebar */}
          <div>
            <Sidebar stats={stats} upcomingTasks={upcomingTasks} />
          </div>

          {/* Main Content */}
          <div>
            <div className="gap-responsive" style={{ marginBottom: "24px", display: "flex", flexDirection: "column" }}>
              <h1
                className="text-responsive-lg"
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: "8px",
                }}
              >
                Task Dashboard
              </h1>
              <p style={{ color: "#6b7280", fontSize: "16px" }}>Manage and organize your tasks efficiently</p>
            </div>

            <FilterBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />

            {loading ? (
              <div style={{ textAlign: "center", padding: "48px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "4px solid #e2e8f0",
                    borderTop: "4px solid #667eea",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                    margin: "0 auto",
                  }}
                />
                <p style={{ marginTop: "16px", color: "#6b7280" }}>Loading tasks...</p>
              </div>
            ) : (
              <TaskList tasks={tasks} onToggleComplete={handleToggleComplete} onDelete={handleDelete} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
