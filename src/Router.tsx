import { BrowserRouter, Route, Routes } from "react-router-dom"

import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./views/Dashboard"
import DesignEditor from "./views/DesignEditor"
import Home from "./views/Home/Home"
import Login from "./views/Login"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
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
              <DesignEditor />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
