import axios from "axios"

const API_BASE_URL = "http://localhost:5000/api"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const taskService = {
  // Get all tasks with optional filters
  getTasks: async (params = {}) => {
    const response = await api.get("/tasks", { params })
    return response.data
  },

  // Get single task
  getTask: async (id) => {
    const response = await api.get(`/tasks/${id}`)
    return response.data
  },

  // Create new task
  createTask: async (taskData) => {
    const response = await api.post("/tasks", taskData)
    return response.data
  },

  // Update task
  updateTask: async (id, taskData) => {
    const response = await api.put(`/tasks/${id}`, taskData)
    return response.data
  },

  // Delete task
  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`)
    return response.data
  },

  // Toggle task completion
  toggleTask: async (id) => {
    const response = await api.patch(`/tasks/${id}/toggle`)
    return response.data
  },

  // Get task statistics
  getStats: async () => {
    const response = await api.get("/stats")
    return response.data
  },
}
