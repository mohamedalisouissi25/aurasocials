import { useState, useRef, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, Calendar, Brain, BarChart3,
  Settings, LogOut, ChevronLeft, ChevronRight, Sparkles,
  Bell, X, CheckCheck, AlertTriangle, TrendingUp, Info,
  ArrowLeft, ExternalLink
} from 'lucide-react'
import CRMDashboard   from './CRMDashboard'
import CRMClients     from './CRMClients'
import CRMAIGenerator from './CRMAIGenerator'
import CRMSettings    from './CRMSettings'
import CRMInsights    from './CRMInsights'

const NAV = [
  { path:'/crm',           label:'Dashboard',    icon:LayoutDashboard },
  { path:'/crm/clients',   label:'Clients',      icon:Users },
  { path:'/crm/calendar',  label:'Publications', icon:Calendar },
  { path:'/crm/ai',        label:'IA Générative',icon:Brain },
  { path:'/crm/analytics', label:'Analytics',    icon:BarChart3 },
  { path:'/crm/insights',  label:'Insights IA',  icon:Sparkles },
]

const NET_C = { IG:'#E97729', LI:'#0A66C2', FB:'#1877F2', TK:'#111' }

const INIT_NOTIFICATIONS = [
  {
    id:1, type:'alert', IconComp:AlertTriangle, color:'#EF4444', bg:'#FEE2E2',
    title:'Commentaires négatifs en hausse',
    desc:'Nike France Instagram — +34% de sentiment négatif détecté',
    detail:'Une hausse significative de 34% des commentaires négatifs a été détectée sur le compte Instagram de Nike France. Les principaux sujets : délais de livraison (+18%), qualité produit (+9%), service client (+7%). Nous recommandons de répondre en priorité aux 12 commentaires critiques identifiés par le Crisis Radar.',
    action:'Voir dans Insights IA', actionPath:'/crm/insights',
    time:'Il y a 12 min', read:false,
  },
  {
    id:2, type:'success', IconComp:TrendingUp, color:'#059669', bg:'#D1FAE5',
    title:'Performance en hausse',
    desc:'Café Lumière Instagram — Engagement +28% cette semaine',
    detail:'Le compte Instagram de Café Lumière enregistre une semaine exceptionnelle : +28% d\'engagement, +342 nouveaux abonnés. Le post "Terrasse été 2026" a atteint 12 400 personnes organiquement — meilleur résultat depuis le lancement du compte.',
    action:'Voir les analytics', actionPath:'/crm/analytics',
    time:'Il y a 1h', read:false,
  },
  {
    id:3, type:'info', IconComp:Brain, color:'#4A6CF7', bg:'#EEF1FB',
    title:'Rapport IA prêt',
    desc:'Plan éditorial juillet 2026 généré pour Voyage & Liberté',
    detail:'Le plan éditorial complet pour juillet 2026 a été généré pour Voyage & Liberté. Il comprend 28 publications réparties sur Instagram (12), TikTok (8), Facebook (8), avec les horaires optimaux, les hashtags recommandés et les formats suggérés pour chaque post.',
    action:'Voir le générateur IA', actionPath:'/crm/ai',
    time:'Il y a 2h', read:false,
  },
  {
    id:4, type:'info', IconComp:Users, color:'#4A6CF7', bg:'#EEF1FB',
    title:'Nouveau client ajouté',
    desc:'TechStart SAS a été ajouté à votre portfolio',
    detail:'TechStart SAS (secteur Tech & SaaS) a été ajouté à votre portefeuille. Réseaux assignés : LinkedIn. Premier post à programmer selon votre calendrier éditorial.',
    action:'Voir les clients', actionPath:'/crm/clients',
    time:'Hier 18:34', read:true,
  },
  {
    id:5, type:'success', IconComp:CheckCheck, color:'#059669', bg:'#D1FAE5',
    title:'Publication publiée avec succès',
    desc:'Post Instagram Nike France publié à 18h00',
    detail:'La publication Instagram programmée pour Nike France a été publiée avec succès à 18h00. Résultats après 30 minutes : 234 likes, 18 commentaires, 56 partages. Taux d\'engagement initial : 4.2% — au-dessus de la moyenne du compte (3.8%).',
    action:'Voir le calendrier', actionPath:'/crm/calendar',
    time:'Hier 18:02', read:true,
  },
]

// ── NOTIFICATION PANEL ───────────────────────────────────────────────────────
function NotificationPanel({ notifs, setNotifs, onClose, onNavigate }) {
  const [selected, setSelected] = useState(null)

  const unread   = notifs.filter(n => !n.read).length
  const markAll  = () => setNotifs(n => n.map(x => ({ ...x, read:true })))
  const markOne  = (id) => setNotifs(n => n.map(x => x.id===id ? {...x,read:true} : x))
  const removeOne= (id) => { setNotifs(n => n.filter(x => x.id!==id)); if(selected?.id===id) setSelected(null) }

  const handleClick = (notif) => {
    markOne(notif.id)
    setSelected(notif)
  }

  const DetailView = ({ notif }) => {
    const Icon = notif.IconComp
    return (
      <div style={{flex:1,display:'flex',flexDirection:'column'}}>
        <button onClick={() => setSelected(null)}
          style={{display:'flex',alignItems:'center',gap:6,padding:'14px 20px',background:'none',border:'none',borderBottom:'1px solid #F3F4F6',cursor:'pointer',color:'#6B7280',fontSize:13,fontWeight:600,fontFamily:'inherit',width:'100%',textAlign:'left'}}>
          <ArrowLeft size={14}/> Retour aux notifications
        </button>
        <div style={{padding:'20px',flex:1,overflowY:'auto'}}>
          <div style={{display:'flex',alignItems:'flex-start',gap:12,marginBottom:16}}>
            <div style={{width:44,height:44,borderRadius:12,background:notif.bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              <Icon size={20} style={{color:notif.color}}/>
            </div>
            <div>
              <div style={{fontSize:15,fontWeight:800,color:'#111827',marginBottom:4,lineHeight:1.3}}>{notif.title}</div>
              <div style={{fontSize:11,color:'#9CA3AF'}}>{notif.time}</div>
            </div>
          </div>
          <div style={{fontSize:14,color:'#374151',lineHeight:1.75,marginBottom:20,padding:'14px',background:'#F8FAFF',borderRadius:12,border:'1px solid #E8ECF8'}}>
            {notif.detail}
          </div>
          <button
            onClick={() => { onNavigate(notif.actionPath); onClose() }}
            style={{width:'100%',background:'#4A6CF7',color:'white',border:'none',padding:'12px',borderRadius:11,fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:'inherit',display:'flex',alignItems:'center',justifyContent:'center',gap:8,boxShadow:'0 4px 12px rgba(74,108,247,0.3)'}}>
            <ExternalLink size={15}/> {notif.action}
          </button>
          <button
            onClick={() => { removeOne(notif.id); setSelected(null) }}
            style={{width:'100%',background:'none',border:'1.5px solid #FEE2E2',color:'#EF4444',padding:'10px',borderRadius:10,fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'inherit',marginTop:8}}>
            Supprimer cette notification
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      position:'absolute', top:'calc(100% + 12px)', right:0,
      width:400, maxHeight:520, background:'white', borderRadius:20,
      boxShadow:'0 20px 60px rgba(0,0,0,0.15)', border:'1px solid #F1F3F9',
      zIndex:200, display:'flex', flexDirection:'column',
      animation:'notifIn 0.2s ease', overflow:'hidden',
    }}>
      {selected ? (
        <DetailView notif={selected}/>
      ) : (
        <>
          {/* Header */}
          <div style={{padding:'16px 20px',borderBottom:'1px solid #F3F4F6',display:'flex',alignItems:'center',justifyContent:'space-between',flexShrink:0}}>
            <div>
              <div style={{fontSize:15,fontWeight:800,color:'#111827'}}>Notifications</div>
              <div style={{fontSize:12,marginTop:2,color: unread>0 ? '#9CA3AF' : '#059669'}}>
                {unread > 0 ? `${unread} non lue${unread>1?'s':''}` : '✓ Tout est lu'}
              </div>
            </div>
            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              {unread > 0 && (
                <button onClick={markAll}
                  style={{fontSize:11,fontWeight:700,color:'#4A6CF7',background:'#EEF1FB',border:'none',padding:'5px 11px',borderRadius:8,cursor:'pointer',fontFamily:'inherit'}}>
                  Tout lire
                </button>
              )}
              <button onClick={onClose}
                style={{background:'none',border:'none',cursor:'pointer',color:'#9CA3AF',padding:4,display:'flex',alignItems:'center'}}>
                <X size={16}/>
              </button>
            </div>
          </div>

          {/* List */}
          <div style={{overflowY:'auto',flex:1}}>
            {notifs.length === 0 ? (
              <div style={{padding:'52px 20px',textAlign:'center'}}>
                <div style={{fontSize:48,marginBottom:14}}>🔔</div>
                <div style={{fontSize:15,fontWeight:700,color:'#111827',marginBottom:6}}>Aucune notification</div>
                <div style={{fontSize:13,color:'#9CA3AF'}}>Vous êtes à jour ! Les alertes apparaîtront ici.</div>
              </div>
            ) : notifs.map((n) => {
              const Icon = n.IconComp
              return (
                <div key={n.id}
                  onClick={() => handleClick(n)}
                  style={{
                    display:'flex',alignItems:'flex-start',gap:12,
                    padding:'14px 20px',cursor:'pointer',
                    background: n.read ? 'white' : '#FAFBFF',
                    borderBottom:'1px solid #F9FAFB',
                    transition:'background 0.15s',
                    position:'relative',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background='#F8FAFF'}
                  onMouseLeave={e => e.currentTarget.style.background=n.read?'white':'#FAFBFF'}>
                  {!n.read && (
                    <div style={{position:'absolute',top:20,right:48,width:7,height:7,borderRadius:'50%',background:'#4A6CF7'}}/>
                  )}
                  <div style={{width:36,height:36,borderRadius:10,background:n.bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1}}>
                    <Icon size={16} style={{color:n.color}}/>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:n.read?500:700,color:'#111827',marginBottom:2,lineHeight:1.4}}>
                      {n.title}
                    </div>
                    <div style={{fontSize:12,color:'#6B7280',lineHeight:1.5,marginBottom:3}}>{n.desc}</div>
                    <div style={{fontSize:11,color:'#9CA3AF'}}>{n.time}</div>
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); removeOne(n.id) }}
                    style={{background:'none',border:'none',cursor:'pointer',color:'#D1D5DB',padding:4,display:'flex',alignItems:'center',flexShrink:0,marginTop:1}}
                    title="Supprimer">
                    <X size={13}/>
                  </button>
                </div>
              )
            })}
          </div>

          {/* Footer */}
          <div style={{padding:'12px 20px',borderTop:'1px solid #F3F4F6',textAlign:'center',flexShrink:0}}>
            <button
              onClick={() => { onNavigate('/crm/settings'); onClose() }}
              style={{fontSize:13,fontWeight:600,color:'#4A6CF7',background:'none',border:'none',cursor:'pointer',fontFamily:'inherit'}}>
              Gérer les notifications →
            </button>
          </div>
        </>
      )}
    </div>
  )
}

// ── PAGES INLINE ─────────────────────────────────────────────────────────────
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
          {['LUN','MAR','MER','JEU','VEN','SAM','DIM'].map(d=><div key={d} className="cal-day-name">{d}</div>)}
        </div>
        <div className="cal-grid">
          {Array.from({length:30},(_,i)=>i+1).map(d=>(
            <div key={d} className="cal-cell">
              <div className="cal-cell-num">{d}</div>
              {(posts[d]||[]).map(n=><div key={n} className="cal-net-pill" style={{background:NET_C[n]}}>{n}</div>)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AnalyticsPage() {
  const networks = [
    {name:'Instagram',color:'#E97729',followers:'12.4K',reach:'45.2K',engagement:'4.8%',posts:32,bars:[{l:'Reach',v:78},{l:'Engagement',v:85},{l:'Followers',v:62}]},
    {name:'LinkedIn', color:'#0A66C2',followers:'3.2K', reach:'18.7K',engagement:'3.2%',posts:15,bars:[{l:'Reach',v:45},{l:'Engagement',v:55},{l:'Followers',v:38}]},
    {name:'Facebook', color:'#1877F2',followers:'8.1K', reach:'22.3K',engagement:'2.1%',posts:20,bars:[{l:'Reach',v:52},{l:'Engagement',v:35},{l:'Followers',v:60}]},
    {name:'TikTok',   color:'#111',   followers:'5.6K', reach:'89.1K',engagement:'7.3%',posts:12,bars:[{l:'Reach',v:95},{l:'Engagement',v:92},{l:'Followers',v:48}]},
  ]
  return (
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{fontSize:22,fontWeight:800,color:'#111827'}}>Analytics</h2>
        <p style={{fontSize:14,color:'#9CA3AF',marginTop:4}}>Vue globale de vos performances</p>
      </div>
      <div className="crm-kpi-grid" style={{marginBottom:24}}>
        {[['2.4M','Impressions totales','+8%'],['29.3K','Abonnés totaux','+3.2%'],['175K','Reach moyen','+5.1%'],['79','Posts publiés','ce mois']].map(([v,l,d])=>(
          <div key={l} className="crm-kpi-card">
            <div className="crm-kpi-value">{v}</div>
            <div style={{fontSize:13,color:'#6B7280',margin:'4px 0'}}>{l}</div>
            <div style={{fontSize:12,fontWeight:600,color:'#059669'}}>{d}</div>
          </div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        {networks.map(n=>(
          <div key={n.name} className="analytics-net-card">
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
              <div style={{width:12,height:12,borderRadius:'50%',background:n.color}}/>
              <span style={{fontSize:15,fontWeight:700,color:'#111827'}}>{n.name}</span>
              <span style={{marginLeft:'auto',fontSize:12,color:'#9CA3AF'}}>{n.posts} posts</span>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:16}}>
              {[['Abonnés',n.followers],['Reach',n.reach],['Engagement',n.engagement]].map(([k,v])=>(
                <div key={k}>
                  <div style={{fontSize:11,color:'#9CA3AF',marginBottom:3}}>{k}</div>
                  <div style={{fontSize:16,fontWeight:700,color:'#111827'}}>{v}</div>
                </div>
              ))}
            </div>
            <div className="analytics-bar-wrap">
              {n.bars.map(b=>(
                <div key={b.l} className="analytics-bar-row">
                  <div className="analytics-bar-label">{b.l}</div>
                  <div className="analytics-bar-bg"><div className="analytics-bar-fill" style={{width:`${b.v}%`,background:n.color}}/></div>
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

// ── MAIN LAYOUT ──────────────────────────────────────────────────────────────
export default function CRMLayout() {
  const nav  = useNavigate()
  const loc  = useLocation()
  const [collapsed,  setCollapsed]  = useState(false)
  const [showNotifs, setShowNotifs] = useState(false)
  const [notifs,     setNotifs]     = useState(INIT_NOTIFICATIONS) // ← state levé ici
  const bellRef = useRef(null)
  const user = JSON.parse(localStorage.getItem('aura_user') || '{}')

  // Badge count calculé depuis le state → se met à jour en temps réel
  const unreadCount = notifs.filter(n => !n.read).length

  useEffect(() => {
    const handler = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) setShowNotifs(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const logout = () => { localStorage.removeItem('aura_user'); nav('/login') }

  const allPaths = [...NAV, { path:'/crm/settings', label:'Paramètres', icon:Settings }]
  const currentPage = allPaths.find(n =>
    n.path === loc.pathname || (n.path !== '/crm' && loc.pathname.startsWith(n.path))
  )
  const isActive = (path) =>
    loc.pathname === path || (path !== '/crm' && loc.pathname.startsWith(path))

  return (
    <div className="crm-wrap">

      {/* ── SIDEBAR ── */}
      <aside className={`crm-sidebar ${collapsed?'closed':'open'}`}>
        <div className="crm-sidebar-top">
          {!collapsed && <span className="crm-sidebar-logo">AURA<span className="crm-sidebar-logo-sub">CRM</span></span>}
          {collapsed  && <Brain size={22} style={{color:'#4A6CF7'}}/>}
        </div>
        <button className="crm-collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight size={13}/> : <ChevronLeft size={13}/>}
        </button>
        <nav className="crm-nav">
          {NAV.map(({ path, label, icon:Icon }) => (
            <button key={path} onClick={() => nav(path)}
              className={`crm-nav-item ${isActive(path)?'active':''}`}>
              <Icon size={18} style={{flexShrink:0}}/>
              {!collapsed && <span>{label}</span>}
              {!collapsed && path==='/crm/insights' && (
                <span style={{marginLeft:'auto',fontSize:9,fontWeight:700,padding:'2px 6px',background:'linear-gradient(135deg,#4A6CF7,#8B5CF6)',color:'white',borderRadius:99}}>NEW</span>
              )}
            </button>
          ))}
        </nav>
        <div className="crm-nav-bottom">
          <button onClick={() => nav('/crm/settings')}
            className={`crm-nav-item ${isActive('/crm/settings')?'active':''}`}
            style={{width:'100%'}}>
            <Settings size={17} style={{flexShrink:0}}/>
            {!collapsed && <span>Paramètres</span>}
          </button>
          <button onClick={logout} className="crm-nav-item crm-nav-item-danger" style={{width:'100%'}}>
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

            {/* Bell */}
            <div ref={bellRef} style={{position:'relative'}}>
              <button
                onClick={() => setShowNotifs(!showNotifs)}
                style={{
                  position:'relative', background: showNotifs?'#EEF1FB':'none',
                  border:'none', cursor:'pointer',
                  color: showNotifs?'#4A6CF7':'#9CA3AF',
                  padding:8, borderRadius:10,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  transition:'all 0.15s',
                }}>
                <Bell size={18}/>
                {unreadCount > 0 && (
                  <span style={{
                    position:'absolute', top:4, right:4,
                    minWidth:16, height:16, background:'#EF4444',
                    borderRadius:99, color:'white',
                    fontSize:9, fontWeight:800, padding:'0 3px',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    border:'2px solid white', lineHeight:1,
                  }}>
                    {unreadCount}
                  </span>
                )}
              </button>
              {showNotifs && (
                <NotificationPanel
                  notifs={notifs}
                  setNotifs={setNotifs}
                  onClose={() => setShowNotifs(false)}
                  onNavigate={(path) => nav(path)}
                />
              )}
            </div>

            {/* User */}
            <div
              onClick={() => nav('/crm/settings')}
              style={{display:'flex',alignItems:'center',gap:10,cursor:'pointer',padding:'6px 10px',borderRadius:10,transition:'background 0.15s'}}
              onMouseEnter={e=>e.currentTarget.style.background='#F8FAFF'}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              <div className="crm-avatar">{(user.name||'U')[0].toUpperCase()}</div>
              <div>
                <div className="crm-user-name">{user.name||'Mohamed Ali'}</div>
                <div className="crm-user-email">{user.email||'admin@aurasocials.com'}</div>
              </div>
            </div>
          </div>
        </header>

        <main className="crm-content">
          <Routes>
            <Route index          element={<CRMDashboard/>}/>
            <Route path="clients"  element={<CRMClients/>}/>
            <Route path="ai"       element={<CRMAIGenerator/>}/>
            <Route path="calendar" element={<CalendarPage/>}/>
            <Route path="analytics"element={<AnalyticsPage/>}/>
            <Route path="insights" element={<CRMInsights/>}/>
            <Route path="settings" element={<CRMSettings/>}/>
            <Route path="*"        element={<Navigate to="/crm"/>}/>
          </Routes>
        </main>
      </div>

      <style>{`
        @keyframes notifIn {
          from { opacity:0; transform:scale(0.96) translateY(-8px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
      `}</style>
    </div>
  )
}