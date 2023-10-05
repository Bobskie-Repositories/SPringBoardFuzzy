import React from "react";
import { Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import AddBoard from "./pages/AddBoard";
import MDashboard from "./components/Dashboard/mentor_dashboard/MDashboard";
import CreateBoard from "./components/BoardCreation/BoardCreation";
import Login from './pages/Login'; // Import the Login component

function App() {
  return (
    <div>
      {/* Navigation */}
      
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/group/:id" exact element={<Home />} />
        <Route path="/group/:id/project/:id/add-board" exact element={<AddBoard />} />

        {/* New Login Route */}
        <Route path="/login" element={<Login />} />

        <Route path="/group/:id">
          <Route
            index={true}
            element={
              <Home />
            }
          />
          <Route path="createboard">
            <Route
              index={true}
              element={
                <CreateBoard />
              }
            />
          </Route>
        </Route>

        <Route path="/teacher/:id" exact element={<Home />} />
        <Route path="classroom/:id" element={<MDashboard classroom={true} />} />
      </Routes>
    </div>
  )
}

export default App;
