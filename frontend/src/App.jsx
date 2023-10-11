import React from "react";
import { Routes, Route} from 'react-router-dom';
import AddBoard from "./pages/AddBoard";
import Rules from "./pages/Rules";
import Result from "./pages/Result";
import M_Dashboard from "./pages/M_Dashboard";
import S_Dashboard from "./pages/S_Dashboard";
import ViewBoard from "./pages/ViewBoard";
import EditBoard from "./pages/EditBoard";
import Edit_Result from "./pages/Edit_Result";
import Login from './pages/Login'; 
import RequireAuth from "./components/Authentication/RequireAuth";

function App() {
  return (
      <Routes>
        {/* <Route path="/" exact element={<RequireAuth><Home /></RequireAuth>} /> */}
        <Route path="/login" element={<Login choose={0}/>} />
        <Route path="/login-student" element={<Login choose={1}/>} />
        <Route path="/login-teacher" element={<Login choose={2}/>} />

        <Route path="/group/:id">
          <Route 
            index={true} 
            element={
              <RequireAuth>
                <S_Dashboard />
              </RequireAuth>
            } 
          />
          <Route 
            path="/group/:id/project/:id/add-board" 
            element={
              <RequireAuth>
                <AddBoard />
              </RequireAuth>
            } 
          />
        </Route>

        <Route path="/project/:id/create-board">
          <Route 
            path=":templateid/rules" 
            index={true} 
            element={
            <RequireAuth>
              <Rules />
            </RequireAuth>} 
          />
          <Route 
            path=":templateid/template" 
            index={true} 
            element={
              <RequireAuth>
                <AddBoard />
              </RequireAuth>} 
          />
          <Route 
            path=":boardid/result" 
            index={true} 
            element={
              <RequireAuth>
                <Result />
              </RequireAuth>} 
          />
        </Route>

        <Route path="/board/:id">
          <Route 
            index={true} 
            element={
              <RequireAuth>
                <ViewBoard />
              </RequireAuth>} 
          />
          <Route 
            path="edit" 
            index={true} 
            element={
              <RequireAuth>
                <EditBoard />
              </RequireAuth>} 
          />
          <Route 
            path="edit/result" 
            index={true} 
            element={
              <RequireAuth>
                <Edit_Result />
              </RequireAuth>} 
          />
        </Route>

        <Route 
          path="/teacher/:id" 
          index={true} 
          exact 
          element={
            <RequireAuth>
              <M_Dashboard classroom={false}/>
            </RequireAuth>} 
        />
        <Route 
          path="/classroom/:id" 
          index={true}
          exact  
          element={
            <RequireAuth>
              <M_Dashboard classroom={true}/>
            </RequireAuth>} 
        />
      </Routes>
  )
}

export default App;
