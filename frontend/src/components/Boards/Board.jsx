import React from "react";
import styles from "./Board.module.css";
import Card from "../UI/Card/Card";
import IdeaIcon from "@assets/idea.png";
import Button from "../UI/Button/Button";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CircularProgressWithLabel from "../UI/ProgressBar/CircularProgressWithLabel";
import axios from "axios";
import Swal from "sweetalert2";
import { Switch } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Loading from "../UI/Loading/Loading";

function Board({ selected, setBoardCount }) {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [project, setProject] = useState();
  const [staff, setStaff] = useState(false);
  const { getUser } = useAuth();

  const theme = createTheme({
    palette: {
      success: {
        main: "#87EE63",
        light: "#81c784",
        dark: "#388e3c",
        contrastText: "#242105",
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser();
        setStaff(user.is_staff);

        if (selected !== null && selected !== undefined) {
          const boardsResponse = await axios.get(
            `http://127.0.0.1:8000/api/project/${selected}/projectboards`
          );
          const boards = boardsResponse.data;
          setBoards(boards);

          const projectResponse = await axios.get(
            `http://127.0.0.1:8000/api/project/${selected}`
          );
          const project = projectResponse.data;
          setProject(project);

          //checks if there is setBoardCount that was passed
          if (typeof setBoardCount === "function") {
            const boardCount = boards.length;
            setBoardCount(boardCount);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selected, setBoardCount, getUser]);

  const handleToggleClick = async (event) => {
    if (!project.isActive) {
      const result = await Swal.fire({
        title: "Are you sure you want to activate this project?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Activate",
        cancelButtonText: "Cancel!",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        toggleProjectPublic(project);
      }
    } else {
      // The project is already public
      const result = await Swal.fire({
        title: "Are you sure you want to deactivate this project?",
        icon: "warning",
        html: '<span style="font-size: 17px">Before deactivating this project, <br>please enter a reason</span>',
        input: "select",
        inputOptions: {
          option1: "Unclear goal.",
          option2: "Difficult to implement.",
          option3: "Scope is too big.",
          option4: "Incompatible to the team.",
          option5: "High development cost.",
          option6: "Disapproved by adviser.",
          option7: "Takes years to produce.",
          option8: "Very similar to existing products.",
        },
        inputPlaceholder: "Select an option",
        inputAttributes: {
          required: "required",
        },
        showCancelButton: true,
        confirmButtonText: "Deactivate",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          const selectedOptionKey = result.value; // This will contain the key of the selected option
          const inputOptions = {
            option1: "Unclear goal",
            option2: "Difficult to implement.",
            option3: "Very similar to existing products",
            option4: "Incompatible to the team",
            option5: "High development cost",
            option6: "Disapproved by adviser",
            option7: "Takes years to produce",
            option8: "Low target customer",
          };
          const selectedOptionText = inputOptions[selectedOptionKey];
          toggleProjectPublic(project, selectedOptionText);
        }
      });
    }
  };

  const toggleProjectPublic = async (project, selectedOption) => {
    const newisActive = !project.isActive;
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/project/${project.id}/update`,
        {
          name: project.name,
          reason: selectedOption,
          isActive: newisActive,
          group_fk: project.group_fk,
        }
      );
      setProject((prevProject) => ({
        ...prevProject,
        isActive: newisActive,
      }));
    } catch (error) {
      console.error("Error updating isActive:", error);
      Swal.fire("Error", "Failed to publish the template", "error");
    }
  };

  const onClickView = (id) => {
    navigate(`/board/${id}`);
  };

  return (
    <div>
      {project ? (
        <ThemeProvider theme={theme}>
          <div className={styles.alignment}>
            <div className={styles.head}>{project.name} Boards</div>
            {!staff && (
              <div className={styles.publish}>
                {project.isActive ? "Activated" : "Inactive"}
                <Switch
                  onChange={(event) => handleToggleClick(event)}
                  inputProps={{ "aria-label": "controlled" }}
                  checked={project.isActive}
                  color="success"
                />
              </div>
            )}
          </div>
        </ThemeProvider>
      ) : (
        <Loading />
      )}

      <div className={styles.scrollable}>
        {boards.length === 0 && (
          <p className={styles.centeredText}>
            It looks like you haven't created any boards yet. <br /> Click on
            the "Create Board" button to get started and create your first
            board.
          </p>
        )}
        {boards.map((board) => {
          return (
            <div key={board.id}>
              <Card className={styles.card}>
                <div className={styles.container}>
                  <div className={styles.subcontainer}>
                    <img
                      className={styles.ideaicon}
                      src={IdeaIcon}
                      alt="IdeaIcon"
                    />
                  </div>

                  <div>
                    <h3>Board: {board.title}</h3>
                    <>
                      <div className={styles.cards}>
                        <Card className={styles.smallCard}>
                          <h5 className={styles.ratings}>Novelty</h5>
                          <div className={styles.cardContent}>
                            <CircularProgressWithLabel
                              value={board.novelty * 10}
                            />
                          </div>
                        </Card>

                        <Card className={styles.smallCard}>
                          <h5 className={styles.ratings}>Capability</h5>
                          <div className={styles.cardContent}>
                            <CircularProgressWithLabel
                              value={board.capability * 10}
                            />
                          </div>
                        </Card>

                        <Card className={styles.smallCard}>
                          <h5 className={styles.ratingstech}>
                            Technical Feasibility
                          </h5>
                          <div className={styles.cardContent}>
                            <CircularProgressWithLabel
                              value={board.technical_feasibility * 10}
                            />
                          </div>
                        </Card>
                      </div>
                      <Button
                        className={styles.viewbutton}
                        onClick={() => onClickView(board.id)}
                      >
                        View Board
                      </Button>
                    </>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Board;
