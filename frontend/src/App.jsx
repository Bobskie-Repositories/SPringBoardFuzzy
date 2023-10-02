import React from "react";
import { Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddBoard from "./pages/AddBoard";
import MDashboard from "./components/Dashboard/mentor_dashboard/MDashboard";
import CreateBoard from "./components/BoardCreation/BoardCreation";


function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />  
      <Route path="/group/:id" exact element={<Home />} />
      
      {/*group/groupId/project/projectId/add-board/templateID  */}
      <Route path="/group/:groupid/project/:projectid/add-board/:templateid" exact element={<AddBoard />} />
      {/* should be nested */}
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


      <Route path="/teacher/:id" exact element={<Home />} />  
      <Route path="classroom/:id" element={<MDashboard classroom={true} />} />
      {/* --- */}

      {/* <Route path="createboard" element={<CreateBoard/>} /> */}
    </Routes>
  )
}

export default App;
