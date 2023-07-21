import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import AdminOnlyRoute from "./components/admin-only-route"
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
            <AdminOnlyRoute>
              <SelectEditor />
            </AdminOnlyRoute>
          }
        />
        <Route
          path="/editor"
          element={
            <AdminOnlyRoute>
              <Editor />
            </AdminOnlyRoute>
          }
        />
        <Route
          path="/editor/:id"
          element={
            <AdminOnlyRoute>
              <Editor />
            </AdminOnlyRoute>
          }
        />

        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
