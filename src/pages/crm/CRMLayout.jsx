import { useState } from 'react'
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, Calendar, Brain, BarChart3,
  Bell, Settings, LogOut, ChevronLeft, ChevronRight, Sparkles
} from 'lucide-react'
import CRMDashboard    from './CRMDashboard'
import CRMClients      from './CRMClients'
import CRMAIGenerator  from './CRMAIGenerator'
import CRMSettings     from './CRMSettings'
import CRMInsights     from './CRMInsights'

const NAV = [
  { path:'/crm',           label:'Dashboard',    icon:LayoutDashboard },
  { path:'/crm/clients',   label:'Clients',      icon:Users },
  { path:'/crm/calendar',  label:'Publications', icon:Calendar },
  { path:'/crm/ai',        label:'IA Générative',icon:Brain },
  { path:'/crm/analytics', label:'Analytics',    icon:BarChart3 },
  { path:'/crm/insights',  label:'Insights IA',  icon:Sparkles },
]

const NET_C = { IG:'#E97729', LI:'#0A66C2', FB:'#1877F2', TK:'#111' }

function CalendarPage() {
  const posts = {1:['IG','LI'],3:['FB'],5:['IG'],8:['LI','IG'],10:['TK'],12:['IG'],14:['FB','LI'],15:['IG'],17:['IG'],19:['LI'],21:['IG','FB'],22:['TK'],25:['IG'],27:['LI'],29:['FB','TK']}
  return (
    <div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24}}>
        <div>
          <h2 style={{fontSize:22,fontWeight:800,color:'#111827'}}>Calendrier éditorial</h2>
          <p style={{fontSize:14,color:'#9CA3AF',marginTop:4}}>Juin 2026 — Programmez vos publications</p>
        </div>
        <button className="crm-btn"><Brain size={16}/> Générer avec IA</button>
      </div>
      <div className="crm-card">
        <div className="cal-header">
          {['LUN','MAR','MER','JEU','VEN','SAM','DIM'].map(d => (
            <div key={d} className="cal-day-name">{d}</div>
          ))}
        </div>
        <div className="cal-grid">
          {Array.from({length:30},(_,i)=>i+1).map(d => (
            <div key={d} className="cal-cell">
              <div className="cal-cell-num">{d}</div>
              {(posts[d]||[]).map(n => (
                <div key={n} className="cal-net-pill" style={{background:NET_C[n]}}>{n}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AnalyticsPage() {
  const networks = [
    { name:'Instagram', color:'#E97729', followers:'12.4K', reach:'45.2K', engagement:'4.8%', posts:32, bars:[{l:'Reach',v:78},{l:'Engagement',v:85},{l:'Followers',v:62}] },
    { name:'LinkedIn',  color:'#0A66C2', followers:'3.2K',  reach:'18.7K', engagement:'3.2%', posts:15, bars:[{l:'Reach',v:45},{l:'Engagement',v:55},{l:'Followers',v:38}] },
    { name:'Facebook',  color:'#1877F2', followers:'8.1K',  reach:'22.3K', engagement:'2.1%', posts:20, bars:[{l:'Reach',v:52},{l:'Engagement',v:35},{l:'Followers',v:60}] },
    { name:'TikTok',    color:'#111',    followers:'5.6K',  reach:'89.1K', engagement:'7.3%', posts:12, bars:[{l:'Reach',v:95},{l:'Engagement',v:92},{l:'Followers',v:48}] },
  ]
  return (
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{fontSize:22,fontWeight:800,color:'#111827'}}>Analytics</h2>
        <p style={{fontSize:14,color:'#9CA3AF',marginTop:4}}>Vue globale de vos performances</p>
      </div>
      <div className="crm-kpi-grid" style={{marginBottom:24}}>
        {[['2.4M','Impressions totales','+8%'],['29.3K','Abonnés totaux','+3.2%'],['175K','Reach moyen','+5.1%'],['79','Posts publiés','ce mois']].map(([v,l,d]) => (
          <div key={l} className="crm-kpi-card">
            <div className="crm-kpi-value">{v}</div>
            <div style={{fontSize:13,color:'#6B7280',margin:'4px 0'}}>{l}</div>
            <div style={{fontSize:12,fontWeight:600,color:'#059669'}}>{d}</div>
          </div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        {networks.map(n => (
          <div key={n.name} className="analytics-net-card">
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
              <div style={{width:12,height:12,borderRadius:'50%',background:n.color}}/>
              <span style={{fontSize:15,fontWeight:700,color:'#111827'}}>{n.name}</span>
              <span style={{marginLeft:'auto',fontSize:12,color:'#9CA3AF'}}>{n.posts} posts</span>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:16}}>
              {[['Abonnés',n.followers],['Reach',n.reach],['Engagement',n.engagement]].map(([k,v]) => (
                <div key={k}>
                  <div style={{fontSize:11,color:'#9CA3AF',marginBottom:3}}>{k}</div>
                  <div style={{fontSize:16,fontWeight:700,color:'#111827'}}>{v}</div>
                </div>
              ))}
            </div>
            <div className="analytics-bar-wrap">
              {n.bars.map(b => (
                <div key={b.l} className="analytics-bar-row">
                  <div className="analytics-bar-label">{b.l}</div>
                  <div className="analytics-bar-bg">
                    <div className="analytics-bar-fill" style={{width:`${b.v}%`,background:n.color}}/>
                  </div>
                  <div className="analytics-bar-val">{b.v}%</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CRMLayout() {
  const nav = useNavigate()
  const loc = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const user = JSON.parse(localStorage.getItem('aura_user') || '{}')

  const logout = () => {
    localStorage.removeItem('aura_user')
    nav('/login')
  }

  const allPaths = [
    ...NAV,
    { path:'/crm/settings', label:'Paramètres', icon:Settings },
  ]
  const currentPage = allPaths.find(n =>
    n.path === loc.pathname || (n.path !== '/crm' && loc.pathname.startsWith(n.path))
  )

  const isActive = (path) =>
    loc.pathname === path || (path !== '/crm' && loc.pathname.startsWith(path))

  return (
    <div className="crm-wrap">

      {/* ── SIDEBAR ── */}
      <aside className={`crm-sidebar ${collapsed ? 'closed' : 'open'}`}>
        <div className="crm-sidebar-top">
          {!collapsed && <span className="crm-sidebar-logo">AURA<span className="crm-sidebar-logo-sub">CRM</span></span>}
          {collapsed  && <Brain size={22} style={{color:'#4A6CF7'}}/>}
        </div>
        <button className="crm-collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight size={13}/> : <ChevronLeft size={13}/>}
        </button>

        {/* Main nav */}
        <nav className="crm-nav">
          {NAV.map(({ path, label, icon:Icon }) => (
            <button key={path} onClick={() => nav(path)}
              className={`crm-nav-item ${isActive(path) ? 'active' : ''}`}>
              <Icon size={18} style={{flexShrink:0}}/>
              {!collapsed && <span>{label}</span>}
              {!collapsed && path === '/crm/insights' && (
                <span style={{marginLeft:'auto',fontSize:9,fontWeight:700,padding:'2px 6px',background:'linear-gradient(135deg,#4A6CF7,#8B5CF6)',color:'white',borderRadius:99}}>NEW</span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom nav */}
        <div className="crm-nav-bottom">
          <button onClick={() => nav('/crm/settings')}
            className={`crm-nav-item ${isActive('/crm/settings') ? 'active' : ''}`}
            style={{width:'100%'}}>
            <Settings size={17} style={{flexShrink:0}}/>
            {!collapsed && <span>Paramètres</span>}
          </button>
          <button onClick={logout}
            className="crm-nav-item crm-nav-item-danger"
            style={{width:'100%'}}>
            <LogOut size={17} style={{flexShrink:0}}/>
            {!collapsed && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="crm-main">
        <header className="crm-topbar">
          <span className="crm-topbar-title">{currentPage?.label || 'Dashboard'}</span>
          <div className="crm-topbar-right">
            <button className="crm-bell-btn" onClick={() => nav('/crm/settings?tab=notifications')}>
              <Bell size={18}/>
              <span className="crm-notif-dot"/>
            </button>
            <div style={{display:'flex',alignItems:'center',gap:10,cursor:'pointer'}}
              onClick={() => nav('/crm/settings')}>
              <div className="crm-avatar">{(user.name||'U')[0].toUpperCase()}</div>
              <div>
                <div className="crm-user-name">{user.name || 'Mohamed Ali'}</div>
                <div className="crm-user-email">{user.email || 'admin@aurasocials.com'}</div>
              </div>
            </div>
          </div>
        </header>

        <main className="crm-content">
          <Routes>
            <Route index                element={<CRMDashboard/>}/>
            <Route path="clients"       element={<CRMClients/>}/>
            <Route path="ai"            element={<CRMAIGenerator/>}/>
            <Route path="calendar"      element={<CalendarPage/>}/>
            <Route path="analytics"     element={<AnalyticsPage/>}/>
            <Route path="insights"      element={<CRMInsights/>}/>
            <Route path="settings"      element={<CRMSettings/>}/>
            <Route path="*"             element={<Navigate to="/crm"/>}/>
          </Routes>
        </main>
      </div>
    </div>
  )
}