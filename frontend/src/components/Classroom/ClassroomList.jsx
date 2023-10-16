import React from "react";
import styles from "./ClassroomList.module.css";
import global from "@assets/global.module.css";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import { NavLink } from "react-router-dom";
import rightImg from "@assets/chevron-right.png";
import classroomImg from "@assets/Classroom.png";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ClassroomList = () => {
  const { id } = useParams();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/classroom/${id}/all`)
      .then((response) => response.json())
      .then((rooms) => setRooms(rooms));
  }, []);

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
                <h4>{classroom.class_name}</h4>
              </div>

              <NavLink to={`/classroom/${classroom.id}`}>
                <Button
                  className={global.brown}
                  style={{ borderRadius: "0 0 10px 10px", width: "100%" }}
                >
                  <img src={rightImg} />
                </Button>
              </NavLink>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default ClassroomList;
