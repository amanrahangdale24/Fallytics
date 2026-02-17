import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

export const useTaskStore = create((set) => ({
  tasks: [],
  isLoading: false,
  error: null,
  analytics: null,

  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const result = await axiosInstance.get("/task");
      set({ tasks: result.data });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      set({ error: "Failed to fetch tasks" });
    } finally {
      set({ isLoading: false });
    }
  },

  addTask: async (taskData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.post('/task', taskData);
      set((state) => ({
        tasks: [res.data.task, ...state.tasks],
      }));
      toast.success("Task added successfully");
      return { success: true };
    } catch (error) {
      console.error("Error adding task:", error);
      const errorMessage = error.response?.data?.message || "Failed to add task";
      set({ error: errorMessage });
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      set({ isLoading: false });
    }
  },

  updateTaskStatus: async (taskId, status, reason = "") => {
    try {
      await axiosInstance.patch(`/task/${taskId}`, { status, reason });
      
      set((state) => ({
        tasks: state.tasks.map((task) => 
          task._id === taskId ? { ...task, status, reason: status === 'missed' ? reason : task.reason } : task
        ),
      }));
      
      if (status === 'done') toast.success("Task completed!");
      else if (status === 'missed') toast.success("Task marked as missed");
      
      return { success: true };
    } catch (error) {
      console.error("Error updating task:", error);
      const errorMessage = error.response?.data?.message || "Failed to update task";
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } 
  },

  fetchAnalytics: async () => {
    set({ isLoading: true, error: null });
    try {
      const result = await axiosInstance.get(`/task/analysis?range=7days`);
      set({ analytics: result.data }); 
    } catch (error) {
      console.error("Error fetching analytics:", error);
      set({ error: "Failed to fetch analytics" });
    } finally {
      set({ isLoading: false });
    }
  },

}));
