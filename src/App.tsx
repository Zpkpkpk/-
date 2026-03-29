import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Discover } from './pages/Discover';
import { Clubs } from './pages/Clubs';
import { Applications } from './pages/Applications';
import { Analytics } from './pages/Analytics';
import { Manager } from './pages/Manager';
import { AdminResources } from './pages/AdminResources';
import { Login } from './pages/Login';

const AuthGuard: React.FC<{ children: React.ReactNode, allowedRoles?: string[] }> = ({ children, allowedRoles }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userRole = localStorage.getItem('userRole') || 'student';

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect to the appropriate home page for the role
    if (userRole === 'manager') return <Navigate to="/manager" replace />;
    if (userRole === 'admin') return <Navigate to="/analytics" replace />;
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const RootRedirect: React.FC = () => {
  const userRole = localStorage.getItem('userRole') || 'student';
  if (userRole === 'manager') return <Navigate to="/manager" replace />;
  if (userRole === 'admin') return <Navigate to="/analytics" replace />;
  return <Discover />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/" 
          element={
            <AuthGuard>
              <Layout />
            </AuthGuard>
          }
        >
          <Route index element={<RootRedirect />} />
          <Route 
            path="clubs" 
            element={
              <AuthGuard allowedRoles={['student']}>
                <Clubs />
              </AuthGuard>
            } 
          />
          <Route 
            path="applications" 
            element={
              <AuthGuard allowedRoles={['student']}>
                <Applications />
              </AuthGuard>
            } 
          />
          <Route 
            path="analytics" 
            element={
              <AuthGuard allowedRoles={['manager', 'admin']}>
                <Analytics />
              </AuthGuard>
            } 
          />
          <Route 
            path="manager" 
            element={
              <AuthGuard allowedRoles={['manager']}>
                <Manager />
              </AuthGuard>
            } 
          />
          <Route 
            path="admin/resources" 
            element={
              <AuthGuard allowedRoles={['admin']}>
                <AdminResources />
              </AuthGuard>
            } 
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
