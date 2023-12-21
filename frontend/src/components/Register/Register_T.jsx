import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header_landing from "../Header/Header_landing";
import styles from "./Register.module.css";

const Register_T = () => {
  // State to manage user inputs
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [emailValid, setEmailValid] = useState(true);

  const navigate = useNavigate();

  // login function from AuthContext
  const { registerTeacher, getUser } = useAuth();

  // Function to handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPass) {
      setPasswordsMatch(false);
      return; // Do not proceed with registration if passwords don't match
    }

    try {
      const registerResult = await registerTeacher(
        firstname,
        lastname,
        email,
        password
      );

      const user = await getUser();
      if (registerResult.success) {
        Swal.fire({
          title: "Account Created!",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#9c7b16",
          confirmButtonText: "Go to Dashboard",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/teacher/${user.id}`);
          }
        });
      } else {
        setEmailValid(false);
      }
    } catch (error) {
      console.error("Registration failed. " + error);
    }
  };

  return (
    <div className={styles.body}>
      <Header_landing />
      <div className={styles.rectangle}>
        <h2 className={styles.title}>Teacher Register</h2>

        <div className={styles["center-container"]}>
          <form onSubmit={handleRegister}>
            <div className={styles.input}>
              <label htmlFor="firstname" className={styles.label}>
                Firstname
              </label>
              <input
                type="text"
                id="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className={styles.texttextInput}
                required
              />
            </div>
            <div className={styles.input}>
              <label htmlFor="lastname" className={styles.label}>
                Lastname
              </label>
              <input
                type="text"
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className={styles.texttextInput}
                required
              />
            </div>
            <div className={styles.input}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.texttextInput}
                required
              />
            </div>
            {!emailValid && (
              <div className={styles.warning}>Email is already taken.</div>
            )}
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
            <div className={styles.input}>
              {/* Password Input */}
              <label htmlFor="confirmpassword" className={styles.label}>
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmpassword"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className={styles.texttextInput}
                required
              />
            </div>
            {!passwordsMatch && (
              <div className={styles.warning}>
                Password and Confirm Password do not match.
              </div>
            )}
            <div className={styles.buttonPrimary1}>
              <button type="submit" className={styles.buttonPrimary}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register_T;
