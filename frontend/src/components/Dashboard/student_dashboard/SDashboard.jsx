import React from "react";
import { useState, useEffect } from "react";
import S_Sidebar from "../../Sidebar/S_Sidebar";
import Search from "../../Search/Search";
import Boards from "../../Boards/Board";
import Profile from "../../ProfileSegment/Profile";
import BoardCreation from "../../BoardCreation/BoardCreation";
import ListInActiveProj from "../../Table/ListInActiveProj";
import SearchProject from "../../Search/SearchProject";
import Button from "../../UI/Button/Button";
import styles from "./SDashboard.module.css";
import ModalCustom from "../../UI/Modal/Modal";
import { useLocation } from "react-router";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const SDashboard = ({ choose }) => {
  const location = useLocation();
  const [selected, setSelected] = useState(location.state?.selectedProjectId);
  const [createAction, setCreateAction] = useState(false);
  const [boardCount, setBoardCount] = useState(0);
  const [boardTemplateIds, setBoardTemplateIds] = useState([]);
  const [projectUpdateKey, setProjectUpdateKey] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState("");
  const { getUser } = useAuth();

  const handleProjectUpdate = () => {
    // This function will be called when there are updates to projects in the Boards component
    // It increments the projectUpdateKey to force a re-render of S_Sidebar
    setProjectUpdateKey(projectUpdateKey + 1);
  };

  const handleCreateBoardClick = () => {
    setCreateAction(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const transferModalClick = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/classroom/all"
      );
      setClassrooms(response.data);
    } catch (error) {
      console.error("Failed to fetch classrooms. " + error);
    }
    setIsModalOpen(true);
  };

  const handleTransferClick = async () => {
    try {
      const user = await getUser();
      // Perform the update logic here, using Axios for the API call
      const grpResponse = await axios.get(
        `http://127.0.0.1:8000/api/group/${user.group_fk}`
      );

      const response = await axios.put(
        `http://127.0.0.1:8000/api/group/${user.group_fk}/update`,
        {
          name: grpResponse.data.name,
          key_code: grpResponse.data.key_code,
          classroom_fk: selectedClassroom,
          created_at: grpResponse.data.created_at,
          deleted_at: null,
        }
      );
      if (response.status === 200) {
        console.log("Group updated successfully:", response.data);
        setIsModalOpen(false);
        Swal.fire({
          icon: "success",
          title: "Group's classroom updated",
          confirmButtonColor: "#9c7b16",
        });
      } else {
        console.error("Failed to update group");
      }
    } catch (error) {
      console.error("Error updating group:", error);
      // Handle the error, show a message, or perform other actions as needed
    }
  };

  return (
    <div
      className={styles.container}
      style={{ padding: "20px 150px 0px 30px" }}
    >
      <S_Sidebar
        projectUpdateKey={projectUpdateKey}
        selected={selected}
        setSelected={setSelected}
        setCreateAction={setCreateAction}
      />

      <div>
        <div
          className={styles.container}
          style={{ gap: "150px", marginTop: "30px" }}
        >
          <Search alternateAPI={0} />
          <Profile identification={1} />
        </div>

        {choose === 0 ? (
          <div className={styles.container}>
            {createAction ? (
              <BoardCreation
                selected={selected}
                setCreateAction={setCreateAction}
                boardTemplateIds={boardTemplateIds}
              />
            ) : (
              <Boards
                selected={selected}
                setBoardCount={setBoardCount}
                onProjectUpdate={handleProjectUpdate}
                setBoardTemplateIds={setBoardTemplateIds}
              />
            )}

            <div>
              <Button
                className={styles.butName}
                style={{ display: "block" }}
                onClick={handleCreateBoardClick}
                disabled={selected === undefined || selected === null}
              >
                Create Board
              </Button>
              <Button
                className={styles.butName}
                style={{ marginTop: "10px" }}
                onClick={transferModalClick}
                disabled={selected === undefined || selected === null}
              >
                Transfer Class
              </Button>
            </div>

            {isModalOpen && (
              <ModalCustom isOpen={isModalOpen} onClose={handleCloseModal}>
                <div style={{ textAlign: "center" }}>
                  <h2>Which class do you wish to transfer?</h2>
                  <div className={styles.input}>
                    <label htmlFor="selectClassroom" className={styles.label}>
                      Select Classroom:
                    </label>
                    <select
                      id="selectClassroom"
                      value={selectedClassroom}
                      onChange={(e) => setSelectedClassroom(e.target.value)}
                      className={styles.textInput_select}
                      style={{ overflowY: "auto" }}
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
                  <Button
                    className={styles.butName}
                    style={{ marginTop: "10px" }}
                    onClick={handleTransferClick}
                    disabled={selected === undefined || selected === null}
                  >
                    Transfer
                  </Button>
                </div>
              </ModalCustom>
            )}
          </div>
        ) : choose == 1 ? (
          <ListInActiveProj />
        ) : (
          <div className={styles.container}>
            <SearchProject />
          </div>
        )}
      </div>
    </div>
  );
};

export default SDashboard;
