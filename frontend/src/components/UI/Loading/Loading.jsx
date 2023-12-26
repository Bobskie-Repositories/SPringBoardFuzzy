import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./Loading.module.css";

const Loading = (props) => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.loading} style={props.style}>
      {showLoading && <CircularProgress />}
    </div>
  );
};

export default Loading;
