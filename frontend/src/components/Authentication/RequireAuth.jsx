import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Use useEffect to check if the user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      // If the user is not authenticated, redirect to the login page
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Render the children components only if authenticated
  return isAuthenticated ? <>{children}</> : null;
};

export default RequireAuth;
