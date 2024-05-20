import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import styles from "./ViewBoard.module.css";
import global from "@assets/global.module.css";
import Header from "../Header/Header";
import ResultBoard from "../ResultBoard/ResultBoard";
import Button from "../UI/Button/Button";
import parse from "html-react-parser";
import Swal from "sweetalert2";
import { IoArrowBackSharp } from "react-icons/io5";
import axios from "axios";
import config from "../../config";

const ViewBoard = () => {
  const [activeTab, setActiveTab] = useState("results");
  const [attempt, setAttempt] = useState(0);
  const [boards, setBoards] = useState(null);
  const [groupId, setGroupId] = useState(null);
  const [isGrpMem, setIsGrpMem] = useState(true);
  const [staff, setStaff] = useState(false);
  const { getUser } = useAuth();
  const { id } = useParams();
  const groupIdRef = useRef();
  const navigate = useNavigate();
  const { API_HOST } = config;

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser();
        setStaff(user.is_staff);

        const response = await axios.get(`${API_HOST}/api/projectboards/${id}/versions`);
        const projectResponse = await axios.get(
          `${API_HOST}/api/project/${response.data[0].project_fk}`
        );
        const projectData = projectResponse.data;
        setBoards(response.data);
        setGroupId(projectData.group_fk);
        groupIdRef.current = projectData.group_fk;
        if (!user.is_staff && projectData.group_fk != user.group_fk) {
          setIsGrpMem(false);
        }
        setAttempt(calcAttemp(response.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const calcAttemp = (versions) => {
    // Exclude the last item in the versions array. last item is the first version
    const versionsWithoutLast = versions.slice(0, -1);

    // Get today's date and set its time to 11:59 PM
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    // Set the end time today's date at 11:59 PM
    const endDate = new Date(today);
    endDate.setHours(23, 59, 59, 999);

    // Set the start time before today's date at 11:59 PM
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const startDate = yesterday;

    const filteredBoards = versionsWithoutLast.filter((board) => {
      const boardCreatedAt = new Date(board.created_at);
      return boardCreatedAt >= startDate && boardCreatedAt <= endDate;
    });
    return filteredBoards.length;
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const goToPreviousProjectBoard = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const goToNextProjectBoard = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleImproveRes = () => {
    // if (attempt >= 3) {
    //   Swal.fire(
    //     'Warning',
    //     'You have reached the maximum limit of 3 reassessments for today. Please try again tomorrow.',
    //     'warning'
    //   );
    // } else {
    //   navigate('edit');
    // }
    navigate("edit");
  };

  const onClickDelete = async () => {
    try {
      const response = await axios.delete(`${API_HOST}/api/projectboards/${id}/delete`);

      if (response.status === 204) {
        console.log("ProjectBoard deleted successfully");
      } else {
        console.error("Failed to delete ProjectBoard:", response.status, response.data);
      }
    } catch (error) {
      console.error("Error deleting ProjectBoard:", error);
    }
  };

  const onClickGoToDashboard = () => {
    navigate(`/group/${groupIdRef.current}`);
  };

  const showDeleteBoardModal = () => {
    Swal.fire({
      icon: "warning",
      title: '<span style="font-size: 20px">Are you sure you want to delete?</span>',
      html: '<span style="font-size: 15px">This will delete this board permanently. You cannot undo this action.</span>',
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#8A252C",
      cancelButtonText: "Cancel",
      cancelButtonColor: "rgb(181, 178, 178)",
    }).then((result) => {
      if (result && result.isConfirmed) {
        // Check if result exists before accessing properties
        onClickDelete();
        Swal.fire({
          title: '<span style="font-size: 20px">Board Sucessfully Deleted</span>',
          icon: "success",
          confirmButtonColor: "#9c7b16",
          confirmButtonText: "OK",
        }).then((result) => {
          onClickGoToDashboard();
        });
      }
    });
  };

  const handleBack = () => {
    const storedPath = sessionStorage.getItem("currentPath");
    navigate(storedPath);
  };

  if (!boards) {
    return <p></p>;
  }

  const currentProjectBoard = boards[currentIndex];

  return (
    <div className={global.body}>
      <Header />

      <div className={global.body}>
        <div style={{ width: "70rem" }}>
          <h2>
            <span className={styles.back} onClick={handleBack}>
              <IoArrowBackSharp />
            </span>
            {currentProjectBoard.title}
          </h2>
          <div className={styles.navigationButtons}>
            <span
              onClick={goToNextProjectBoard}
              className={currentIndex === boards.length - 1 ? styles.disabled : styles.enable}
            >
              &lt;&lt;
            </span>
            <span>&nbsp; Version {boards.length - currentIndex} &nbsp; </span>
            <span
              onClick={goToPreviousProjectBoard}
              className={currentIndex === 0 ? styles.disabled : styles.enable}
            >
              &gt;&gt;
            </span>
          </div>

          <div className={styles.tabsContainer}>
            <div
              className={`${styles.tab} ${activeTab === "results" ? styles.active : ""}`}
              onClick={() => handleTabClick("results")}
            >
              Result
            </div>
            <div
              className={`${styles.tab} ${activeTab === "details" ? styles.active : ""}`}
              onClick={() => handleTabClick("details")}
            >
              Details
            </div>
          </div>

          <div className={styles.tabContent}>
            {activeTab === "results" && (
              <>
                <div className={styles.tabHeader}>
                  <p>Result</p>
                </div>
                <div>
                  <ResultBoard boardid={currentProjectBoard.id} />
                </div>
              </>
            )}
            {activeTab === "details" && (
              <>
                <div className={styles.tabHeader}>
                  <p>{currentProjectBoard.title}</p>
                </div>
                <div>{parse(currentProjectBoard.content)}</div>
              </>
            )}
          </div>
        </div>

        {!staff && isGrpMem && (
          <div className={styles.btmButton}>
            {/* <p style={{ color: "red" }}>Reassesments available today: {3 - attempt} / 3</p> */}

            <Button className={styles.button} onClick={handleImproveRes}>
              Improve Result
            </Button>

            <Button
              className={styles.button}
              style={{ backgroundColor: "#8A252C" }}
              onClick={showDeleteBoardModal}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBoard;
