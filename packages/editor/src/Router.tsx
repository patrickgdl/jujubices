import { BrowserRouter, Route, Routes } from "react-router-dom"

import ProtectedRoute from "./components/ProtectedRoute"
import Editor from "./views/Editor"
import Dashboard from "./views/Dashboard"
import Home from "./views/Home"
import Login from "./views/Login"
import { Builder, Templates } from "./views/Template"
import SelectEditor from "./views/SelectEditor/SelectEditor"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/template" element={<Templates />} />
        <Route
          path="/selector"
          element={
            <ProtectedRoute>
              <SelectEditor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/template/:id"
          element={
            <ProtectedRoute>
              <Builder />
            </ProtectedRoute>
          }
        />
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
              <Editor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editor/:id"
          element={
            <ProtectedRoute>
              <Editor />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
