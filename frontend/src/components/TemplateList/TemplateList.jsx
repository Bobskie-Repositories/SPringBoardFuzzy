import React from "react";
import { useState } from "react";
import styles from "./TemplateList.module.css";
import Card from "../UI/Card/Card";
import { Switch } from "@mui/material";

const TemplateList = () => {
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_card}>
        <div className={styles.scrollable}>
          <Card className={styles.container_board}>
            <div className={styles.words}>
              <h3>Idea Venture</h3>
              <p>
                Create and refine innovative ideas that can be turned into
                successful products, services, or businesses
              </p>
            </div>

            <div className={styles.date}>
              <p>Date Created: 10/15/2023</p>
              <div className={styles.publish}>
                <p>Publish</p>
                <Switch
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TemplateList;
