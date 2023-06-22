import { BrowserRouter, Routes, Route } from "react-router-dom"
import DesignEditor from "~/views/DesignEditor"
import Dashboard from "~/views/Dashboard"
import Login from "~/views/Login"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/manage" element={<Dashboard />} />
        <Route path="/" element={<DesignEditor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
