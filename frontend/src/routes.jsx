import React from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Dashboard from './pages/dashboard/dashboard/index';
import JobsDashboard from './pages/dashboard/jobs';
import ProjectsDashboard from './pages/dashboard/projects';
import PaymentsDashboard from './pages/dashboard/payments';
import ProfileDashboard from './pages/dashboard/profile';
import ReviewsDashboard from './pages/dashboard/reviews';
import SettingsDashboard from './pages/dashboard/settings';
import MessagesDashboard from './pages/dashboard/messages';
import WalletDashboard from './pages/dashboard/wallet';
import { useSelector } from 'react-redux';

// Job pages
import JobListings from './pages/job/job-1';
import JobSingle from './pages/job/job-single';
import JobApply from './pages/job/job-apply';

// Service pages
import Services from './pages/service/services';
import ServiceSingle from './pages/service/service-single';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Legacy route redirect component
const LegacyRedirect = ({ path }) => {
  const params = useParams();
  return <Navigate to={path.replace(':id', params.id)} replace />;
};

const AppRoutes = () => {
  const params = useParams();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Job routes */}
      <Route path="/jobs" element={<JobListings />} />
      <Route path="/jobs/:id" element={<JobSingle />} />
      <Route 
        path="/jobs/:id/apply" 
        element={
          <ProtectedRoute>
            <JobApply />
          </ProtectedRoute>
        } 
      />
      
      {/* Service routes */}
      <Route path="/services" element={<Services />} />
      <Route path="/services/:id" element={<ServiceSingle />} />
      
      {/* Legacy route redirects for jobs */}
      <Route path="/job-1" element={<Navigate to="/jobs" replace />} />
      <Route path="/job-single/:id" element={<LegacyRedirect path="/jobs/:id" />} />
      <Route path="/job-apply/:id" element={<LegacyRedirect path="/jobs/:id/apply" />} />

      {/* Legacy route redirects for services */}
      <Route path="/service-1" element={<Navigate to="/services" replace />} />
      <Route path="/service-single/:id" element={<LegacyRedirect path="/services/:id" />} />
      <Route path="/service-single-v2/:id" element={<LegacyRedirect path="/services/:id" />} />
      <Route path="/service-single-v3/:id" element={<LegacyRedirect path="/services/:id" />} />

      {/* Dashboard routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
              <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/jobs" 
        element={
          <ProtectedRoute>
              <JobsDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/projects" 
        element={
          <ProtectedRoute>
              <ProjectsDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/messages" 
        element={
          <ProtectedRoute>
              <MessagesDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/wallet" 
        element={
          <ProtectedRoute>
              <WalletDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/payments" 
        element={
          <ProtectedRoute>
              <PaymentsDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/reviews" 
        element={
          <ProtectedRoute>
              <ReviewsDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/profile" 
        element={
          <ProtectedRoute>
              <ProfileDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/settings" 
        element={
          <ProtectedRoute>
              <SettingsDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Default Route - redirect to login or services */}
      <Route path="/" element={<Navigate to="/services" replace />} />
      
      {/* 404 Route */}
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;