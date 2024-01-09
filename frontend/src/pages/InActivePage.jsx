import React from "react";
import { useAuth } from "../context/AuthContext";
import A_Dashboard from "./A_Dashboard";
import S_Dashboard from "./S_Dashboard";
import M_Dashboard from "./M_Dashboard";

const InActivePage = () => {
  const { role } = useAuth();

  return (
    <div>
      {role === "teacher" && <M_Dashboard choose={3} />}
      {role === "student" && <S_Dashboard choose={1} />}
      {role === "admin" && <A_Dashboard choose={1} />}
      {role !== "teacher" && role !== "student" && role !== "admin" && (
        <div>Unknown Role Content</div>
      )}
    </div>
  );
};

export default InActivePage;
