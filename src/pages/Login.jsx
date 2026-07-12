import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const nav = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)
  setError('')
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email, password: form.password })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Erreur de connexion')
    localStorage.setItem('aura_user', JSON.stringify(data.user))
    nav('/crm')
  } catch (err) {
    setError(err.message)
    setLoading(false)
  }
}

  return (
    <div className="auth-page">
      <div className="auth-box">
        <div className="auth-logo" onClick={() => nav('/')}>
          AURA<span className="auth-logo-sub">SOCIALS</span>
        </div>
        <h1 className="auth-title">Bienvenue 👋</h1>
        <p className="auth-sub">Connectez-vous à votre espace AuraSocials</p>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input type="email" required className="auth-input" placeholder="votre@email.com"
              value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          </div>
          <div className="auth-field">
            <label className="auth-label">Mot de passe</label>
            <div className="auth-input-wrap">
              <input type={showPw ? 'text' : 'password'} required className="auth-input"
                style={{ paddingRight: 44 }} placeholder="••••••••"
                value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
              <button type="button" className="auth-eye" onClick={() => setShowPw(!showPw)}>
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>
        <div className="auth-divider">ou continuer avec</div>
        <button className="auth-google">
          <img src="https://www.google.com/favicon.ico" width={16} height={16} alt="G" />
          Connexion avec Google
        </button>
        <div className="auth-footer">
          Pas encore de compte ?{' '}
          <button onClick={() => nav('/register')} className="auth-link">Créer un compte</button>
        </div>
      </div>
    </div>
  )
}