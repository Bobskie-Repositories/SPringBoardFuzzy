import React from "react";
import { Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />  
    </Routes>
  )
}

export default App;
