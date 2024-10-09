import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import SubAdminDashboard from './components/SubAdminDashboard';
import EventManagement from './components/EventManagement';
import AttendanceReport from './components/AttendanceReport';
import UserProfile from './components/UserProfile';
import NotFound from './components/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/subadmin" element={<SubAdminDashboard />} />
            <Route path="/events" element={<EventManagement />} />
            <Route path="/report" element={<AttendanceReport />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;