import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home          from './pages/Home'
import Login         from './pages/Login'
import Register      from './pages/Register'
import Payment       from './pages/Payment'
import Blog          from './pages/Blog'
import BlogArticle   from './pages/BlogArticle'
import Contact       from './pages/Contact'
import FAQ           from './pages/FAQ'
import Documentation from './pages/Documentation'
import Status        from './pages/Status'
import Nouveautes    from './pages/Nouveautes'
import CGU           from './pages/CGU'
import Confidentialite from './pages/Confidentialite'
import Cookies       from './pages/Cookies'
import MentionsLegales from './pages/MentionsLegales'
import CRMLayout     from './pages/crm/CRMLayout'

function PrivateRoute({ children }) {
  return localStorage.getItem('aura_user') ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Publiques ── */}
        <Route path="/"                 element={<Home />} />
        <Route path="/login"            element={<Login />} />
        <Route path="/register"         element={<Register />} />
        <Route path="/payment"          element={<Payment />} />

        {/* ── Blog ── */}
        <Route path="/blog"             element={<Blog />} />
        <Route path="/blog/:slug"       element={<BlogArticle />} />

        {/* ── Support ── */}
        <Route path="/contact"          element={<Contact />} />
        <Route path="/faq"              element={<FAQ />} />
        <Route path="/documentation"    element={<Documentation />} />
        <Route path="/status"           element={<Status />} />
        <Route path="/nouveautes"       element={<Nouveautes />} />

        {/* ── Légal ── */}
        <Route path="/cgu"              element={<CGU />} />
        <Route path="/confidentialite"  element={<Confidentialite />} />
        <Route path="/cookies"          element={<Cookies />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />

        {/* ── CRM (protégé) ── */}
        <Route path="/crm/*" element={<PrivateRoute><CRMLayout /></PrivateRoute>} />

        {/* ── Fallback ── */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}