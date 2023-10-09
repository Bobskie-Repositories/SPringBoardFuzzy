import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check the token & id in local storage 
    const storedToken = localStorage.getItem('token');
    const storedId = localStorage.getItem('id');
    

    if (storedToken) {
      setToken(storedToken);
    }
    if (storedId) {
      setId(storedId);
    }

    setIsLoading(false);
  }, []);

  const getUser = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/active-student', {
        method: 'GET',
        credentials: 'include', // Include cookies
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
  
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };
  

  const login = async (email, password) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login-student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
        }),
      });
      setIsAuthenticated(true);
      return { success: true };

    } catch (error) {
      console.error('An error occurred while logging in:', error.message);
      return response;
    }
  };

  const logout = () => {
    setToken(null);
    setId(null);

    localStorage.removeItem('token');
    localStorage.removeItem('id');
    setIsAuthenticated(false);
  };

  const authValue = {
    token,
    id,
    login,
    logout,
    getUser, // Include getUser in the authValue object
    isAuthenticated,
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};
