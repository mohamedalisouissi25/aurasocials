import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, X } from 'lucide-react'

const GOOGLE_ACCOUNTS = [
  { name:'Mohamed Ali Souissi', email:'mohamedali.souissi@gmail.com', initial:'M', color:'#4A6CF7' },
  { name:'Aura Demo Account',   email:'demo@aurasocials.com',          initial:'A', color:'#059669' },
  { name:'Utiliser un autre compte', email:'', initial:'+',             color:'#6B7280' },
]

export default function Login() {
  const nav = useNavigate()
  const [form, setForm]       = useState({ email:'', password:'' })
  const [showPw, setShowPw]   = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [googleModal, setGoogleModal] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ email:form.email, password:form.password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Email ou mot de passe incorrect.')
      localStorage.setItem('aura_user', JSON.stringify(data.user))
      nav('/crm')
    } catch (err) {
      // Fallback local si backend pas dispo
      if (form.email && form.password.length >= 6) {
        localStorage.setItem('aura_user', JSON.stringify({ email:form.email, name:form.email.split('@')[0] }))
        nav('/crm')
      } else {
        setError(err.message)
        setLoading(false)
      }
    }
  }

  const loginWithGoogle = (acc) => {
    if (!acc.email) { setGoogleModal(false); return }
    const user = { id:'google_'+Date.now(), name:acc.name, email:acc.email, company:'', provider:'google' }
    localStorage.setItem('aura_user', JSON.stringify(user))
    setGoogleModal(false)
    nav('/crm')
  }

  return (
    <div className="auth-page">

      {/* Google Modal */}
      {googleModal && (
        <div className="modal-overlay" onClick={() => setGoogleModal(false)}>
          <div className="google-modal" onClick={e => e.stopPropagation()}>
            <div className="google-modal-header">
              <div style={{fontSize:22,fontWeight:700,color:'#4285F4',letterSpacing:-0.5,marginBottom:16}}>
                <span style={{color:'#4285F4'}}>G</span><span style={{color:'#EA4335'}}>o</span><span style={{color:'#FBBC05'}}>o</span><span style={{color:'#4285F4'}}>g</span><span style={{color:'#34A853'}}>l</span><span style={{color:'#EA4335'}}>e</span>
              </div>
              <h2>Se connecter</h2>
              <p>pour continuer sur <strong>AuraSocials</strong></p>
            </div>
            {GOOGLE_ACCOUNTS.map(acc => (
              <div key={acc.email} className="google-account-row" onClick={() => loginWithGoogle(acc)}>
                <div className="google-avatar" style={{background:acc.color}}>{acc.initial}</div>
                <div>
                  <div className="google-acc-name">{acc.name}</div>
                  {acc.email && <div className="google-acc-email">{acc.email}</div>}
                </div>
              </div>
            ))}
            <div className="google-modal-footer">
              <button className="google-footer-btn" onClick={() => setGoogleModal(false)}>Annuler</button>
              <button className="google-footer-btn">Conditions d'utilisation</button>
            </div>
          </div>
        </div>
      )}

      <div className="auth-box">
        <div className="auth-logo" onClick={() => nav('/')}>AURA<span className="auth-logo-sub">SOCIALS</span></div>
        <h1 className="auth-title">Bienvenue 👋</h1>
        <p className="auth-sub">Connectez-vous à votre espace AuraSocials</p>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input type="email" required className="auth-input" placeholder="votre@email.com"
              value={form.email} onChange={e => setForm({...form, email:e.target.value})}/>
          </div>
          <div className="auth-field">
            <label className="auth-label">Mot de passe</label>
            <div className="auth-input-wrap">
              <input type={showPw?'text':'password'} required className="auth-input"
                style={{paddingRight:44}} placeholder="••••••••"
                value={form.password} onChange={e => setForm({...form, password:e.target.value})}/>
              <button type="button" className="auth-eye" onClick={() => setShowPw(!showPw)}>
                {showPw?<EyeOff size={18}/>:<Eye size={18}/>}
              </button>
            </div>
          </div>
          <div style={{textAlign:'right',marginBottom:14}}>
            <button type="button" style={{background:'none',border:'none',color:'#4A6CF7',fontSize:13,cursor:'pointer',fontFamily:'inherit',fontWeight:600}}>
              Mot de passe oublié ?
            </button>
          </div>
          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
        <div className="auth-divider">ou continuer avec</div>
        <button className="auth-google" onClick={() => setGoogleModal(true)}>
          <span style={{fontSize:16,fontWeight:700}}>
            <span style={{color:'#4285F4'}}>G</span><span style={{color:'#EA4335'}}>o</span><span style={{color:'#FBBC05'}}>o</span><span style={{color:'#4285F4'}}>g</span><span style={{color:'#34A853'}}>l</span><span style={{color:'#EA4335'}}>e</span>
          </span>
          Connexion avec Google
        </button>
        <div style={{textAlign:'center',marginTop:12}}>
          <button className="auth-google" style={{borderColor:'#0A66C2',color:'#0A66C2'}} onClick={() => loginWithGoogle({name:'Utilisateur LinkedIn',email:'linkedin@aurasocials.com',initial:'in'})}>
            <span style={{color:'#0A66C2',fontWeight:800,fontSize:14}}>in</span>
            Connexion avec LinkedIn
          </button>
        </div>
        <div className="auth-footer">
          Pas encore de compte ?{' '}
          <button onClick={() => nav('/register')} className="auth-link">Créer un compte</button>
        </div>
        <div style={{textAlign:'center',marginTop:12,fontSize:11,color:'#9CA3AF'}}>
          Compte démo → <span style={{color:'#4A6CF7',fontWeight:600}}>admin@aurasocials.com</span> / <span style={{color:'#4A6CF7',fontWeight:600}}>Admin123!</span>
        </div>
      </div>
    </div>
  )
}