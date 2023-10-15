import React from "react";
import { Routes, Route} from 'react-router-dom';
import Login from './pages/Login'; 
import RequireAuth from "./components/Authentication/RequireAuth";
import M_Dashboard from "./pages/M_Dashboard";
import S_Dashboard from "./pages/S_Dashboard";
import AddBoard from "./pages/AddBoard";
import Rules from "./pages/Rules";
import Result from "./pages/Result";
import ViewBoard from "./pages/ViewBoard";
import EditBoard from "./pages/EditBoard";
import Edit_Result from "./pages/Edit_Result";
import MyTemplate from "./pages/MyTemplate";

function App() {
  return (
      <Routes>
        <Route path="/" exact element={<Login choose={0}/>} />
        <Route path="/login" element={<Login choose={0}/>} />
        <Route path="/login-student" element={<Login choose={1}/>} />
        <Route path="/login-teacher" element={<Login choose={2}/>} />

        <Route path="/group/:groupid">
          <Route 
            index={true} 
            element={
              <RequireAuth>
                <S_Dashboard />
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

        <Route path="/teacher/:id" >
          <Route
            index={true} 
            exact 
            element={
              <RequireAuth>
                <M_Dashboard choose={0}/>
              </RequireAuth>} 
          />
          <Route 
            path="template"
            index={true} 
            exact 
            element={
              <RequireAuth>
                <M_Dashboard choose={3}/>
              </RequireAuth>} 
          />
        </Route>

        <Route path="/classroom/:id" >
          <Route
            index={true}
            exact  
            element={
              <RequireAuth>
                <M_Dashboard choose={1}/>
              </RequireAuth>} 
          />

          <Route
            path="group/:groupid"
            index={true}
            exact  
            element={
              <RequireAuth>
                <M_Dashboard choose={2}/>
              </RequireAuth>} 
          />
        </Route>

      </Routes>
  )
}

export default App;
