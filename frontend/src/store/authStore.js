import { create } from "zustand";
import { axiosInstance } from "../lib/axios";


export const useAuthStore = create((set)=>({
  authUser: null,
  isLoggingIn: false,
  isSigningUp: false,
  isLoggingOut: false, 
  error: null,
  isAuthChecking: true,

  checkAuth: async()=>{
    try {
      const res = await axiosInstance.get('/auth/check');
      set({authUser: res.data});
    } catch (error) {
      console.log('Error in authCheck:', error);
      set({authUser: null});
    }
    finally{
      set({isAuthChecking: false})
    }
  },

  signup: async(name, email,password)=>{
    try {
      set({isSigningUp: true}); 
      const res = await axiosInstance.post('/auth/signup', {name,email,password}); 
      set({authUser: res.data});
      return {success: true}; 
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Signup failed';
      console.log('Error in Signup:', errorMessage); 
      set({error: errorMessage});
      return {success: false};
    } finally {
      set({isSigningUp: false}); 
    }
  }, 

  login: async(email,password)=>{
    try {
      set({isLoggingIn: true}); 
      const res = await axiosInstance.post('/auth/login', {email,password}); 
      set({authUser: res.data});
      return {success: true}; 
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      console.log('Error in Login:', errorMessage); 
      set({error: errorMessage});
      return {success: false};
    } finally {
      set({isLoggingIn: false}); 
    }
  }, 

  logout: async()=>{
    try {
      set({isLoggingOut: true}); 
      await axiosInstance.post('/auth/logout'); 
      set({authUser: null});
      return {success: true}; 
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Logout failed';
      console.log('Error in Logout:', errorMessage); 
      set({error: errorMessage});
      return {success: false};
    } finally {
      set({isLoggingOut: false}); 
    }
  }

  

}))