"use client"

import React, { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import Header from "../components/Header";
import { Calendar } from "lucide-react";
import axios from "axios";
import { taskService } from "../services/taskService"
import { toast } from "react-hot-toast"


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
        toast.error("Failed to fetch stats")
        }
    }

    
}

export default Dashboard
