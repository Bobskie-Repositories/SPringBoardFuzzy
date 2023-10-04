import React from "react";
import { Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddBoard from "./pages/AddBoard";
import Rules from "./pages/Rules";
import Result from "./pages/Result";
import MDashboard from "./components/Dashboard/mentor_dashboard/MDashboard";
import CreateBoard from "./components/BoardCreation/BoardCreation";
import ViewBoard from "./pages/ViewBoard";
import EditBoard from "./pages/EditBoard";
import Edit_Result from "./pages/Edit_Result";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />  

      <Route path="/group/:id" exact element={<Home />} />

      <Route path="/project/:id/create-board">
        <Route
          path=":templateid/rules"
          index={true}
          element={
            <Rules />
          }
        />
        <Route
          path=":templateid/template"
          index={true}
          element={
            <AddBoard />
          }
        />
        <Route
          path=":boardid/result"
          index={true}
          element={
            <Result />
          }
        />
      </Route>

      <Route path="/board/:id" exact element={<ViewBoard />} /> 

      <Route path="/board/:id">
        <Route
          index={true}
          element={
            <ViewBoard />
          }
        />
        <Route
          path="edit"
          index={true}
          element={
            <EditBoard />
          }
        />
        <Route
          path="edit/result"
          index={true}
          element={
            <Edit_Result />
          }
        />
      </Route>


      
      <Route path="/teacher/:id" exact element={<Home />} />  
      <Route path="classroom/:id" element={<MDashboard classroom={true} />} />
      {/* --- */}

      {/* <Route path="createboard" element={<CreateBoard/>} /> */}
    </Routes>
  )
}

export default App;
