import React from "react";
import Landing from "../components/Landing/Landing";
import Navigation from "../components/NavigationBar/NavBar";
import ScrollSnapContainer from "../components/UI/ScrollSnap/ScrollSnapContainer";

const LandingPage = () => {
  return (
    <div>
      <Navigation />
      <Landing />
    </div>
  );
};

export default LandingPage;
