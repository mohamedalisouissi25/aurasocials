import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'

// Pages toujours présentes
import Home     from './pages/Home'
import Login    from './pages/Login'
import Register from './pages/Register'
import Payment  from './pages/Payment'
import CRMLayout from './pages/crm/CRMLayout'

// Pages lazy (ne crashent pas si le fichier manque)
const Blog           = lazy(() => import('./pages/Blog'))
const BlogArticle    = lazy(() => import('./pages/BlogArticle'))
const Contact        = lazy(() => import('./pages/Contact'))
const FAQ            = lazy(() => import('./pages/FAQ'))
const Documentation  = lazy(() => import('./pages/Documentation'))
const Status         = lazy(() => import('./pages/Status'))
const Nouveautes     = lazy(() => import('./pages/Nouveautes'))
const CGU            = lazy(() => import('./pages/CGU'))
const Confidentialite= lazy(() => import('./pages/Confidentialite'))
const Cookies        = lazy(() => import('./pages/Cookies'))
const MentionsLegales= lazy(() => import('./pages/MentionsLegales'))

function PrivateRoute({ children }) {
  return localStorage.getItem('aura_user') ? children : <Navigate to="/login" />
}

function Loading() {
  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#F8FAFF', flexDirection:'column', gap:16 }}>
      <div style={{ width:44, height:44, border:'3px solid #EEF1FB', borderTopColor:'#4A6CF7', borderRadius:'50%', animation:'spin 1s linear infinite' }}/>
      <div style={{ fontSize:14, color:'#9CA3AF' }}>Chargement...</div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* ── Publiques ── */}
          <Route path="/"                element={<Home />} />
          <Route path="/login"           element={<Login />} />
          <Route path="/register"        element={<Register />} />
          <Route path="/payment"         element={<Payment />} />

          {/* ── Blog ── */}
          <Route path="/blog"            element={<Blog />} />
          <Route path="/blog/:slug"      element={<BlogArticle />} />

          {/* ── Support ── */}
          <Route path="/contact"         element={<Contact />} />
          <Route path="/faq"             element={<FAQ />} />
          <Route path="/documentation"   element={<Documentation />} />
          <Route path="/status"          element={<Status />} />
          <Route path="/nouveautes"      element={<Nouveautes />} />

          {/* ── Légal ── */}
          <Route path="/cgu"             element={<CGU />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="/cookies"         element={<Cookies />} />
          <Route path="/mentions-legales"element={<MentionsLegales />} />

          {/* ── CRM ── */}
          <Route path="/crm/*" element={<PrivateRoute><CRMLayout /></PrivateRoute>} />

          {/* ── 404 ── */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

function NotFound() {
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16, background:'#F8FAFF' }}>
      <div style={{ fontSize:72 }}>🔍</div>
      <h1 style={{ fontSize:28, fontWeight:800, color:'#111827' }}>Page introuvable</h1>
      <p style={{ fontSize:15, color:'#6B7280' }}>Cette page n'existe pas ou a été déplacée.</p>
      <a href="/" style={{ background:'#4A6CF7', color:'white', padding:'12px 28px', borderRadius:12, textDecoration:'none', fontWeight:700, fontSize:14 }}>
        Retour à l'accueil
      </a>
    </div>
  )
}