import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Payment from './pages/Payment'
import CRMLayout from './pages/crm/CRMLayout'

function PrivateRoute({ children }) {
  return localStorage.getItem('aura_user') ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"        element={<Home />} />
        <Route path="/login"   element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/crm/*"   element={<PrivateRoute><CRMLayout /></PrivateRoute>} />
        <Route path="*"        element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}