import React, { useState, useEffect, useRef } from "react";
import AdminTable from "./AdminTable";
import PublicTable from "./PublicTable.jsx";
import { FaCaretDown } from "react-icons/fa";
import config from "../../config";
import axios from "axios";
import styles from "./Table.module.css";

const ListProj = ({ admin }) => {
  const [classroom, setClassroom] = useState([]);
  const [selectedClassrooms, setSelectedClassrooms] = useState([]);
  const dropdownRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isActive, setIsActive] = useState(
    localStorage.getItem("selectedStatus") === "Active Projects" ||
      localStorage.getItem("selectedStatus") === null
  );

  const { API_HOST } = config;

  useEffect(() => {
    const fetchData = async () => {
      const allClassroom = await axios.get(`${API_HOST}/api/classroom/all`);
      setClassroom(allClassroom.data);
    };
    fetchData();
    localStorage.setItem(
      "selectedStatus",
      isActive ? "Active Projects" : "Inactive Projects"
    );

    const currentPath = window.location.pathname;
    sessionStorage.setItem("dashboard", currentPath);
  }, [isActive]);

  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    setIsActive(selectedStatus === "Active Projects");
  };

  const handleDropdownClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (clsrm) => {
    // Toggle selection
    setSelectedClassrooms((prevSelected) => {
      if (prevSelected.includes(clsrm.id)) {
        return prevSelected.filter((selectedId) => selectedId !== clsrm.id);
      } else {
        return [...prevSelected, clsrm.id];
      }
    });
  };

  return (
    <div>
      <div className={styles.head}>
        <select
          id="status"
          className={styles.textInput_select}
          onChange={handleStatusChange}
          value={isActive ? "Active Projects" : "Inactive Projects"}
        >
          <option>Active Projects</option>
          <option>Inactive Projects</option>
        </select>

        {admin && (
          <div className={styles.top}>
            <div className={styles.dropdown} ref={dropdownRef}>
              <div className={styles.dropbtn} onClick={handleDropdownClick}>
                <span>Filter</span>
                &nbsp;&nbsp;&nbsp;
                <FaCaretDown />
              </div>
              {dropdownVisible && (
                <div className={styles.dropdowncontent}>
                  {classroom.map((clsrm) => (
                    <div key={clsrm.id} className={styles.classroomItem}>
                      <input
                        type="checkbox"
                        id={`classroom-${clsrm.id}`}
                        checked={selectedClassrooms.includes(clsrm.id)}
                        onChange={() => handleCheckboxChange(clsrm)}
                        className={styles.box}
                      />
                      <label htmlFor={`classroom-${clsrm.id}`}>
                        {clsrm.class_name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {admin ? (
        <AdminTable isActive={isActive} filter={selectedClassrooms} />
      ) : (
        <PublicTable filter={selectedClassrooms} />
      )}
    </div>
  );
};

export default ListProj;
