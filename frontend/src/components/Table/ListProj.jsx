import React, { useState } from "react";
import ListActiveProj from "./ListActiveProj";
import ListInActiveProj from "./ListInActiveProj";
import styles from "./Table.module.css";

const ListProj = () => {
  const [isActive, setIsActive] = useState(true);

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
      >
        <option>Active Projects</option>
        <option>Inactive Projects</option>
      </select>
      {isActive ? <ListActiveProj public={true} /> : <ListInActiveProj />}
    </div>
  );
};

export default ListProj;
