import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./Loading.module.css";

const Loading = () => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 4000); // 1 second

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.loading}>{showLoading && <CircularProgress />}</div>
  );
};

export default Loading;
