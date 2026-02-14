import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import Login from './pages/loginPage';
import Signup from './pages/signupPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import Layout from './components/Layout';
import Dashboard from './pages/dashBoard';
import Tasks from './pages/tasks';
import { useEffect } from 'react';
import { useAuthStore } from './store/authStore.js';
const App = ()=> {
  const {checkAuth} = useAuthStore(); 
  useEffect(()=>{
    checkAuth(); 
  },[checkAuth])
  return (
    <>
      <Routes>
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

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <Toaster/>
    </>
  );
}

export default App;
