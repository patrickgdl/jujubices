import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import ProtectedRoute from "./components/protected-route"
import Dashboard from "./views/dashboard"
import Editor from "./views/editor"
import Home from "./views/home"
import Login from "./views/login"
import NotFound from "./views/not-found"
import SelectEditor from "./views/select-editor/select-editor"
import { Builder, Templates } from "./views/template"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/template" element={<Templates />} />
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
          path="/selector"
          element={
            <ProtectedRoute>
              <SelectEditor />
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

        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
