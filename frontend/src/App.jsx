import React from "react";
import { Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MDashboard from "./components/Dashboard/mentor_dashboard/MDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />  
      <Route path="/teacher/:id" exact element={<Home />} />  
      <Route path="classroom/:id" element={<MDashboard classroom={true} />} />
    </Routes>
  )
}

export default App;
