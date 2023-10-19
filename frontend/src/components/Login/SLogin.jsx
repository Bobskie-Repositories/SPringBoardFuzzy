import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header_landing from "../Header/Header_landing";
import styles from "./SLogin.module.css";

const SLoginComponent = () => {
  // State to manage user inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState(false);

  // Get the navigate function from react-router-dom
  const navigate = useNavigate();

  // login function from AuthContext
  const { loginStudent, getUser } = useAuth();

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loginResult = await loginStudent(username, password);

      if (loginResult.success) {
        try {
          const user = await getUser();
          const groupId = user.group_fk;
          navigate(`/group/${groupId}`);
        } catch (error) {
          setIncorrect(true);
          console.error("Login failed. Please check your credentials." + error);
        }
      } else if (loginResult.status === 403) {
        setIncorrect(true);
        console.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setIncorrect(true);
      console.error("Login failed. Please check your credentials." + error);
    }
  };

  return (
    <div className={styles.body}>
      <Header_landing />
      <div className={styles.rectangle}>
        <h2 className={styles.title}>Student Login</h2>

        <h3 className={styles.header}>
          Welcome back! Please login to your account.
        </h3>

        <div className={styles["center-container"]}>
          <form onSubmit={handleLogin}>
            <div className={styles.input}>
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
            <div className={styles.input}>
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
              <div className={styles.forgot}>
                <a style={{ color: "gray" }} href="/forgot-password">
                  Forgot Password?
                </a>
              </div>
              {incorrect && (
                <p className={styles.warning}>
                  Incorrect username or password. Please try again.
                </p>
              )}
              {/* Login Button */}
              <button type="submit" className={styles.buttonPrimary}>
                Login
              </button>
            </div>
          </form>
        </div>

        {/* Sign Up Link */}
        <p className={styles.signup}>
          Don’t have an account?{" "}
          <a style={{ color: "black" }} href="/signup">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SLoginComponent;
