import React from "react";
import { Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddBoard from "./pages/AddBoard";
import Rules from "./pages/Rules";
import Result from "./pages/Result";
import MDashboard from "./components/Dashboard/mentor_dashboard/MDashboard";
import CreateBoard from "./components/BoardCreation/BoardCreation";
import ViewBoard from "./components/ViewBoard/ViewBoard";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />  

      <Route path="/group/:id" exact element={<Home />} />

      <Route path="/project/:id/create-board/:templateid">
        <Route
          path="rules"
          index={true}
          element={
            <Rules />
          }
        />
        <Route
          path="template"
          index={true}
          element={
            <AddBoard />
          }
        />
        <Route
          path="result"
          index={true}
          element={
            <Result />
          }
        />
      </Route>

      <Route path="/group/:id" >
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
              <CreateBoard/>
            }
          />
        </Route>
        
        
    </Route>
      <Route path="/board/:id" exact element={<ViewBoard />} /> 
      
      <Route path="/teacher/:id" exact element={<Home />} />  
      <Route path="classroom/:id" element={<MDashboard classroom={true} />} />
      {/* --- */}

      {/* <Route path="createboard" element={<CreateBoard/>} /> */}
    </Routes>
  )
}

export default App;
