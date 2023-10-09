import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SLogin.module.css';
import NavigationBar from '../Navigation Bar/NavBar';

const SLoginComponent = () => {
  // State to manage user inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Get the navigate function from react-router-dom
  const navigate = useNavigate();

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your backend API to authenticate the user
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Successful login, you can now navigate to the "Home" page
        navigate('/');
      } else {
        // Handle authentication failure, display an error message, etc.
        console.error('Login failed');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.body}>
      <NavigationBar />
      <div className={styles.rectangle}>
        {/* Page Title */}
        <h2 className={styles.title}>Login</h2>

        {/* Header Text */}
        <h3 className={styles.header}>
          Welcome back! Please login to your account.
        </h3>

        <div className={styles['center-container']}>
          <form onSubmit={handleLogin}>
            <div>
              {/* Username Input */}
              <label htmlFor="username" className={styles.label}>
                Email
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.texttextInput}
                required
              />
            </div>
            <div>
              {/* Password Input */}
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.texttextInput}
                required
              />
            </div>
            <div className={styles.buttonPrimary1}>
              {/* Forgot Password Link */}
              <p className={styles.forgot} style={{ color: 'gray' }}>
                <a href="/forgot-password">Forgot Password?</a>
              </p>

              {/* Login Button */}
              <button type="submit" className={styles.buttonPrimary}>
                Login
              </button>
            </div>
          </form>
        </div>

        {/* Sign Up Link */}
        <p className={styles.signup}>
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default SLoginComponent;
