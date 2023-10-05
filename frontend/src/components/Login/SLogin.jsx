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

    // TODO: Implement your authentication logic here (e.g., send a request to a backend API)

    // For demonstration purposes, we'll just log the entered values
    console.log('Username:', username);
    console.log('Password:', password);

    // After successful login, navigate to the "Home" page
    navigate('/');
  };

  return (
    <div className={styles.body}>
      <NavigationBar/>
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
