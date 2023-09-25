import React from "react";
import { Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MDashboard from "./components/Dashboard/mentor_dashboard/MDashboard";
import CreateBoard from "./components/BoardCreation/BoardCreation";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />  
      <Route path="/group/:id" exact element={<Home />} />
      {/* should be nested */}
      <Route path="/teacher/:id" exact element={<Home />} />  
      <Route path="classroom/:id" element={<MDashboard classroom={true} />} />
      {/* --- */}

      <Route path="createboard" element={<CreateBoard/>} />
    </Routes>
  )
}

export default App;
