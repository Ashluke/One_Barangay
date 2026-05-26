import { Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Certificates from "./pages/Certificates"
import Residents from "./pages/Residents"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/certificates" element={<Certificates />} />
      <Route path="/residents" element={<Residents />} />
    </Routes>
  )
}

export default App