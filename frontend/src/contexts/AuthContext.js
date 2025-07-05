"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { authService } from "../services/authService"
import { toast } from "react-hot-toast"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token")
      if (token) {
        const userData = await authService.getCurrentUser()
        setUser(userData)
        setIsAuthenticated(true)
      }
    } catch (error) {
      localStorage.removeItem("token")
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      setLoading(true)
      const response = await authService.login(email, password)
      localStorage.setItem("token", response.token)
      setUser(response.user)
      setIsAuthenticated(true)
      toast.success("Login successful!")
      return { success: true }
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed")
      return { success: false, error: error.response?.data?.error || "Login failed" }
    } finally {
      setLoading(false)
    }
  }

  const register = async (name, email, password) => {
    try {
      setLoading(true)
      const response = await authService.register(name, email, password)
      localStorage.setItem("token", response.token)
      setUser(response.user)
      setIsAuthenticated(true)
      toast.success("Registration successful!")
      return { success: true }
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed")
      return { success: false, error: error.response?.data?.error || "Registration failed" }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    setIsAuthenticated(false)
    toast.success("Logged out successfully")
  }

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
