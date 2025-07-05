import axios from "axios"

const API_BASE_URL = "http://localhost:5000/api"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handles token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export const authService = {
  // Register new user
  register: async (name, email, password) => {
    const response = await api.post("/auth/register", { name, email, password })
    return response.data
  },

  // Login user
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password })
    return response.data
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get("/auth/me")
    return response.data
  },

  // Logout (client-side only)
  logout: () => {
    localStorage.removeItem("token")
  },
}
