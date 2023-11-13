import React from "react";
import SDashboard from "../components/Dashboard/student_dashboard/SDashboard";
const S_Dashboard = ({ choose }) => {
  return (
    <div>
      <SDashboard choose={choose} />
    </div>
  );
};

export default S_Dashboard;
