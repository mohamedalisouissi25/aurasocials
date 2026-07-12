import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Brain, Calendar, BarChart3, MessageSquare, Globe, Shield,
  ChevronRight, Send, X, Zap, Users, TrendingUp
} from 'lucide-react'

const LANGS = ['🇫🇷 Français','🇬🇧 English','🇸🇦 العربية','🇪🇸 Español','🇩🇪 Deutsch','🇨🇳 中文','🇯🇵 日本語','🇧🇷 Português']

const SERVICES = [
  { icon: Brain,         title: 'IA Générative',       desc: 'Publications créées automatiquement, adaptées à votre secteur et à votre audience. Claude génère des posts optimisés en un clic.' },
  { icon: Calendar,      title: 'Calendrier éditorial', desc: 'Planifiez et programmez vos posts sur tous les réseaux depuis un seul dashboard. Drag & drop intuitif.' },
  { icon: BarChart3,     title: 'Analytics avancés',   desc: 'Suivez vos KPIs en temps réel : reach, engagement, impressions, croissance des abonnés.' },
  { icon: MessageSquare, title: 'Chatbot IA 24/7',     desc: 'Assistant intelligent disponible en permanence. Réponses instantanées et contextuelles pour vos clients.' },
  { icon: Globe,         title: '50+ Langues',         desc: 'Interface disponible dans toutes les langues du monde. Support RTL inclus. Vendez à l\'international.' },
  { icon: Shield,        title: 'Sécurité maximale',   desc: 'JWT, bcrypt, OAuth2, HTTPS, rate limiting. Vos données et celles de vos clients sont protégées.' },
]

const BOT_REPLIES = [
  'Bonjour ! 👋 Je suis Aura, votre assistante IA. Comment puis-je vous aider ?',
  'AuraCRM génère des publications pour tous vos clients en un seul clic grâce à l\'IA Claude d\'Anthropic.',
  'Nous supportons Instagram, LinkedIn, TikTok, Facebook et X — depuis un seul tableau de bord.',
  'Notre solution supporte 50+ langues et s\'adapte à tout secteur d\'activité.',
  'Souhaitez-vous une démo personnalisée ? Créez votre compte gratuitement !',
]

export default function Home() {
  const nav = useNavigate()
  const [chatOpen, setChatOpen] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Bonjour ! 👋 Je suis Aura, votre assistante IA. Comment puis-je vous aider aujourd\'hui ?' }
  ])
  const [botIdx, setBotIdx] = useState(1)
  const [lang, setLang] = useState(0)

  const sendMsg = () => {
    if (!chatInput.trim()) return
    setMessages(m => [...m, { from: 'user', text: chatInput }])
    const idx = botIdx
    setTimeout(() => setMessages(m => [...m, { from: 'bot', text: BOT_REPLIES[idx % BOT_REPLIES.length] }]), 700)
    setBotIdx(i => i + 1)
    setChatInput('')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>

      {/* ── NAVBAR ── */}
      <nav className="aura-nav">
        <div className="aura-logo" onClick={() => nav('/')}>
          AURA<span className="aura-logo-sub">SOCIALS</span>
        </div>
        <div className="aura-nav-links">
          {['Services', 'AuraCRM', 'Tarifs', 'Blog'].map(l => (
            <button key={l} className="aura-nav-link">{l}</button>
          ))}
          <select
            value={lang} onChange={e => setLang(+e.target.value)}
            className="aura-lang-select"
          >
            {LANGS.map((l, i) => <option key={i} value={i} style={{ color: '#1B2A5A' }}>{l}</option>)}
          </select>
          <button onClick={() => nav('/login')} className="aura-btn-ghost">Connexion</button>
          <button onClick={() => nav('/register')} className="aura-btn-nav">Démarrer →</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="aura-hero">
        <div className="aura-badge">
          <Zap size={13} style={{ color: '#FBBF24' }} />
          Agence Social Media propulsée par l'IA
        </div>
        <h1 className="aura-hero-title">
          Gérez vos <strong>réseaux sociaux</strong><br />à l'ère de l'IA
        </h1>
        <p className="aura-hero-sub">
          AuraSocials combine expertise humaine et intelligence artificielle pour booster la présence digitale de vos clients. Un seul outil pour tout piloter.
        </p>
        <div className="aura-hero-btns">
          <button onClick={() => nav('/register')} className="aura-btn-primary">
            Démarrer gratuitement <ChevronRight size={17} />
          </button>
          <button onClick={() => nav('/login')} className="aura-btn-outline">
            Voir la démo →
          </button>
        </div>
        <div className="aura-stats">
          {[['500+','Clients actifs'],['12M','Impressions / mois'],['50+','Langues supportées'],['98%','Taux satisfaction']].map(([n, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div className="aura-stat-num">{n}</div>
              <div className="aura-stat-label">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="aura-services">
        <div className="aura-container">
          <h2 className="aura-section-title">Nos services</h2>
          <p className="aura-section-sub">Tout ce dont vous avez besoin pour dominer les réseaux sociaux</p>
          <div className="aura-services-grid">
            {SERVICES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="aura-card">
                <div className="aura-icon-box">
                  <Icon size={22} />
                </div>
                <h3 className="aura-card-title">{title}</h3>
                <p className="aura-card-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CRM PREVIEW ── */}
      <section className="aura-crm-section">
        <div className="aura-container">
          <h2 className="aura-section-title" style={{ color: 'white' }}>AuraCRM — Aperçu</h2>
          <p className="aura-section-sub" style={{ color: 'rgba(255,255,255,0.4)' }}>Le CRM social media le plus avancé au monde</p>
          <div className="aura-crm-box">
            <div className="aura-crm-topbar">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="aura-crm-logo">AuraCRM</span>
                <span className="aura-crm-badge">IA Active</span>
              </div>
              <div className="aura-crm-nav">
                {['Dashboard', 'Clients', 'Publications', 'Analytics'].map(t => (
                  <span key={t} className={`aura-crm-nav-item ${t === 'Dashboard' ? 'active' : ''}`}>{t}</span>
                ))}
              </div>
            </div>
            <div className="aura-kpi-grid">
              {[
                ['CLIENTS', '48', '↑ +3 ce mois'],
                ['POSTS PUBLIÉS', '1 247', '↑ +12% vs mois dernier'],
                ['IMPRESSIONS', '2.4M', '↑ +8% cette semaine'],
                ['TÂCHES IA', '34', 'générées aujourd\'hui'],
              ].map(([l, v, d]) => (
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
                  <Brain size={14} style={{ color: '#4A6CF7' }} /> IA — Suggestions du jour
                </div>
                {[
                  ['#4A6CF7', 'Publier un carousel LinkedIn pour Nike France — Engagement prévu : 5.2%'],
                  ['#34D399', 'Répondre aux 12 commentaires Instagram de Zara Paris'],
                  ['#FBBF24', 'Boost Stories TikTok prévu ce soir à 20h — heure optimale'],
                ].map(([c, t]) => (
                  <div key={t} className="aura-ai-row">
                    <div className="aura-ai-dot" style={{ background: c }} />
                    <span className="aura-ai-text">{t}</span>
                  </div>
                ))}
                <button className="aura-ai-btn">✦ Générer un post maintenant</button>
              </div>
              <div className="aura-crm-card">
                <div className="aura-crm-card-title">
                  <Calendar size={14} style={{ color: '#4A6CF7' }} /> Calendrier éditorial
                </div>
                <div className="aura-cal-days">
                  {['LUN', 'MAR', 'MER', 'JEU', 'VEN'].map(d => (
                    <div key={d} className="aura-cal-day">{d}</div>
                  ))}
                </div>
                <div className="aura-cal-grid">
                  {[
                    { t: 'IG', c: '#E97729', tc: '#fff' }, { t: '', c: null }, { t: 'LI', c: '#0A66C2', tc: '#fff' },
                    { t: 'IG', c: '#E97729', tc: '#fff' }, { t: 'LI', c: '#0A66C2', tc: '#fff' },
                    { t: '', c: null }, { t: 'IG', c: '#E97729', tc: '#fff' }, { t: '', c: null },
                    { t: 'FB', c: '#1877F2', tc: '#fff' }, { t: 'TK', c: '#111', tc: '#fff' },
                  ].map((cell, i) => (
                    <div key={i} className="aura-cal-cell"
                      style={cell.c ? { background: `${cell.c}25`, borderColor: `${cell.c}60`, color: cell.c } : {}}>
                      {cell.t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LANGUES ── */}
      <section className="aura-lang-section">
        <div className="aura-container">
          <h2 className="aura-section-title">Disponible en 50+ langues</h2>
          <p className="aura-section-sub" style={{ marginBottom: 0 }}>Un outil pensé pour les startups mondiales</p>
          <div className="aura-lang-pills">
            {['🇫🇷 Français','🇬🇧 English','🇸🇦 العربية','🇪🇸 Español','🇩🇪 Deutsch','🇨🇳 中文','🇯🇵 日本語','🇧🇷 Português','🇮🇹 Italiano','🇷🇺 Русский','🇰🇷 한국어','🇹🇷 Türkçe','🇳🇱 Nederlands','+ 37 autres langues'].map(l => (
              <span key={l} className="aura-lang-pill">{l}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="aura-pricing">
        <div className="aura-container">
          <h2 className="aura-section-title">Tarifs transparents</h2>
          <p className="aura-section-sub">Adaptés à chaque taille d'entreprise — aucune surprise</p>
          <div className="aura-pricing-grid">
            {[
              { name: 'STARTER', price: '49€', per: '/mois', features: ['5 clients', '3 réseaux sociaux', '50 posts / mois', 'Analytics basiques', 'Chatbot IA'], featured: false },
              { name: 'AGENCY', price: '149€', per: '/mois', features: ['25 clients', 'Tous les réseaux', 'Posts illimités', 'IA générative complète', 'Analytics avancés', 'Support prioritaire'], featured: true },
              { name: 'ENTERPRISE', price: 'Sur devis', per: '', features: ['Clients illimités', 'IA personnalisée', 'API privée', 'Support dédié 24/7', 'Onboarding sur mesure'], featured: false },
            ].map(({ name, price, per, features, featured }) => (
              <div key={name} className={`aura-price-card ${featured ? 'featured' : ''}`}>
                {featured && <div className="aura-popular-badge">★ POPULAIRE</div>}
                <div className="aura-plan-name">{name}</div>
                <div className="aura-plan-price">{price}<span className="aura-plan-per">{per}</span></div>
                <div className="aura-plan-divider" />
                {features.map(f => (
                  <div key={f} className="aura-plan-feature">
                    <span className="aura-check">✓</span> {f}
                  </div>
                ))}
                <button
                  onClick={() => nav('/register')}
                  className={`aura-plan-btn ${featured ? 'primary' : ''}`}>
                  Commencer maintenant
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="aura-footer">
        <div className="aura-footer-grid">
          <div>
            <span className="aura-footer-logo">AURA<span style={{ fontSize: 9, letterSpacing: 6, opacity: 0.4, display: 'block', marginTop: 1 }}>SOCIALS</span></span>
            <p className="aura-footer-desc">L'agence social media nouvelle génération, propulsée par l'intelligence artificielle.</p>
          </div>
          {[
            ['Produit', ['Site web', 'AuraCRM', 'Tarifs', 'Nouveautés']],
            ['Support', ['Documentation', 'Contact', 'FAQ', 'Status']],
            ['Légal', ['CGU', 'Confidentialité', 'Cookies', 'Mentions légales']],
          ].map(([title, links]) => (
            <div key={title}>
              <div className="aura-footer-heading">{title}</div>
              {links.map(l => <button key={l} className="aura-footer-link">{l}</button>)}
            </div>
          ))}
        </div>
        <div className="aura-footer-bottom">
          © 2026 AuraSocials · Développé par <strong style={{ color: 'rgba(255,255,255,0.4)' }}>Mohamed Ali Souissi</strong> · PTT Bachelor 3 Tech For Business · PSTB 2025/2026
        </div>
      </footer>

      {/* ── CHATBOT ── */}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 999 }}>
        {chatOpen && (
          <div className="aura-chat-panel">
            <div className="aura-chat-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="aura-chat-av"><Brain size={16} /></div>
                <div>
                  <div style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>Aura Assistant</div>
                  <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11 }}>● En ligne — IA Claude</div>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.45)', cursor: 'pointer', padding: 4 }}>
                <X size={17} />
              </button>
            </div>
            <div className="aura-chat-msgs">
              {messages.map((m, i) => (
                <div key={i} className={m.from === 'bot' ? 'aura-msg-bot' : 'aura-msg-user'}>{m.text}</div>
              ))}
            </div>
            <div className="aura-chat-bar">
              <input
                className="aura-chat-input"
                placeholder="Écrivez un message..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMsg()}
              />
              <button className="aura-chat-send" onClick={sendMsg}><Send size={15} /></button>
            </div>
          </div>
        )}
        <button className="aura-chat-btn" onClick={() => setChatOpen(!chatOpen)}>
          <MessageSquare size={24} />
        </button>
      </div>

    </div>
  )
}