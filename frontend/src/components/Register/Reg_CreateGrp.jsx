import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header_GrpCreation from "../Header/Header_GrpCreation";
import styles from "./Register.module.css";
import Swal from "sweetalert2";

const Reg_CreateGrp = () => {
  // State to manage user inputs
  const [grpName, setGrpName] = useState("");
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState("");
  const [createStatus, setCreateStatus] = useState(true);
  const navigate = useNavigate();
  const { getUser } = useAuth();

  useEffect(() => {
    // Fetch the list of classrooms when the component mounts
    const fetchClassrooms = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/classroom/all"
        );
        setClassrooms(response.data);
      } catch (error) {
        console.error("Failed to fetch classrooms. " + error);
      }
    };

    fetchClassrooms();
  }, []);

  const handleCreateGrp = async (e) => {
    e.preventDefault();
    const user = await getUser();

    try {
      const groupResponse = await axios.post(
        "http://127.0.0.1:8000/api/group/create",
        {
          name: grpName,
          classroom_fk: selectedClassroom,
        }
      );
      const updateGroupResponse = await axios.post(
        `http://127.0.0.1:8000/api/update-group-fk/${user.id}`,
        {
          group_key_code: groupResponse.data.key_code,
        }
      );

      Swal.fire({
        title: "Group Created!",
        html:
          "You have successfully created a group. <br>Group Key Code: <b>" +
          groupResponse.data.key_code +
          "</b>",
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#9c7b16",
        confirmButtonText: "Go to Dashboard",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/group/${updateGroupResponse.data.new_group_fk}`);
        }
      });
    } catch (error) {
      console.error("Group Create failed. " + error);
      setCreateStatus(false);
    }
  };

  const goJoinGrp = () => {
    navigate("/student/join-group");
  };

  return (
    <div className={styles.body}>
      <Header_GrpCreation />
      <div className={styles.rectangle}>
        <h2 className={styles.title}>Create Group</h2>

        <div className={styles["center-container"]}>
          <form onSubmit={handleCreateGrp}>
            <div className={styles.input}>
              <label htmlFor="grpName" className={styles.label}>
                Group Name
              </label>
              <input
                type="text"
                id="grpName"
                value={grpName}
                onChange={(e) => setGrpName(e.target.value)}
                className={styles.texttextInput}
                required
              />
            </div>
            {!createStatus && (
              <div className={styles.warning}>Group Name is taken.</div>
            )}
            <div className={styles.input}>
              <label htmlFor="selectClassroom" className={styles.label}>
                Select Classroom:
              </label>
              <select
                id="selectClassroom"
                value={selectedClassroom}
                onChange={(e) => setSelectedClassroom(e.target.value)}
                className={styles.textInput_select}
                required
              >
                <option value="" disabled>
                  Select a Classroom
                </option>
                {classrooms.map((classroom) => (
                  <option key={classroom.id} value={classroom.id}>
                    {classroom.class_name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.buttonPrimary1}>
              <button type="submit" className={styles.buttonPrimary}>
                Create
              </button>
            </div>
          </form>
          <p
            className={`${styles.title_comp} ${styles.link}`}
            style={{ fontSize: "15px" }}
            onClick={goJoinGrp}
          >
            Join Group
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reg_CreateGrp;
