import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../features/auth/Login';
import Signup from '../features/auth/Signup';
import Dashboard from '../features/dashboard/Dashboard';
import ProtectedRoute from '../components/ProtectedRoute';
import CustomerDashboard from '../features/dashboard/CustomerDashboard';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer-home"
          element={
            <ProtectedRoute role="customer">
              <CustomerDashboard/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};



export default AppRouter;
