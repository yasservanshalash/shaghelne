import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

// AuthGuard component to protect routes that require authentication
const AuthGuard = ({ children, requiredRoles = [] }) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  // If not authenticated, redirect to login with return URL
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If specific roles are required, check if user has one of them
  if (requiredRoles.length > 0 && user?.role) {
    const hasRequiredRole = requiredRoles.includes(user.role);
    
    // If user doesn't have required role, redirect to dashboard
    if (!hasRequiredRole) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // If authenticated and has required role (or no specific role is required), render children
  return children;
};

export default AuthGuard; 