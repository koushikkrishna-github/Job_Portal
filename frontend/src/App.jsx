import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import FindJobs from './pages/FindJobs';
import CareerPortal from './pages/CareerPortal';
import JobDetailsPage from './pages/JobDetailsPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import { isAuthenticated } from './api';
import { useState, useEffect } from 'react';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(isAuthenticated());

  if (!auth) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Website Routes (Wrapped in Main Layout) */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/find-jobs" element={<Layout><FindJobs /></Layout>} />
        <Route path="/jobs/:jobId" element={<Layout><JobDetailsPage /></Layout>} />
        <Route path="/careers" element={<Layout><CareerPortal /></Layout>} />

        {/* Admin Routes (Standalone Layout) */}
        <Route path="/admin/login" element={<AdminLogin onLoginSuccess={() => window.location.href = '/admin/dashboard'} />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;