import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage.jsx';
import Signup from './pages/SignupPage.jsx';
import { ProtectedRoute } from './components/ProtectedRoute';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard.jsx';
import Tasks from './pages/TasksPage.jsx';
import { useEffect } from 'react';
import { useAuthStore } from './store/authStore.js';
const App = ()=> {
  const {checkAuth} = useAuthStore(); 
  useEffect(()=>{
    checkAuth(); 
  },[checkAuth])
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={
            <Layout>
                <HomePage />
            </Layout>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Layout>
                <Tasks />
              </Layout>
            </ProtectedRoute>
          }
        />

      </Routes>
      <Toaster/>
    </>
  );
}

export default App;
