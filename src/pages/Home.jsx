import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Brain, Calendar, BarChart3, MessageSquare, Globe, Shield,
  ChevronRight, Send, X, Zap, ArrowRight, Clock, User
} from 'lucide-react'
import { TR, LANG_KEYS } from '../i18n'

const LANGS = ['🇫🇷 Français','🇬🇧 English','🇸🇦 العربية','🇪🇸 Español','🇩🇪 Deutsch','🇨🇳 中文','🇯🇵 日本語','🇧🇷 Português']

const BOT_REPLIES = [
  "Bonjour ! 👋 Je suis Aura, votre assistante IA. Comment puis-je vous aider ?",
  "AuraCRM génère des publications pour tous vos clients en un clic via l'IA Claude d'Anthropic.",
  "Nous supportons Instagram, LinkedIn, TikTok, Facebook et X depuis un seul tableau de bord.",
  "La solution supporte 50+ langues et s'adapte à tout secteur d'activité.",
  "Souhaitez-vous une démo ? Créez votre compte gratuitement — aucune carte requise.",
]

const BLOG_POSTS = [
  { slug:'ia-social-media-2026',  emoji:'🤖', tag:'Intelligence Artificielle', title:"Comment l'IA transforme le social media en 2026",         desc:"Les agences qui utilisent l'IA génèrent 3x plus de contenu et réduisent leur temps de production de 70%.", author:'Mohamed Ali Souissi', date:'10 juin 2026', read:'5 min', bg:'linear-gradient(135deg,#EEF1FB,#C7D4FB)' },
  { slug:'metriques-cles-2026',   emoji:'📊', tag:'Analytics & KPIs',          title:"Les 5 métriques clés à suivre pour vos clients en 2026",   desc:"Reach, engagement, taux de conversion, sentiment score et ROI social — les 5 KPIs essentiels.",           author:'Mohamed Ali Souissi', date:'5 juin 2026',  read:'7 min', bg:'linear-gradient(135deg,#FEF3C7,#FDE68A)' },
  { slug:'guide-reseaux-2026',    emoji:'🌍', tag:'Stratégie digitale',        title:"Guide complet : Instagram, LinkedIn, TikTok en 2026",       desc:"Chaque réseau a ses propres codes. Ce guide vous donne les meilleures pratiques par plateforme.",          author:'Mohamed Ali Souissi', date:'1 juin 2026',  read:'9 min', bg:'linear-gradient(135deg,#D1FAE5,#A7F3D0)' },
]

const PLANS = [
  {
    name:'STARTER', price:'49€', per:'/mois', featured:false,
    features:['5 clients','3 réseaux sociaux','50 posts / mois','Analytics basiques','Chatbot IA','Support email'],
  },
  {
    name:'AGENCY', price:'149€', per:'/mois', featured:true,
    features:['25 clients','Tous les réseaux','Posts illimités','IA générative complète','Analytics avancés','Calendrier éditorial','Support prioritaire'],
  },
  {
    name:'ENTERPRISE', price:'499€', per:'/mois', featured:false,
    badge:'COMPLET',
    features:['Clients illimités','IA personnalisée','API privée dédiée','Support 24/7 dédié','Onboarding sur mesure','SLA garanti'],
  },
]

const SVC_ICONS = [Brain, Calendar, BarChart3, MessageSquare, Globe, Shield]

export default function Home() {
  const nav = useNavigate()
  const [chatOpen,  setChatOpen]  = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [messages,  setMessages]  = useState([
    { from:'bot', text:"Bonjour ! 👋 Je suis Aura, votre assistante IA. Comment puis-je vous aider aujourd'hui ?" }
  ])
  const [botIdx, setBotIdx] = useState(1)
  const [lang,   setLang]   = useState(0)

  const t   = (key) => TR[LANG_KEYS[lang]]?.[key] ?? TR.fr[key]
  const dir = t('dir')

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:'smooth', block:'start' })

  const sendMsg = () => {
    if (!chatInput.trim()) return
    const txt = chatInput
    setMessages(m => [...m, { from:'user', text:txt }])
    setTimeout(() => setMessages(m => [...m, { from:'bot', text:BOT_REPLIES[botIdx % BOT_REPLIES.length] }]), 700)
    setBotIdx(i => i + 1)
    setChatInput('')
  }

  const SERVICES = [
    { icon:SVC_ICONS[0], title:t('s1t'), desc:t('s1d') },
    { icon:SVC_ICONS[1], title:t('s2t'), desc:t('s2d') },
    { icon:SVC_ICONS[2], title:t('s3t'), desc:t('s3d') },
    { icon:SVC_ICONS[3], title:t('s4t'), desc:t('s4d') },
    { icon:SVC_ICONS[4], title:t('s5t'), desc:t('s5d') },
    { icon:SVC_ICONS[5], title:t('s6t'), desc:t('s6d') },
  ]

  return (
    <div style={{ minHeight:'100vh', background:'white' }} dir={dir}>

      {/* ── NAVBAR ── */}
      <nav className="aura-nav">
        <div className="aura-logo" onClick={() => scrollTo('hero')} style={{cursor:'pointer'}}>
          AURA<span className="aura-logo-sub">SOCIALS</span>
        </div>
        <div className="aura-nav-links">
          {[
            { label:t('navServices')||'Services', id:'services'    },
            { label:'AuraCRM',                    id:'crm-preview' },
            { label:t('navPricing')||'Tarifs',    id:'pricing'     },
            { label:t('navBlog')||'Blog',          id:'blog'        },
          ].map(({ label, id }) => (
            <button key={id} className="aura-nav-link" onClick={() => scrollTo(id)}>{label}</button>
          ))}
          <select value={lang} onChange={e => setLang(+e.target.value)} className="aura-lang-select">
            {LANGS.map((l,i) => <option key={i} value={i} style={{color:'#1B2A5A'}}>{l}</option>)}
          </select>
          <button onClick={() => nav('/login')}   className="aura-btn-ghost">{t('navLogin')}</button>
          <button onClick={() => nav('/payment')} className="aura-btn-nav">{t('navStart')}</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="aura-hero">
        <div className="aura-badge">
          <Zap size={13} style={{color:'#FBBF24'}}/> {t('badge')}
        </div>
        <h1 className="aura-hero-title">
          {t('h1a')} <strong>{t('h1b')}</strong><br/>{t('h1c')}
        </h1>
        <p className="aura-hero-sub">{t('sub')}</p>
        <div className="aura-hero-btns">
          <button onClick={() => nav('/payment')} className="aura-btn-primary">
            {t('cta1')} <ChevronRight size={17}/>
          </button>
          <button onClick={() => scrollTo('crm-preview')} className="aura-btn-outline">
            {t('cta2')}
          </button>
        </div>
        <div className="aura-stats">
          {[['500+',t('st1')],['12M',t('st2')],['50+',t('st3')],['98%',t('st4')]].map(([n,l]) => (
            <div key={l} style={{textAlign:'center'}}>
              <div className="aura-stat-num">{n}</div>
              <div className="aura-stat-label">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="aura-services">
        <div className="aura-container">
          <div style={{textAlign:'center',marginBottom:16}}>
            <span className="section-label">{t('svcLabel')}</span>
          </div>
          <h2 className="aura-section-title">{t('svcTitle')}</h2>
          <p className="aura-section-sub">{t('svcSub')}</p>
          <div className="aura-services-grid">
            {SERVICES.map(({ icon:Icon, title, desc }) => (
              <div key={title} className="aura-card">
                <div className="aura-icon-box"><Icon size={22}/></div>
                <h3 className="aura-card-title">{title}</h3>
                <p className="aura-card-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CRM PREVIEW ── */}
      <section id="crm-preview" className="aura-crm-section">
        <div className="aura-container">
          <div style={{textAlign:'center',marginBottom:16}}>
            <span className="section-label" style={{background:'rgba(74,108,247,0.15)',borderColor:'rgba(74,108,247,0.3)',color:'#93AEFF'}}>{t('crmLabel')}</span>
          </div>
          <h2 className="aura-section-title" style={{color:'white'}}>{t('crmTitle')}</h2>
          <p className="aura-section-sub" style={{color:'rgba(255,255,255,0.4)'}}>{t('crmSub')}</p>
          <div className="aura-crm-box">
            <div className="aura-crm-topbar">
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <span className="aura-crm-logo">AuraCRM</span>
                <span className="aura-crm-badge">IA Active</span>
              </div>
              <div className="aura-crm-nav">
                {['Dashboard','Clients','Publications','Analytics'].map(t2 => (
                  <span key={t2} className={`aura-crm-nav-item ${t2==='Dashboard'?'active':''}`}>{t2}</span>
                ))}
              </div>
            </div>
            <div className="aura-kpi-grid">
              {[['CLIENTS','48','↑ +3'],['POSTS','1 247','↑ +12%'],['IMPRESSIONS','2.4M','↑ +8%'],['TÂCHES IA','34','today']].map(([l,v,d]) => (
                <div key={l} className="aura-kpi">
                  <div className="aura-kpi-label">{l}</div>
                  <div className="aura-kpi-val">{v}</div>
                  <div className="aura-kpi-delta">{d}</div>
                </div>
              ))}
            </div>
            <div className="aura-crm-bottom">
              <div className="aura-crm-card">
                <div className="aura-crm-card-title">
                  <Brain size={14} style={{color:'#4A6CF7'}}/> IA — Suggestions
                </div>
                {[['#4A6CF7','LinkedIn carousel — Nike France — 5.2%'],['#34D399','12 Instagram comments to reply'],['#FBBF24','TikTok boost tonight 20h']].map(([c,tx]) => (
                  <div key={tx} className="aura-ai-row">
                    <div className="aura-ai-dot" style={{background:c}}/>
                    <span className="aura-ai-text">{tx}</span>
                  </div>
                ))}
                <button className="aura-ai-btn" onClick={() => nav('/payment')}>✦ {t('crmBtn')}</button>
              </div>
              <div className="aura-crm-card">
                <div className="aura-crm-card-title">
                  <Calendar size={14} style={{color:'#4A6CF7'}}/> Calendrier éditorial
                </div>
                <div className="aura-cal-days">
                  {['LUN','MAR','MER','JEU','VEN'].map(d => <div key={d} className="aura-cal-day">{d}</div>)}
                </div>
                <div className="aura-cal-grid">
                  {[{tx:'IG',c:'#E97729'},{tx:'',c:null},{tx:'LI',c:'#0A66C2'},{tx:'IG',c:'#E97729'},{tx:'LI',c:'#0A66C2'},{tx:'',c:null},{tx:'IG',c:'#E97729'},{tx:'',c:null},{tx:'FB',c:'#1877F2'},{tx:'TK',c:'#111'}].map((cell,i) => (
                    <div key={i} className="aura-cal-cell"
                      style={cell.c?{background:`${cell.c}25`,borderColor:`${cell.c}60`,color:cell.c}:{}}>
                      {cell.tx}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div style={{textAlign:'center',marginTop:40}}>
            <button onClick={() => nav('/payment')} className="aura-btn-primary" style={{fontSize:16,padding:'16px 42px'}}>
              {t('crmBtn')} <ChevronRight size={18}/>
            </button>
          </div>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section style={{background:'#4A6CF7',padding:'48px'}}>
        <div className="aura-container">
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:40,textAlign:'center'}}>
            {[['🌍','50+',t('st3')],['⚡','< 2s','Génération IA'],['🔒','99.9%','Uptime'],['🤖','Claude','Anthropic API']].map(([icon,val,desc]) => (
              <div key={val}>
                <div style={{fontSize:36,marginBottom:10}}>{icon}</div>
                <div style={{fontSize:24,fontWeight:800,color:'white',marginBottom:6}}>{val}</div>
                <div style={{fontSize:13,color:'rgba(255,255,255,0.65)',lineHeight:1.5}}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LANGUES ── */}
      <section style={{background:'#F8FAFF',padding:'72px 48px',textAlign:'center'}}>
        <div className="aura-container">
          <span className="section-label">🌍 Multilingue</span>
          <h2 className="aura-section-title" style={{marginTop:12}}>{t('langTitle')}</h2>
          <p className="aura-section-sub">{t('langSub')}</p>
          <div className="aura-lang-pills">
            {['🇫🇷 Français','🇬🇧 English','🇸🇦 العربية','🇪🇸 Español','🇩🇪 Deutsch','🇨🇳 中文','🇯🇵 日本語','🇧🇷 Português','🇮🇹 Italiano','🇷🇺 Русский','🇰🇷 한국어','🇹🇷 Türkçe','🇳🇱 Nederlands','+ 37 autres'].map(l => (
              <span key={l} className="aura-lang-pill">{l}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="aura-pricing">
        <div className="aura-container">
          <div style={{textAlign:'center',marginBottom:16}}>
            <span className="section-label">{t('pLabel')}</span>
          </div>
          <h2 className="aura-section-title">{t('pTitle')}</h2>
          <p className="aura-section-sub">{t('pSub')}</p>
          <div className="aura-pricing-grid">
            {PLANS.map(({ name, price, per, features, featured, badge }) => (
              <div key={name} className={`aura-price-card ${featured?'featured':''}`}>
                {featured && <div className="aura-popular-badge">★ POPULAIRE</div>}
                {badge && !featured && (
                  <div style={{position:'absolute',top:-12,left:'50%',transform:'translateX(-50%)',background:'linear-gradient(135deg,#1B2A5A,#2E3F7A)',color:'white',fontSize:11,fontWeight:700,padding:'4px 14px',borderRadius:99,whiteSpace:'nowrap'}}>
                    🏆 {badge}
                  </div>
                )}
                <div className="aura-plan-name">{name}</div>
                <div className="aura-plan-price">
                  {price}
                  <span className="aura-plan-per">{per}</span>
                </div>
                <div className="aura-plan-divider"/>
                {features.map(f => (
                  <div key={f} className="aura-plan-feature">
                    <span className="aura-check">✓</span> {f}
                  </div>
                ))}
                <button onClick={() => nav('/payment')} className={`aura-plan-btn ${featured?'primary':''}`}>
                  {t('pBtn')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      <section id="blog" className="aura-blog">
        <div className="aura-container">
          <div style={{textAlign:'center',marginBottom:16}}>
            <span className="section-label">{t('blogLabel')}</span>
          </div>
          <h2 className="aura-section-title">{t('blogTitle')}</h2>
          <p className="aura-section-sub">{t('blogSub')}</p>
          <div className="aura-blog-grid">
            {BLOG_POSTS.map(post => (
              <div key={post.slug} className="aura-blog-card"
                onClick={() => nav(`/blog/${post.slug}`)}>
                <div className="aura-blog-thumb" style={{background:post.bg}}>{post.emoji}</div>
                <div className="aura-blog-body">
                  <div className="aura-blog-tag">{post.tag}</div>
                  <div className="aura-blog-title">{post.title}</div>
                  <div className="aura-blog-desc">{post.desc}</div>
                  <div className="aura-blog-meta">
                    <User size={12}/> {post.author} &nbsp;·&nbsp;
                    <Clock size={12}/> {post.read} &nbsp;·&nbsp; {post.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:40}}>
            <button onClick={() => nav('/blog')}
              className="aura-btn-outline"
              style={{borderColor:'#CBD5E1',color:'#374151',padding:'13px 32px'}}>
              {t('blogMore')} <ArrowRight size={16} style={{display:'inline',marginLeft:6}}/>
            </button>
          </div>
        </div>
      </section>

      {/* ── PITCH ── */}
      <section className="aura-pitch">
        <div className="aura-pitch-grid">
          <div>
            <span className="section-label" style={{background:'rgba(74,108,247,0.15)',borderColor:'rgba(74,108,247,0.3)',color:'#93AEFF'}}>{t('pitchLabel')}</span>
            <h2 className="aura-pitch-title" style={{marginTop:16}}>{t('pitchTitle')}</h2>
            <p className="aura-pitch-desc">{t('pitchDesc')}</p>
            {[
              { icon:'🤖', title:'IA qui génère, vous validez',    desc:"Claude génère des posts optimisés pour chaque réseau. Vous les approuvez en un clic." },
              { icon:'📊', title:'Un dashboard, tous vos clients',  desc:'Gérez Instagram, LinkedIn, TikTok, Facebook et X de tous vos clients depuis une seule interface.' },
              { icon:'🌍', title:'Vendu dans 40+ pays',             desc:'Interface disponible en 50+ langues. AuraSocials est pensé pour scaler de Tunis à Paris, de Madrid à Tokyo.' },
            ].map(f => (
              <div key={f.title} className="aura-pitch-feat">
                <div className="aura-pitch-feat-icon">{f.icon}</div>
                <div>
                  <div className="aura-pitch-feat-title">{f.title}</div>
                  <div className="aura-pitch-feat-text">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:24,padding:32}}>
              <div style={{marginBottom:24,paddingBottom:20,borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                <div style={{fontSize:13,color:'rgba(255,255,255,0.4)',marginBottom:4}}>{t('before')}</div>
                <div style={{fontSize:15,color:'rgba(255,255,255,0.7)',marginBottom:12}}>{t('beforeSub')}</div>
                {t('beforeItems').map(tx => (
                  <div key={tx} style={{display:'flex',alignItems:'center',gap:10,marginBottom:8,fontSize:13,color:'#EF4444'}}>
                    <span>✗</span> {tx}
                  </div>
                ))}
              </div>
              <div>
                <div style={{fontSize:13,color:'#34D399',marginBottom:4}}>{t('after')}</div>
                <div style={{fontSize:15,color:'white',marginBottom:12}}>{t('afterSub')}</div>
                {t('afterItems').map(tx => (
                  <div key={tx} style={{display:'flex',alignItems:'center',gap:10,marginBottom:8,fontSize:13,color:'#34D399'}}>
                    <span>✓</span> {tx}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHIFFRES CLÉS ── */}
      <section className="aura-numbers">
        <div className="aura-container">
          <div style={{textAlign:'center',marginBottom:16}}>
            <span className="section-label">{t('numLabel')}</span>
          </div>
          <h2 className="aura-section-title">{t('numTitle')}</h2>
          <p className="aura-section-sub">{t('numSub')}</p>
          <div className="aura-numbers-grid">
            {[
              { val:t('numN1'), label:t('numL1'), desc:t('numD1'), emoji:'⏱️' },
              { val:t('numN2'), label:t('numL2'), desc:t('numD2'), emoji:'📈' },
              { val:t('numN3'), label:t('numL3'), desc:t('numD3'), emoji:'⭐' },
              { val:t('numN4'), label:t('numL4'), desc:t('numD4'), emoji:'🌍' },
            ].map(n => (
              <div key={n.label} className="aura-number-card">
                <div style={{fontSize:36,marginBottom:12}}>{n.emoji}</div>
                <div className="aura-number-val">{n.val}</div>
                <div className="aura-number-label">{n.label}</div>
                <div className="aura-number-desc">{n.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <section className="aura-testimonials">
        <div className="aura-container">
          <div style={{textAlign:'center',marginBottom:16}}>
            <span className="section-label">{t('testiLabel')}</span>
          </div>
          <h2 className="aura-section-title">{t('testiTitle')}</h2>
          <p className="aura-section-sub">{t('testiSub')}</p>
          <div className="aura-testi-grid">
            {[
              { text:'"AuraSocials a changé notre façon de travailler. On gère 3x plus de clients avec la même équipe. L\'IA génère des posts de qualité professionnelle en secondes."', name:'Sonia Ben Ali',   role:'CEO — Agence Digit, Tunis',         color:'#4A6CF7', initial:'S' },
              { text:'"Le seul CRM qui comprend vraiment les besoins d\'une agence social media. L\'interface multilingue nous permet de gérer des clients en France, Espagne et Italie depuis Tunis."', name:'Mehdi Rahoui',  role:'Directeur — MediaPro Agency, Sfax', color:'#059669', initial:'M' },
              { text:'"Le générateur IA est bluffant. En 30 secondes, on a un post Instagram parfait pour chaque client, adapté à son secteur."', name:'Laura Martinez', role:'Social Media Manager, Madrid',      color:'#F59E0B', initial:'L' },
            ].map(tx => (
              <div key={tx.name} className="aura-testi-card">
                <div className="aura-testi-stars">★★★★★</div>
                <div className="aura-testi-text">{tx.text}</div>
                <div className="aura-testi-author">
                  <div className="aura-testi-av" style={{background:tx.color}}>{tx.initial}</div>
                  <div>
                    <div className="aura-testi-name">{tx.name}</div>
                    <div className="aura-testi-role">{tx.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:48}}>
            <button onClick={() => nav('/payment')} className="aura-btn-primary" style={{fontSize:16,padding:'16px 48px'}}>
              {t('testiBtn')} <ChevronRight size={18}/>
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="aura-footer">
        <div className="aura-footer-grid">
          <div>
            <span className="aura-footer-logo">AURA<span style={{fontSize:9,letterSpacing:6,opacity:0.4,display:'block',marginTop:1}}>SOCIALS</span></span>
            <p className="aura-footer-desc">{t('footerDesc')}</p>
          </div>

          {/* Produit */}
          <div>
            <div className="aura-footer-heading">Produit</div>
            <button className="aura-footer-link" onClick={() => scrollTo('hero')}>Site web</button>
            <button className="aura-footer-link" onClick={() => nav('/login')}>AuraCRM</button>
            <button className="aura-footer-link" onClick={() => scrollTo('pricing')}>Tarifs</button>
            <button className="aura-footer-link" onClick={() => nav('/nouveautes')}>Nouveautés</button>
          </div>

          {/* Support */}
          <div>
            <div className="aura-footer-heading">Support</div>
            <button className="aura-footer-link" onClick={() => nav('/documentation')}>Documentation</button>
            <button className="aura-footer-link" onClick={() => nav('/contact')}>Contact</button>
            <button className="aura-footer-link" onClick={() => nav('/faq')}>FAQ</button>
            <button className="aura-footer-link" onClick={() => nav('/status')}>Status</button>
          </div>

          {/* Légal */}
          <div>
            <div className="aura-footer-heading">Légal</div>
            <button className="aura-footer-link" onClick={() => nav('/cgu')}>CGU</button>
            <button className="aura-footer-link" onClick={() => nav('/confidentialite')}>Confidentialité</button>
            <button className="aura-footer-link" onClick={() => nav('/cookies')}>Cookies</button>
            <button className="aura-footer-link" onClick={() => nav('/mentions-legales')}>Mentions légales</button>
          </div>
        </div>
        <div className="aura-footer-bottom">
          © 2026 AuraSocials &nbsp;·&nbsp; Développé par <strong style={{color:'rgba(255,255,255,0.45)'}}>Mohamed Ali Souissi</strong> &nbsp;·&nbsp; PTT Bachelor 3 Tech For Business &nbsp;·&nbsp; PSTB 2025/2026
        </div>
      </footer>

      {/* ── CHATBOT ── */}
      <div style={{position:'fixed',bottom:24,right:24,zIndex:999}}>
        {chatOpen && (
          <div className="aura-chat-panel">
            <div className="aura-chat-header">
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <div className="aura-chat-av"><Brain size={16}/></div>
                <div>
                  <div style={{color:'white',fontSize:13,fontWeight:600}}>{t('chatTitle')}</div>
                  <div style={{color:'rgba(255,255,255,0.45)',fontSize:11}}>{t('chatOnline')}</div>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} style={{background:'none',border:'none',color:'rgba(255,255,255,0.45)',cursor:'pointer',padding:4}}>
                <X size={17}/>
              </button>
            </div>
            <div className="aura-chat-msgs">
              {messages.map((m,i) => (
                <div key={i} className={m.from==='bot'?'aura-msg-bot':'aura-msg-user'}>{m.text}</div>
              ))}
            </div>
            <div className="aura-chat-bar">
              <input className="aura-chat-input" placeholder={t('chatPlaceholder')}
                value={chatInput} onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key==='Enter' && sendMsg()}/>
              <button className="aura-chat-send" onClick={sendMsg}><Send size={15}/></button>
            </div>
          </div>
        )}
        <button className="aura-chat-btn" onClick={() => setChatOpen(!chatOpen)}>
          <MessageSquare size={24}/>
        </button>
      </div>

    </div>
  )
}