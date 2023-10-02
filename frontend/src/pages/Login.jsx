import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  // State to manage user inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Get the navigate function from react-router-dom
  const navigate = useNavigate();

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Implement your authentication logic here, e.g., send a request to a backend API

    // For demonstration purposes, we'll just log the entered values
    console.log('Username:', username);
    console.log('Password:', password);

    // After successful login, navigate to the "Home" page
    navigate('/');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
