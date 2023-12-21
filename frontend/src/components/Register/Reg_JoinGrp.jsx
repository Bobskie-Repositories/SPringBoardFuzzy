import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header_GrpCreation from "../Header/Header_GrpCreation";
import styles from "./Register.module.css";
import config from "../../config";

const Reg_JoinGrp = () => {
  // State to manage user inputs
  const [grpCode, setGrpCode] = useState("");
  const [grpCodeMatch, setGrpCodeMatch] = useState(true);
  const { API_HOST } = config;
  const navigate = useNavigate();
  const { getUser } = useAuth();
  // Function to handle form submission
  const handleJoinGrp = async (e) => {
    e.preventDefault();
    const user = await getUser();
    try {
      const response = await axios.post(
        `${API_HOST}/api/update-group-fk/${user.id}`,
        {
          group_key_code: grpCode,
        }
      );
      navigate(`/group/${response.data.new_group_fk}`);
    } catch (error) {
      console.error("Group Join failed. " + error);
    }
  };

  const goCreateGrp = () => {
    navigate("/student/create-group");
  };
  return (
    <div className={styles.body}>
      <Header_GrpCreation />
      <div className={styles.rectangle}>
        <h2 className={styles.title}>Join Group</h2>

        <div className={styles["center-container"]}>
          <form onSubmit={handleJoinGrp}>
            <div className={styles.input}>
              <label htmlFor="grpCode" className={styles.label}>
                Group Code
              </label>
              <input
                type="text"
                id="grpCode"
                value={grpCode}
                onChange={(e) => setGrpCode(e.target.value)}
                className={styles.texttextInput}
                required
              />
            </div>
            {!grpCodeMatch && (
              <div className={styles.warning}>Group Code does not match.</div>
            )}
            <div className={styles.buttonPrimary1}>
              <button type="submit" className={styles.buttonPrimary}>
                Submit
              </button>
            </div>
          </form>
          <p
            className={`${styles.title_comp} ${styles.link}`}
            style={{ fontSize: "15px" }}
            onClick={goCreateGrp}
          >
            Create Group
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reg_JoinGrp;
