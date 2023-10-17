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
import axios from "axios";

const ViewBoard = () => {
  const [activeTab, setActiveTab] = useState("results");
  const [contents, setContents] = useState(null);
  const [groupId, setGroupId] = useState(null);
  const [staff, setStaff] = useState(false);
  const { getUser } = useAuth();
  const { id } = useParams();
  const groupIdRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser();
        setStaff(user.is_staff);

        const response = await axios.get(
          `http://127.0.0.1:8000/api/projectboards/${id}`
        );
        const projectResponse = await axios.get(
          `http://127.0.0.1:8000/api/project/${response.data.project_fk}`
        );
        const projectData = projectResponse.data;

        // Set both contents and groupId together
        setContents(response.data);
        setGroupId(projectData.group_fk);
        groupIdRef.current = projectData.group_fk;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const onClickDelete = async () => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/projectboards/${id}/delete`
      );

      if (response.status === 204) {
        console.log("ProjectBoard deleted successfully");
      } else {
        console.error(
          "Failed to delete ProjectBoard:",
          response.status,
          response.data
        );
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
      title:
        '<span style="font-size: 20px">Are you sure you want to delete?</span>',
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
          title:
            '<span style="font-size: 20px">Board Sucessfully Deleted</span>',
          icon: "success",
          confirmButtonColor: "#9c7b16",
          confirmButtonText: "OK",
        }).then((result) => {
          onClickGoToDashboard();
        });
      }
    });
  };

  if (!contents) {
    return <p>Loading...</p>;
  }

  return (
    <div className={global.body}>
      <Header />

      <div className={global.body}>
        <div style={{ width: "70rem" }}>
          <h2>{contents.title}</h2>
          <div className={styles.tabsContainer}>
            <div
              className={`${styles.tab} ${
                activeTab === "results" ? styles.active : ""
              }`}
              onClick={() => handleTabClick("results")}
            >
              Result
            </div>
            <div
              className={`${styles.tab} ${
                activeTab === "details" ? styles.active : ""
              }`}
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
                  <ResultBoard boardid={id} />
                </div>
              </>
            )}
            {activeTab === "details" && (
              <>
                <div className={styles.tabHeader}>
                  <p>{contents.title}</p>
                </div>
                <div>{parse(contents.content)}</div>
              </>
            )}
          </div>
        </div>

        {!staff && (
          <div className={styles.btmButton}>
            <Button className={styles.button} onClick={() => navigate("edit")}>
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
