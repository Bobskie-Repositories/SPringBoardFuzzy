import React, { useState, useEffect, useRef } from "react";
import { DateRangePicker, Stack } from "rsuite";
import AdminTable from "./AdminTable";
import PublicTable from "./PublicTable.jsx";
import { FaCaretDown, FaCalendarAlt } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { GrStatusGoodSmall } from "react-icons/gr";
import global from "../../assets/global.module.css";
import config from "../../config";
import axios from "axios";
import styles from "./Table.module.css";
import "rsuite/dist/rsuite-no-reset-rtl.css";

const ListProj = ({ admin }) => {
  const [classroom, setClassroom] = useState([]);
  const [selectedClassrooms, setSelectedClassrooms] = useState([]);
  const dropdownRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [statusVisible, setStatusVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
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
    setStatusVisible(false); // Close status dropdown when a status is selected
  };

  const handleDropdownClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleStatusClick = () => {
    setStatusVisible(!statusVisible);
    setDropdownVisible(false); // Close classroom dropdown when status dropdown is clicked
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
      setStatusVisible(false);
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

  const handleDateRangeChange = (value) => {
    setSelectedDates(value);
  };

  return (
    <div>
      <div className={styles.head}>
        {/* <select
          id="status"
          className={styles.textInput_select}
          onChange={handleStatusChange}
          value={isActive ? "Active Projects" : "Inactive Projects"}
        >
          <option>Active Projects</option>
          <option>Inactive Projects</option>
        </select> */}

        {admin && (
          <div className={styles.top}>
            <div className={styles.dropdown} ref={dropdownRef}>
              <div className={styles.icons}>
                <div className={styles.calendar}>
                  <FaCalendarAlt
                    size={18}
                    style={{ verticalAlign: "middle" }}
                  />
                  &nbsp;&nbsp;&nbsp;
                  <DateRangePicker
                    appearance="subtle"
                    size="sm"
                    onChange={handleDateRangeChange}
                    placeholder="Select Date Range"
                    caretAs={FaCaretDown}
                    character=" – "
                    className={styles.datepick}
                  />
                </div>

                <div className={styles.dropbtn} onClick={handleStatusClick}>
                  <GrStatusGoodSmall
                    size={12}
                    style={{ verticalAlign: "middle" }}
                  />
                  &nbsp;&nbsp;&nbsp;
                  <p className={styles.classroomText}>
                    {isActive ? "Active Projects" : "Inactive Projects"}
                  </p>
                  &nbsp;&nbsp;&nbsp;
                  <FaCaretDown style={{ verticalAlign: "middle" }} />
                </div>

                <div className={styles.dropbtn} onClick={handleDropdownClick}>
                  <SiGoogleclassroom
                    size={20}
                    style={{ verticalAlign: "middle" }}
                  />
                  &nbsp;&nbsp;&nbsp;
                  <p className={styles.classroomText}>All Classrooms</p>
                  &nbsp;&nbsp;&nbsp;
                  <FaCaretDown style={{ verticalAlign: "middle" }} />
                </div>
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

              {statusVisible && (
                <div className={styles.statuscontent}>
                  <ul className={styles.statusList}>
                    <li
                      className={`${global.center} ${styles.customLi}`}
                      onClick={() =>
                        handleStatusChange({
                          target: { value: "Active Projects" },
                        })
                      }
                    >
                      Active Projects
                    </li>
                    <li
                      className={`${global.center} ${styles.customLi}`}
                      onClick={() =>
                        handleStatusChange({
                          target: { value: "Inactive Projects" },
                        })
                      }
                    >
                      Inactive Projects
                    </li>
                  </ul>
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
