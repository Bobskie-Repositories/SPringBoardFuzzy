import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddBoard from "./pages/AddBoard";
import Rules from "./pages/Rules";
import Result from "./pages/Result";
import MDashboard from "./components/Dashboard/mentor_dashboard/MDashboard";
import ViewBoard from "./pages/ViewBoard";
import EditBoard from "./pages/EditBoard";
import Edit_Result from "./pages/Edit_Result";
import Login from './pages/Login';
import RequireAuth from "./components/Authentication/RequireAuth";

function App() {
  return (
    <div>
      {/* Navigation */}
      <Routes>
        {/* <Route path="/" exact element={<RequireAuth><Home /></RequireAuth>} /> */}
        <Route path="/login" element={<Login />} />

        <Route path="/group/:id">
          <Route
            index={true}
            element={
              <RequireAuth>
                <Home />
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
              </RequireAuth>
            }
          />
          <Route
            path=":templateid/template"
            index={true}
            element={
              <RequireAuth>
                <AddBoard />
              </RequireAuth>
            }
          />
          <Route
            path=":boardid/result"
            index={true}
            element={
              <RequireAuth>
                <Result />
              </RequireAuth>
            }
          />
        </Route>

        <Route path="/board/:id">
          <Route
            index={true}
            element={
              <RequireAuth>
                <ViewBoard />
              </RequireAuth>
            }
          />
          <Route
            path="edit"
            index={true}
            element={
              <RequireAuth>
                <EditBoard />
              </RequireAuth>
            }
          />
          <Route
            path="edit/result"
            index={true}
            element={
              <RequireAuth>
                <Edit_Result />
              </RequireAuth>
            }
          />
        </Route>

        <Route
          path="/teacher/:id"
          exact
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="classroom/:id"
          element={
            <RequireAuth>
              <MDashboard classroom={true} />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
