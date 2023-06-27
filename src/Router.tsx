import { BrowserRouter, Route, Routes } from "react-router-dom"

import ProtectedRoute from "./components/ProtectedRoute"
import AdminEditor from "./views/editor/AdminEditor"
import Dashboard from "./views/Dashboard"
import Home from "./views/Home"
import Login from "./views/Login"
import UserEditor from "./views/editor/UserEditor"
import Templates from "./views/Templates"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/templates" element={<Templates />} />
        <Route
          path="/manage"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editor"
          element={
            <ProtectedRoute>
              <AdminEditor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editor/:id"
          element={
            <ProtectedRoute>
              <UserEditor />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
