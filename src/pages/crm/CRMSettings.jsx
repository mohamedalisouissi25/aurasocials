import { useState, useEffect } from 'react'
import {
  User, Bell, Shield, CreditCard, Link, Key, Users, LogOut,
  Camera, Check, Copy, Plus, Trash2, Palette, Zap
} from 'lucide-react'

const TABS = [
  { id:'profile',       label:'Mon profil',   icon:User },
  { id:'appearance',    label:'Apparence',     icon:Palette },
  { id:'notifications', label:'Notifications', icon:Bell },
  { id:'security',      label:'Sécurité',      icon:Shield },
  { id:'billing',       label:'Abonnement',    icon:CreditCard },
  { id:'integrations',  label:'Intégrations',  icon:Link },
  { id:'api',           label:'Clés API',      icon:Key },
  { id:'team',          label:'Mon équipe',    icon:Users },
]

const DEFAULTS = { theme:'light', lang:'fr', density:'comfortable' }

function loadAppearance() {
  try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem('aura_crm_settings') || '{}') } }
  catch { return DEFAULTS }
}

function applyAppearance(s) {
  const root = document.documentElement
  let theme = s.theme
  if (theme === 'auto') theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  root.setAttribute('data-crm-theme',   theme)
  root.setAttribute('data-crm-density', s.density)
  root.setAttribute('data-crm-dir',     s.lang === 'ar' ? 'rtl' : 'ltr')
  localStorage.setItem('aura_crm_settings', JSON.stringify(s))
}

function Toast({ msg }) {
  return msg ? <div className="toast">✓ &nbsp;{msg}</div> : null
}

function Toggle({ on, onToggle }) {
  return (
    <div onClick={onToggle}
      style={{position:'relative',width:44,height:24,flexShrink:0,cursor:'pointer'}}>
      <div style={{
        position:'absolute', inset:0,
        background: on ? '#4A6CF7' : '#E5E7EB',
        borderRadius:12, transition:'background 0.2s',
      }}>
        <div style={{
          position:'absolute', top:3,
          left: on ? 23 : 3,
          width:18, height:18, background:'white',
          borderRadius:'50%', transition:'left 0.2s',
          boxShadow:'0 1px 4px rgba(0,0,0,0.2)',
        }}/>
      </div>
    </div>
  )
}

export default function CRMSettings() {
  const user = JSON.parse(localStorage.getItem('aura_user') || '{}')
  const [tab,    setTab]    = useState('profile')
  const [toast,  setToast]  = useState('')
  const [copied, setCopied] = useState('')

  const [app, setApp] = useState(loadAppearance)

  // Apply on mount
  useEffect(() => { applyAppearance(app) }, [])

  const updateApp = (patch) => {
    const next = { ...app, ...patch }
    setApp(next)
    applyAppearance(next)
  }

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2800) }

  const [profile, setProfile] = useState({
    name:    user.name    || 'Mohamed Ali Souissi',
    email:   user.email   || 'admin@aurasocials.com',
    company: user.company || 'AuraSocials',
    phone:   '+216 XX XXX XXX',
    role:    'CEO & Fondateur',
    bio:     "Fondateur d'AuraSocials — CRM social media propulsé par l'IA Claude.",
    website: 'https://aurasocials.com',
    timezone:'Europe/Paris',
  })

  const [notifs, setNotifs] = useState({
    emailWeekly:true, emailAlerts:true, emailMarketing:false,
    pushAll:true, pushComments:true, pushReports:true,
    reportFreq:'weekly',
  })

  const [pw,    setPw]    = useState({ current:'', next:'', confirm:'' })
  const [twoFA, setTwoFA] = useState(false)

  const [integrations, setIntegrations] = useState({
    instagram:true, linkedin:true, facebook:false,
    tiktok:false, twitter:false, claude:true,
  })

  const [inviteEmail, setInviteEmail] = useState('')

  const saveProfile = () => {
    localStorage.setItem('aura_user', JSON.stringify({ ...user, ...profile }))
    showToast('Profil mis à jour !')
  }

  const copyKey = (key, label) => {
    navigator.clipboard.writeText(key)
    setCopied(label)
    setTimeout(() => setCopied(''), 2000)
  }

  const NET_INFO = [
    {id:'instagram',label:'Instagram',  icon:'📸',color:'#E97729',desc:'Posts, Reels, Stories'},
    {id:'linkedin', label:'LinkedIn',   icon:'💼',color:'#0A66C2',desc:'Articles, posts professionnels'},
    {id:'facebook', label:'Facebook',   icon:'👥',color:'#1877F2',desc:'Posts, photos, événements'},
    {id:'tiktok',   label:'TikTok',     icon:'🎵',color:'#111',  desc:'Vidéos courtes, lives'},
    {id:'twitter',  label:'X (Twitter)',icon:'🐦',color:'#1DA1F2',desc:'Threads, tweets, sondages'},
    {id:'claude',   label:'Claude API', icon:'🤖',color:'#4A6CF7',desc:'IA générative — Anthropic'},
  ]

  const team = [
    {name:'Mohamed Ali Souissi',email:'admin@aurasocials.com',role:'Admin',color:'#4A6CF7',initial:'M'},
    {name:'Aura Bot',           email:'bot@aurasocials.com',  role:'IA',   color:'#8B5CF6',initial:'🤖'},
  ]

  const THEMES = [
    {id:'light',label:'Clair',  icon:'☀️',desc:'Interface blanche'},
    {id:'dark', label:'Sombre', icon:'🌙',desc:'Interface noire'},
    {id:'auto', label:'Système',icon:'🖥️',desc:'Suit votre OS'},
  ]

  const DENSITIES = [
    {id:'compact',     label:'Compact',     icon:'▤',desc:"Plus d'info visible"},
    {id:'comfortable', label:'Confortable', icon:'▣',desc:'Équilibre (recommandé)'},
    {id:'spacious',    label:'Spacieux',    icon:'□',desc:"Plus d'espace"},
  ]

  const LANGS = [
    {value:'fr',label:'🇫🇷 Français'},
    {value:'en',label:'🇬🇧 English'},
    {value:'ar',label:'🇸🇦 العربية'},
    {value:'es',label:'🇪🇸 Español'},
    {value:'de',label:'🇩🇪 Deutsch'},
  ]

  return (
    <div>
      <Toast msg={toast}/>
      <div style={{marginBottom:28}}>
        <h2 style={{fontSize:22,fontWeight:800,color:'#111827'}}>Paramètres</h2>
        <p style={{fontSize:14,color:'#9CA3AF',marginTop:4}}>Gérez votre compte, votre équipe et vos intégrations.</p>
      </div>

      <div className="settings-wrap">
        {/* Sidebar tabs */}
        <div>
          <div className="settings-tabs">
            {TABS.map(({ id, label, icon:Icon }) => (
              <button key={id} onClick={() => setTab(id)}
                className={`settings-tab ${tab===id?'active':''}`}>
                <Icon size={15}/> {label}
              </button>
            ))}
            <hr className="settings-section-divider"/>
            <button className="settings-tab" style={{color:'#EF4444'}}
              onClick={() => { localStorage.removeItem('aura_user'); window.location.href='/login' }}>
              <LogOut size={15}/> Déconnexion
            </button>
          </div>
        </div>

        {/* Panel */}
        <div className="settings-panel">

          {/* ── PROFIL ── */}
          {tab==='profile' && (
            <div>
              <div className="settings-panel-title">Mon profil</div>
              <div className="settings-panel-sub">Vos informations personnelles et professionnelles.</div>
              <div className="settings-avatar-wrap">
                <div className="settings-avatar">{(profile.name||'M')[0].toUpperCase()}</div>
                <div>
                  <div style={{fontWeight:700,color:'#111827',marginBottom:4}}>{profile.name}</div>
                  <div className="settings-avatar-info">{profile.role} · {profile.company}</div>
                  <button className="settings-avatar-btn" style={{marginTop:8}}>
                    <Camera size={13} style={{display:'inline',marginRight:5}}/> Changer la photo
                  </button>
                </div>
              </div>
              <div className="settings-grid-2">
                <div className="settings-field">
                  <label className="settings-label">Prénom & Nom</label>
                  <input className="settings-input" value={profile.name} onChange={e=>setProfile({...profile,name:e.target.value})}/>
                </div>
                <div className="settings-field">
                  <label className="settings-label">Email</label>
                  <input className="settings-input" type="email" value={profile.email} onChange={e=>setProfile({...profile,email:e.target.value})}/>
                </div>
                <div className="settings-field">
                  <label className="settings-label">Entreprise</label>
                  <input className="settings-input" value={profile.company} onChange={e=>setProfile({...profile,company:e.target.value})}/>
                </div>
                <div className="settings-field">
                  <label className="settings-label">Rôle / Poste</label>
                  <input className="settings-input" value={profile.role} onChange={e=>setProfile({...profile,role:e.target.value})}/>
                </div>
                <div className="settings-field">
                  <label className="settings-label">Téléphone</label>
                  <input className="settings-input" value={profile.phone} onChange={e=>setProfile({...profile,phone:e.target.value})}/>
                </div>
                <div className="settings-field">
                  <label className="settings-label">Site web</label>
                  <input className="settings-input" value={profile.website} onChange={e=>setProfile({...profile,website:e.target.value})}/>
                </div>
              </div>
              <div className="settings-field">
                <label className="settings-label">Bio</label>
                <textarea className="settings-textarea" rows={3} style={{resize:'none'}}
                  value={profile.bio} onChange={e=>setProfile({...profile,bio:e.target.value})}/>
              </div>
              <div className="settings-field">
                <label className="settings-label">Fuseau horaire</label>
                <select className="settings-select" value={profile.timezone} onChange={e=>setProfile({...profile,timezone:e.target.value})}>
                  {['Europe/Paris','Africa/Tunis','Europe/London','America/New_York','Asia/Tokyo','Asia/Shanghai'].map(tz=><option key={tz}>{tz}</option>)}
                </select>
              </div>
              <div style={{display:'flex',gap:12}}>
                <button className="settings-save" onClick={saveProfile}>✓ Sauvegarder</button>
                <button className="settings-cancel">Annuler</button>
              </div>
            </div>
          )}

          {/* ── APPARENCE ── */}
          {tab==='appearance' && (
            <div>
              <div className="settings-panel-title">Apparence</div>
              <div className="settings-panel-sub">Les changements s'appliquent instantanément à toute l'interface CRM.</div>

              {/* Thème */}
              <div className="settings-field">
                <label className="settings-label">Thème</label>
                <div style={{display:'flex',gap:12}}>
                  {THEMES.map(t => (
                    <div key={t.id} onClick={() => updateApp({theme:t.id})}
                      style={{
                        flex:1,border:`2px solid ${app.theme===t.id?'#4A6CF7':'#E5E7EB'}`,
                        borderRadius:14,padding:'18px 12px',cursor:'pointer',
                        background:app.theme===t.id?'#EEF1FB':'white',
                        textAlign:'center',transition:'all 0.15s',
                      }}>
                      <div style={{fontSize:28,marginBottom:8}}>{t.icon}</div>
                      <div style={{fontSize:13,fontWeight:700,color:app.theme===t.id?'#4A6CF7':'#374151',marginBottom:3}}>{t.label}</div>
                      <div style={{fontSize:11,color:'#9CA3AF'}}>{t.desc}</div>
                      {app.theme===t.id && (
                        <div style={{marginTop:8,fontSize:11,fontWeight:700,color:'#4A6CF7',display:'flex',alignItems:'center',justifyContent:'center',gap:4}}>
                          <Check size={12}/> Actif
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Langue */}
              <div className="settings-field">
                <label className="settings-label">Langue de l'interface CRM</label>
                <select className="settings-select" value={app.lang}
                  onChange={e => updateApp({lang:e.target.value})}>
                  {LANGS.map(l=><option key={l.value} value={l.value}>{l.label}</option>)}
                </select>
                <div style={{fontSize:12,color:'#9CA3AF',marginTop:6}}>
                  Affecte la direction du texte (RTL pour l'arabe) et les labels du CRM.
                </div>
              </div>

              {/* Densité */}
              <div className="settings-field">
                <label className="settings-label">Densité d'affichage</label>
                <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10}}>
                  {DENSITIES.map(d => (
                    <div key={d.id} onClick={() => updateApp({density:d.id})}
                      style={{
                        border:`2px solid ${app.density===d.id?'#4A6CF7':'#E5E7EB'}`,
                        borderRadius:12,padding:'14px 10px',cursor:'pointer',
                        background:app.density===d.id?'#EEF1FB':'white',
                        textAlign:'center',transition:'all 0.15s',
                      }}>
                      <div style={{fontSize:22,marginBottom:6}}>{d.icon}</div>
                      <div style={{fontSize:12,fontWeight:700,color:app.density===d.id?'#4A6CF7':'#374151',marginBottom:2}}>{d.label}</div>
                      <div style={{fontSize:10,color:'#9CA3AF'}}>{d.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Aperçu */}
              <div style={{background:'#F8FAFF',borderRadius:14,padding:'16px 20px',border:'1.5px solid #E8ECF8',marginTop:4}}>
                <div style={{fontSize:12,fontWeight:700,color:'#4A6CF7',marginBottom:10}}>👁️ Configuration active</div>
                <div style={{display:'flex',gap:10}}>
                  {[
                    {l:'Thème',   v:THEMES.find(t=>t.id===app.theme)?.label+' '+THEMES.find(t=>t.id===app.theme)?.icon},
                    {l:'Langue',  v:LANGS.find(l=>l.value===app.lang)?.label},
                    {l:'Densité', v:DENSITIES.find(d=>d.id===app.density)?.label+' '+DENSITIES.find(d=>d.id===app.density)?.icon},
                  ].map(item=>(
                    <div key={item.l} style={{flex:1,background:'white',borderRadius:10,padding:'10px 12px',border:'1px solid #E8ECF8',textAlign:'center'}}>
                      <div style={{fontSize:10,color:'#9CA3AF',marginBottom:4,fontWeight:600}}>{item.l.toUpperCase()}</div>
                      <div style={{fontSize:13,fontWeight:700,color:'#1B2A5A'}}>{item.v}</div>
                    </div>
                  ))}
                </div>
                <div style={{marginTop:10,fontSize:12,color:'#059669',fontWeight:600}}>
                  ✓ Sauvegardé automatiquement — appliqué immédiatement
                </div>
              </div>
            </div>
          )}

          {/* ── NOTIFICATIONS ── */}
          {tab==='notifications' && (
            <div>
              <div className="settings-panel-title">Notifications</div>
              <div className="settings-panel-sub">Choisissez quand et comment AuraCRM vous notifie.</div>
              <div style={{fontWeight:700,color:'#374151',fontSize:13,marginBottom:12,textTransform:'uppercase',letterSpacing:'0.5px'}}>📧 Par email</div>
              {[
                {key:'emailWeekly',   label:'Rapport hebdomadaire',   desc:'Résumé des performances chaque lundi.'},
                {key:'emailAlerts',   label:'Alertes importantes',    desc:'Baisse de performance, erreur de publication.'},
                {key:'emailMarketing',label:'Nouveautés AuraSocials', desc:'Nouvelles fonctionnalités, offres exclusives.'},
              ].map(n=>(
                <div key={n.key} className="toggle-row">
                  <div className="toggle-info">
                    <div className="toggle-label">{n.label}</div>
                    <div className="toggle-desc">{n.desc}</div>
                  </div>
                  <Toggle on={notifs[n.key]} onToggle={()=>setNotifs({...notifs,[n.key]:!notifs[n.key]})}/>
                </div>
              ))}
              <hr className="settings-section-divider"/>
              <div style={{fontWeight:700,color:'#374151',fontSize:13,marginBottom:12,textTransform:'uppercase',letterSpacing:'0.5px'}}>🔔 Push & In-app</div>
              {[
                {key:'pushAll',      label:'Toutes les notifications', desc:'Reçois toutes les alertes dans le CRM.'},
                {key:'pushComments', label:'Nouveaux commentaires',    desc:"Quand un client reçoit un commentaire."},
                {key:'pushReports',  label:'Rapports IA prêts',        desc:'Quand une génération est disponible.'},
              ].map(n=>(
                <div key={n.key} className="toggle-row">
                  <div className="toggle-info">
                    <div className="toggle-label">{n.label}</div>
                    <div className="toggle-desc">{n.desc}</div>
                  </div>
                  <Toggle on={notifs[n.key]} onToggle={()=>setNotifs({...notifs,[n.key]:!notifs[n.key]})}/>
                </div>
              ))}
              <hr className="settings-section-divider"/>
              <div className="settings-field">
                <label className="settings-label">Fréquence des rapports</label>
                <select className="settings-select" value={notifs.reportFreq} onChange={e=>setNotifs({...notifs,reportFreq:e.target.value})}>
                  <option value="daily">Quotidien</option>
                  <option value="weekly">Hebdomadaire (recommandé)</option>
                  <option value="monthly">Mensuel</option>
                  <option value="never">Désactivé</option>
                </select>
              </div>
              <button className="settings-save" onClick={()=>showToast('Notifications sauvegardées !')}>✓ Sauvegarder</button>
            </div>
          )}

          {/* ── SÉCURITÉ ── */}
          {tab==='security' && (
            <div>
              <div className="settings-panel-title">Sécurité</div>
              <div className="settings-panel-sub">Protégez votre compte et gérez vos sessions.</div>
              <div style={{fontWeight:700,color:'#374151',fontSize:13,marginBottom:14,textTransform:'uppercase',letterSpacing:'0.5px'}}>🔑 Changer le mot de passe</div>
              <div className="settings-field">
                <label className="settings-label">Mot de passe actuel</label>
                <input className="settings-input" type="password" placeholder="••••••••" value={pw.current} onChange={e=>setPw({...pw,current:e.target.value})}/>
              </div>
              <div className="settings-grid-2">
                <div className="settings-field">
                  <label className="settings-label">Nouveau</label>
                  <input className="settings-input" type="password" placeholder="Min. 8 caractères" value={pw.next} onChange={e=>setPw({...pw,next:e.target.value})}/>
                </div>
                <div className="settings-field">
                  <label className="settings-label">Confirmer</label>
                  <input className="settings-input" type="password" placeholder="Répétez" value={pw.confirm} onChange={e=>setPw({...pw,confirm:e.target.value})}/>
                </div>
              </div>
              {pw.next && (
                <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:16}}>
                  {[{l:'8 car.',ok:pw.next.length>=8},{l:'Majuscule',ok:/[A-Z]/.test(pw.next)},{l:'Chiffre',ok:/[0-9]/.test(pw.next)},{l:'Symbole',ok:/[^A-Za-z0-9]/.test(pw.next)}].map(c=>(
                    <span key={c.l} style={{fontSize:12,color:c.ok?'#059669':'#9CA3AF',display:'flex',alignItems:'center',gap:4}}>
                      {c.ok?'✓':'○'} {c.l}
                    </span>
                  ))}
                </div>
              )}
              <button className="settings-save" onClick={()=>{setPw({current:'',next:'',confirm:''});showToast('Mot de passe mis à jour !')}}>
                🔒 Mettre à jour
              </button>
              <hr className="settings-section-divider"/>
              <div style={{fontWeight:700,color:'#374151',fontSize:13,marginBottom:14,textTransform:'uppercase',letterSpacing:'0.5px'}}>🛡️ Authentification 2FA</div>
              <div className="toggle-row" style={{marginBottom:24}}>
                <div className="toggle-info">
                  <div className="toggle-label">Activer la 2FA</div>
                  <div className="toggle-desc">Sécurisez votre compte avec Google Authenticator ou SMS.</div>
                </div>
                <Toggle on={twoFA} onToggle={()=>{setTwoFA(!twoFA);showToast(twoFA?'2FA désactivée.':'2FA activée ! 🛡️')}}/>
              </div>
              <hr className="settings-section-divider"/>
              <div style={{fontWeight:700,color:'#374151',fontSize:13,marginBottom:14,textTransform:'uppercase',letterSpacing:'0.5px'}}>💻 Sessions actives</div>
              {[
                {device:'Chrome — Windows 11',loc:'Tunis, TN',time:'Maintenant',current:true},
                {device:'Safari — iPhone 15',  loc:'Tunis, TN',time:'Il y a 2h', current:false},
                {device:'Firefox — macOS',     loc:'Paris, FR', time:'Hier 18:34',current:false},
              ].map((s,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 0',borderBottom:'1px solid #F9FAFB'}}>
                  <div style={{width:40,height:40,background:'#F8FAFF',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>
                    {s.device.includes('Chrome')?'🌐':s.device.includes('Safari')?'📱':'🦊'}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:600,color:'#111827'}}>{s.device}</div>
                    <div style={{fontSize:12,color:'#9CA3AF'}}>{s.loc} · {s.time}</div>
                  </div>
                  {s.current
                    ? <span style={{fontSize:11,fontWeight:700,background:'#D1FAE5',color:'#059669',padding:'3px 10px',borderRadius:99}}>Actuelle</span>
                    : <button style={{background:'none',border:'1.5px solid #FEE2E2',borderRadius:8,padding:'5px 12px',cursor:'pointer',color:'#EF4444',fontSize:12,fontWeight:600,fontFamily:'inherit'}}>Révoquer</button>
                  }
                </div>
              ))}
              <hr className="settings-section-divider"/>
              <div className="danger-zone">
                <div className="danger-title">⚠️ Zone de danger</div>
                <div className="danger-desc">La suppression de votre compte est irréversible.</div>
                <button className="danger-btn">Supprimer mon compte</button>
              </div>
            </div>
          )}

          {/* ── ABONNEMENT ── */}
          {tab==='billing' && (
            <div>
              <div className="settings-panel-title">Abonnement & Facturation</div>
              <div className="settings-panel-sub">Gérez votre plan et vos informations de paiement.</div>
              <div style={{background:'linear-gradient(135deg,#1B2A5A,#2E3F7A)',borderRadius:20,padding:'28px 32px',marginBottom:24}}>
                <div className="plan-badge"><Zap size={12}/> Plan actuel</div>
                <div style={{fontSize:28,fontWeight:800,color:'white',marginBottom:4}}>AGENCY</div>
                <div style={{fontSize:15,color:'rgba(255,255,255,0.6)',marginBottom:20}}>149 € / mois · Renouvellement le 13 août 2026</div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16}}>
                  {[['25','Clients'],['∞','Posts'],['50+','Langues'],['IA','Générative']].map(([v,l])=>(
                    <div key={l} style={{textAlign:'center'}}>
                      <div style={{fontSize:22,fontWeight:800,color:'white'}}>{v}</div>
                      <div style={{fontSize:11,color:'rgba(255,255,255,0.5)',textTransform:'uppercase',letterSpacing:'0.5px'}}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{display:'flex',gap:12,marginBottom:28}}>
                <button className="settings-save" onClick={()=>window.location.href='/payment'}>⬆️ Passer en Enterprise</button>
                <button className="settings-cancel">Annuler l'abonnement</button>
              </div>
              <div style={{fontWeight:700,color:'#374151',fontSize:13,marginBottom:12,textTransform:'uppercase',letterSpacing:'0.5px'}}>🧾 Historique</div>
              {[['13 juil. 2026','149,00 €'],['13 juin 2026','149,00 €'],['13 mai 2026','49,00 €']].map(([d,a])=>(
                <div key={d} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 0',borderBottom:'1px solid #F9FAFB'}}>
                  <div style={{flex:1,fontSize:13,color:'#374151'}}>{d}</div>
                  <div style={{fontWeight:700,fontSize:13,color:'#111827'}}>{a}</div>
                  <span style={{fontSize:11,fontWeight:700,background:'#D1FAE5',color:'#059669',padding:'3px 10px',borderRadius:99}}>Payé</span>
                  <button style={{background:'none',border:'none',cursor:'pointer',color:'#4A6CF7',fontSize:12,fontWeight:600,fontFamily:'inherit'}}>PDF</button>
                </div>
              ))}
            </div>
          )}

          {/* ── INTÉGRATIONS ── */}
          {tab==='integrations' && (
            <div>
              <div className="settings-panel-title">Intégrations</div>
              <div className="settings-panel-sub">Connectez vos réseaux sociaux et outils tiers à AuraCRM.</div>
              {NET_INFO.map(net=>(
                <div key={net.id} className={`integration-row ${integrations[net.id]?'on':''}`}>
                  <div className="integration-left">
                    <div className="integration-icon" style={{background:`${net.color}20`}}>{net.icon}</div>
                    <div>
                      <div className="integration-name">{net.label}</div>
                      <div className={`integration-status ${integrations[net.id]?'ok':''}`}>
                        {integrations[net.id] ? '✓ Connecté · Compte vérifié' : net.desc}
                      </div>
                    </div>
                  </div>
                  <button onClick={()=>setIntegrations({...integrations,[net.id]:!integrations[net.id]})}
                    className={`integration-btn ${integrations[net.id]?'on':''}`}>
                    {integrations[net.id] ? '✓ Connecté' : 'Connecter'}
                  </button>
                </div>
              ))}
              <button className="settings-save" style={{marginTop:20}} onClick={()=>showToast('Intégrations sauvegardées !')}>✓ Sauvegarder</button>
            </div>
          )}

          {/* ── API ── */}
          {tab==='api' && (
            <div>
              <div className="settings-panel-title">Clés API</div>
              <div className="settings-panel-sub">Gérez vos clés pour connecter AuraCRM à vos outils.</div>
              <div style={{background:'#FEF3C7',border:'1px solid #FDE68A',borderRadius:12,padding:'12px 16px',marginBottom:20,fontSize:13,color:'#92400E'}}>
                ⚠️ Ne partagez jamais vos clés API.
              </div>
              {[
                {label:'Clé API (Production)',key:'ask_live_xxxxxxxxx•••••••••••••••',active:true},
                {label:'Clé API (Test)',      key:'ask_test_xxxxxxxxx•••••••••••••••',active:false},
              ].map(k=>(
                <div key={k.label} style={{marginBottom:16}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
                    <label className="settings-label" style={{margin:0}}>{k.label}</label>
                    <span style={{fontSize:11,fontWeight:700,padding:'3px 10px',borderRadius:99,background:k.active?'#D1FAE5':'#F3F4F6',color:k.active?'#059669':'#6B7280'}}>
                      {k.active?'Active':'Test'}
                    </span>
                  </div>
                  <div className="api-key-box">
                    <span>{k.key}</span>
                    <button className="api-copy-btn" onClick={()=>copyKey(k.key,k.label)}>
                      {copied===k.label?<><Check size={11}/> Copié</>:<><Copy size={11}/> Copier</>}
                    </button>
                  </div>
                </div>
              ))}
              <button className="settings-save" onClick={()=>showToast('Nouvelle clé générée !')}>
                <Plus size={14} style={{display:'inline',marginRight:6}}/> Générer une clé
              </button>
            </div>
          )}

          {/* ── ÉQUIPE ── */}
          {tab==='team' && (
            <div>
              <div className="settings-panel-title">Mon équipe</div>
              <div className="settings-panel-sub">Invitez des collaborateurs et gérez leurs accès.</div>
              <div style={{background:'#EEF1FB',borderRadius:14,padding:'16px 20px',marginBottom:20,display:'flex',alignItems:'center',gap:12}}>
                <div style={{fontSize:24}}>👥</div>
                <div>
                  <div style={{fontSize:14,fontWeight:700,color:'#1B2A5A'}}>2 / 5 membres · Plan AGENCY</div>
                  <div style={{fontSize:12,color:'#6B7280'}}>Passez en Enterprise pour des membres illimités.</div>
                </div>
              </div>
              {team.map(m=>(
                <div key={m.email} className="member-row">
                  <div className="member-av" style={{background:m.color}}>{m.initial}</div>
                  <div style={{flex:1}}>
                    <div className="member-name">{m.name}</div>
                    <div className="member-email">{m.email}</div>
                  </div>
                  <span className={`member-badge ${m.role==='Admin'?'admin':'member'}`}>{m.role}</span>
                  {m.role!=='Admin' && (
                    <button style={{background:'none',border:'none',cursor:'pointer',color:'#EF4444',padding:'4px 8px'}}>
                      <Trash2 size={14}/>
                    </button>
                  )}
                </div>
              ))}
              <div style={{marginTop:20}}>
                <div style={{fontWeight:700,color:'#374151',fontSize:13,marginBottom:10,textTransform:'uppercase',letterSpacing:'0.5px'}}>✉️ Inviter un membre</div>
                <div style={{display:'flex',gap:10}}>
                  <input className="settings-input" style={{flex:1}} placeholder="email@collaborateur.com"
                    value={inviteEmail} onChange={e=>setInviteEmail(e.target.value)}/>
                  <select className="settings-select" style={{width:130}}>
                    <option>Member</option><option>Admin</option><option>Lecteur</option>
                  </select>
                  <button className="settings-save"
                    onClick={()=>{showToast(`Invitation envoyée à ${inviteEmail||'votre collaborateur'} !`);setInviteEmail('')}}>
                    <Plus size={14}/>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}