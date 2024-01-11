import React, { useState, useEffect } from "react";
import ListActiveProj from "./ListActiveProj";
import ListInActiveProj from "./ListInActiveProj";
import styles from "./Table.module.css";
//admin parameter is to check if it is an admin

const ListProj = ({ admin }) => {
  const [isActive, setIsActive] = useState(
    localStorage.getItem("selectedStatus") === "Active Projects" ||
      localStorage.getItem("selectedStatus") === null
  );

  useEffect(() => {
    // Save the selected status to localStorage whenever it changes
    localStorage.setItem(
      "selectedStatus",
      isActive ? "Active Projects" : "Inactive Projects"
    );
  }, [isActive]);

  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    setIsActive(selectedStatus === "Active Projects");
  };

  return (
    <div>
      <select
        id="status"
        className={styles.textInput_select}
        onChange={handleStatusChange}
        value={isActive ? "Active Projects" : "Inactive Projects"}
      >
        <option>Active Projects</option>
        <option>Inactive Projects</option>
      </select>
      {isActive ? (
        <ListActiveProj admin={admin} public={true} />
      ) : (
        <ListInActiveProj admin={admin} />
      )}
    </div>
  );
};

export default ListProj;
