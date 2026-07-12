import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Brain, Calendar, BarChart3, MessageSquare, Globe, Shield,
  ChevronRight, Send, X, Zap, TrendingUp, ArrowRight, Clock, User
} from 'lucide-react'

const LANGS = ['🇫🇷 Français','🇬🇧 English','🇸🇦 العربية','🇪🇸 Español','🇩🇪 Deutsch','🇨🇳 中文','🇯🇵 日本語','🇧🇷 Português']

const SERVICES = [
  { icon: Brain,         title:'IA Générative',        desc:'Publications créées automatiquement, adaptées à votre secteur. Claude génère des posts optimisés pour chaque réseau en un clic.' },
  { icon: Calendar,      title:'Calendrier éditorial',  desc:'Planifiez et programmez vos posts sur tous les réseaux depuis un seul dashboard. Drag & drop natif, vue mensuelle.' },
  { icon: BarChart3,     title:'Analytics avancés',    desc:'Suivez vos KPIs en temps réel : reach, engagement, impressions, croissance. Tableaux de bord par client et par réseau.' },
  { icon: MessageSquare, title:'Chatbot IA 24/7',       desc:'Assistant intelligent disponible en permanence. Réponses instantanées et contextuelles pour tous vos clients.' },
  { icon: Globe,         title:'50+ Langues',           desc:'Interface disponible dans toutes les langues du monde, RTL inclus. Vendez votre solution à des startups mondiales.' },
  { icon: Shield,        title:'Sécurité maximale',    desc:'JWT + bcrypt + OAuth2 + HTTPS + rate limiting. Toutes les données sont chiffrées et protégées à chaque niveau.' },
]

const BOT_REPLIES = [
  "Bonjour ! 👋 Je suis Aura, votre assistante IA. Comment puis-je vous aider ?",
  "AuraCRM génère des publications pour tous vos clients en un clic via l'IA Claude d'Anthropic.",
  "Nous supportons Instagram, LinkedIn, TikTok, Facebook et X depuis un seul tableau de bord.",
  "La solution supporte 50+ langues et s'adapte à tout secteur d'activité.",
  "Souhaitez-vous une démo ? Créez votre compte gratuitement — aucune carte requise.",
]

const BLOG_POSTS = [
  {
    emoji: '🤖', tag: 'Intelligence Artificielle',
    title: "Comment l'IA transforme le social media en 2026",
    desc: "Les agences qui utilisent l'IA génèrent 3x plus de contenu et réduisent leur temps de production de 70%. On vous explique comment.",
    author: 'Mohamed Ali Souissi', date: '10 juin 2026', read: '5 min',
    bg: 'linear-gradient(135deg,#EEF1FB,#C7D4FB)',
  },
  {
    emoji: '📊', tag: 'Analytics & KPIs',
    title: "Les 5 métriques clés à suivre pour vos clients en 2026",
    desc: "Reach, engagement, taux de conversion, sentiment score et ROI social — les 5 KPIs que tout community manager doit maîtriser.",
    author: 'Mohamed Ali Souissi', date: '5 juin 2026', read: '7 min',
    bg: 'linear-gradient(135deg,#FEF3C7,#FDE68A)',
  },
  {
    emoji: '🌍', tag: 'Stratégie digitale',
    title: "Guide complet : Instagram, LinkedIn, TikTok en 2026",
    desc: "Chaque réseau a ses propres codes. Ce guide vous donne les meilleures pratiques par plateforme pour maximiser l'engagement.",
    author: 'Mohamed Ali Souissi', date: '1 juin 2026', read: '9 min',
    bg: 'linear-gradient(135deg,#D1FAE5,#A7F3D0)',
  },
]

export default function Home() {
  const nav = useNavigate()
  const [chatOpen, setChatOpen] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState([
    { from:'bot', text:"Bonjour ! 👋 Je suis Aura, votre assistante IA. Comment puis-je vous aider aujourd'hui ?" }
  ])
  const [botIdx, setBotIdx] = useState(1)
  const [lang, setLang] = useState(0)

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:'smooth', block:'start' })

  const sendMsg = () => {
    if (!chatInput.trim()) return
    const txt = chatInput
    setMessages(m => [...m, { from:'user', text:txt }])
    setTimeout(() => setMessages(m => [...m, { from:'bot', text:BOT_REPLIES[botIdx % BOT_REPLIES.length] }]), 700)
    setBotIdx(i => i+1)
    setChatInput('')
  }

  return (
    <div style={{ minHeight:'100vh', background:'white' }}>

      {/* ── NAVBAR ── */}
      <nav className="aura-nav">
        <div className="aura-logo" onClick={() => scrollTo('hero')} style={{cursor:'pointer'}}>
          AURA<span className="aura-logo-sub">SOCIALS</span>
        </div>
        <div className="aura-nav-links">
          {[
            { label:'Services',  id:'services'    },
            { label:'AuraCRM',   id:'crm-preview' },
            { label:'Tarifs',    id:'pricing'     },
            { label:'Blog',      id:'blog'        },
          ].map(({ label, id }) => (
            <button key={label} className="aura-nav-link" onClick={() => scrollTo(id)}>{label}</button>
          ))}
          <select value={lang} onChange={e => setLang(+e.target.value)} className="aura-lang-select">
            {LANGS.map((l,i) => <option key={i} value={i} style={{color:'#1B2A5A'}}>{l}</option>)}
          </select>
          <button onClick={() => nav('/login')}    className="aura-btn-ghost">Connexion</button>
          <button onClick={() => nav('/register')} className="aura-btn-nav">Démarrer →</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="aura-hero">
        <div className="aura-badge">
          <Zap size={13} style={{color:'#FBBF24'}}/> Agence Social Media propulsée par l'IA
        </div>
        <h1 className="aura-hero-title">
          Gérez vos <strong>réseaux sociaux</strong><br/>à l'ère de l'IA
        </h1>
        <p className="aura-hero-sub">
          AuraSocials combine expertise humaine et intelligence artificielle pour booster la présence digitale de vos clients. Un seul outil pour tout piloter.
        </p>
        <div className="aura-hero-btns">
          <button onClick={() => nav('/register')} className="aura-btn-primary">
            Démarrer gratuitement <ChevronRight size={17}/>
          </button>
          <button onClick={() => scrollTo('crm-preview')} className="aura-btn-outline">
            Voir la démo →
          </button>
        </div>
        <div className="aura-stats">
          {[['500+','Clients actifs'],['12M','Impressions / mois'],['50+','Langues supportées'],['98%','Taux satisfaction']].map(([n,l]) => (
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
            <span className="section-label">✦ Nos services</span>
          </div>
          <h2 className="aura-section-title">Tout pour dominer les réseaux sociaux</h2>
          <p className="aura-section-sub">Six modules pensés pour les agences qui veulent aller vite, bien, et à grande échelle.</p>
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
            <span className="section-label" style={{background:'rgba(74,108,247,0.15)',borderColor:'rgba(74,108,247,0.3)',color:'#93AEFF'}}>✦ AuraCRM</span>
          </div>
          <h2 className="aura-section-title" style={{color:'white'}}>Le CRM social media le plus avancé</h2>
          <p className="aura-section-sub" style={{color:'rgba(255,255,255,0.4)'}}>Conçu pour les agences. Propulsé par l'IA. Unique au monde.</p>
          <div className="aura-crm-box">
            <div className="aura-crm-topbar">
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <span className="aura-crm-logo">AuraCRM</span>
                <span className="aura-crm-badge">IA Active</span>
              </div>
              <div className="aura-crm-nav">
                {['Dashboard','Clients','Publications','Analytics'].map(t => (
                  <span key={t} className={`aura-crm-nav-item ${t==='Dashboard'?'active':''}`}>{t}</span>
                ))}
              </div>
            </div>
            <div className="aura-kpi-grid">
              {[['CLIENTS','48','↑ +3 ce mois'],['POSTS PUBLIÉS','1 247','↑ +12% vs mois dernier'],['IMPRESSIONS','2.4M','↑ +8% cette semaine'],['TÂCHES IA','34',"générées aujourd'hui"]].map(([l,v,d]) => (
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
                  <Brain size={14} style={{color:'#4A6CF7'}}/> IA — Suggestions du jour
                </div>
                {[['#4A6CF7',"Publier un carousel LinkedIn pour Nike France — Engagement prévu : 5.2%"],['#34D399',"Répondre aux 12 commentaires Instagram de Zara Paris"],['#FBBF24',"Boost Stories TikTok ce soir à 20h — heure de pic"]].map(([c,t]) => (
                  <div key={t} className="aura-ai-row">
                    <div className="aura-ai-dot" style={{background:c}}/>
                    <span className="aura-ai-text">{t}</span>
                  </div>
                ))}
                <button className="aura-ai-btn" onClick={() => nav('/register')}>✦ Essayer AuraCRM gratuitement</button>
              </div>
              <div className="aura-crm-card">
                <div className="aura-crm-card-title">
                  <Calendar size={14} style={{color:'#4A6CF7'}}/> Calendrier éditorial
                </div>
                <div className="aura-cal-days">
                  {['LUN','MAR','MER','JEU','VEN'].map(d => <div key={d} className="aura-cal-day">{d}</div>)}
                </div>
                <div className="aura-cal-grid">
                  {[{t:'IG',c:'#E97729'},{t:'',c:null},{t:'LI',c:'#0A66C2'},{t:'IG',c:'#E97729'},{t:'LI',c:'#0A66C2'},{t:'',c:null},{t:'IG',c:'#E97729'},{t:'',c:null},{t:'FB',c:'#1877F2'},{t:'TK',c:'#111'}].map((cell,i) => (
                    <div key={i} className="aura-cal-cell"
                      style={cell.c ? {background:`${cell.c}25`,borderColor:`${cell.c}60`,color:cell.c} : {}}>
                      {cell.t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div style={{textAlign:'center',marginTop:40}}>
            <button onClick={() => nav('/register')} className="aura-btn-primary" style={{fontSize:16,padding:'16px 42px'}}>
              Accéder à AuraCRM gratuitement <ChevronRight size={18}/>
            </button>
          </div>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section style={{background:'#4A6CF7',padding:'48px'}}>
        <div className="aura-container">
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:40,textAlign:'center'}}>
            {[['🌍','50+ langues','Interface disponible mondialement, RTL inclus'],['⚡','< 2 secondes','Temps de génération IA moyen'],['🔒','99.9% uptime','Disponibilité garantie en production'],['🤖','API Claude','Intelligence artificielle de pointe d\'Anthropic']].map(([icon,title,desc]) => (
              <div key={title}>
                <div style={{fontSize:36,marginBottom:10}}>{icon}</div>
                <div style={{fontSize:24,fontWeight:800,color:'white',marginBottom:6}}>{title}</div>
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
          <h2 className="aura-section-title" style={{marginTop:12}}>Disponible en 50+ langues</h2>
          <p className="aura-section-sub">Un outil pensé pour les startups mondiales — vendu dans 40+ pays.</p>
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
            <span className="section-label">💳 Tarifs</span>
          </div>
          <h2 className="aura-section-title">Des tarifs clairs, sans surprise</h2>
          <p className="aura-section-sub">Adaptés à chaque taille d'agence — de la startup à l'enterprise.</p>
          <div className="aura-pricing-grid">
            {[
              {name:'STARTER',price:'49€',per:'/mois',features:['5 clients','3 réseaux sociaux','50 posts / mois','Analytics basiques','Chatbot IA','Support email'],featured:false},
              {name:'AGENCY',price:'149€',per:'/mois',features:['25 clients','Tous les réseaux','Posts illimités','IA générative complète','Analytics avancés','Calendrier éditorial','Support prioritaire'],featured:true},
              {name:'ENTERPRISE',price:'Sur devis',per:'',features:['Clients illimités','IA personnalisée','API privée dédiée','Support 24/7 dédié','Onboarding sur mesure','SLA garanti'],featured:false},
            ].map(({ name, price, per, features, featured }) => (
              <div key={name} className={`aura-price-card ${featured?'featured':''}`}>
                {featured && <div className="aura-popular-badge">★ POPULAIRE</div>}
                <div className="aura-plan-name">{name}</div>
                <div className="aura-plan-price">{price}<span className="aura-plan-per">{per}</span></div>
                <div className="aura-plan-divider"/>
                {features.map(f => <div key={f} className="aura-plan-feature"><span className="aura-check">✓</span> {f}</div>)}
                <button onClick={() => nav('/register')} className={`aura-plan-btn ${featured?'primary':''}`}>
                  Commencer maintenant
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
            <span className="section-label">📝 Blog</span>
          </div>
          <h2 className="aura-section-title">Ressources & Actualités</h2>
          <p className="aura-section-sub">Stratégies, analyses et guides pratiques pour dominer le social media.</p>
          <div className="aura-blog-grid">
            {BLOG_POSTS.map(post => (
              <div key={post.title} className="aura-blog-card" onClick={() => nav('/register')}>
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
            <button onClick={() => nav('/register')} className="aura-btn-outline" style={{borderColor:'#CBD5E1',color:'#374151',padding:'13px 32px'}}>
              Voir tous les articles <ArrowRight size={16} style={{display:'inline',marginLeft:6}}/>
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="aura-footer">
        <div className="aura-footer-grid">
          <div>
            <span className="aura-footer-logo">AURA<span style={{fontSize:9,letterSpacing:6,opacity:0.4,display:'block',marginTop:1}}>SOCIALS</span></span>
            <p className="aura-footer-desc">L'agence social media nouvelle génération, propulsée par l'intelligence artificielle Claude d'Anthropic.</p>
          </div>
          {[['Produit',['Site web','AuraCRM','Tarifs','Nouveautés','Roadmap']],['Support',['Documentation','Contact','FAQ','Status']],['Légal',['CGU','Confidentialité','Cookies','Mentions légales']]].map(([title,links]) => (
            <div key={title}>
              <div className="aura-footer-heading">{title}</div>
              {links.map(l => <button key={l} className="aura-footer-link" onClick={() => scrollTo('hero')}>{l}</button>)}
            </div>
          ))}
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
                  <div style={{color:'white',fontSize:13,fontWeight:600}}>Aura Assistant</div>
                  <div style={{color:'rgba(255,255,255,0.45)',fontSize:11}}>● En ligne — IA Claude</div>
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
              <input className="aura-chat-input" placeholder="Écrivez un message..."
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