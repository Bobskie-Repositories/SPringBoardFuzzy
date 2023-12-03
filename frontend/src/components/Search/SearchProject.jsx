import React from "react";
import Boards from "../Boards/Board";
import { useParams } from "react-router";

const SearchProject = () => {
  const { id } = useParams();

  return <Boards selected={id} />;
};

export default SearchProject;
