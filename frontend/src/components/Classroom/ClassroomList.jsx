import React from "react";
import styles from "./ClassroomList.module.css";
import global from "@assets/global.module.css";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import { NavLink } from "react-router-dom";
import rightImg from "@assets/chevron-right.png";
import classroomImg from "@assets/Classroom.png";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import config from "../../config";

const ClassroomList = () => {
  const { id } = useParams();
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const { API_HOST } = config;
  useEffect(() => {
    fetch(`${API_HOST}/api/classroom/${id}/all`)
      .then((response) => response.json())
      .then((rooms) => setRooms(rooms));
  }, []);

  const goClass = (classId) => {
    navigate(`/classroom/${classId}`);
  };

  return (
    <div>
      {rooms.map((classroom) => {
        return (
          <div
            key={classroom.id}
            style={{ display: "inline-block", margin: "20px 30px" }}
          >
            <Card className={styles.classroom} style={{ padding: 0 }}>
              <div style={{ padding: "1rem" }}>
                <img src={classroomImg} />
                <h5>{classroom.class_name}</h5>
              </div>

              <Button
                onClick={() => goClass(classroom.id)}
                className={global.brown}
                style={{ borderRadius: "0 0 10px 10px", width: "100%" }}
              >
                <img src={rightImg} />
              </Button>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default ClassroomList;
