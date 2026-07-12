import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

export default function Register() {
  const nav = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', company: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  const pwChecks = [
    { label: '8 caractères min.', ok: form.password.length >= 8 },
    { label: 'Une majuscule', ok: /[A-Z]/.test(form.password) },
    { label: 'Un chiffre', ok: /[0-9]/.test(form.password) },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      localStorage.setItem('aura_user', JSON.stringify({ email: form.email, name: form.name, company: form.company }))
      nav('/crm')
    }, 1000)
  }

  return (
    <div className="auth-page">
      <div className="auth-box" style={{ maxWidth: 480 }}>
        <div className="auth-logo" onClick={() => nav('/')}>
          AURA<span className="auth-logo-sub">SOCIALS</span>
        </div>
        <h1 className="auth-title">Créer votre compte</h1>
        <p className="auth-sub">Commencez gratuitement — aucune carte requise</p>
        <form onSubmit={handleSubmit}>
          <div className="auth-grid-2" style={{ marginBottom: 18 }}>
            <div>
              <label className="auth-label">Prénom & Nom</label>
              <input required className="auth-input" placeholder="Mohamed Ali"
                value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
            <div>
              <label className="auth-label">Entreprise</label>
              <input className="auth-input" placeholder="AuraSocials"
                value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
            </div>
          </div>
          <div className="auth-field">
            <label className="auth-label">Email professionnel</label>
            <input type="email" required className="auth-input" placeholder="votre@email.com"
              value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          </div>
          <div className="auth-field">
            <label className="auth-label">Mot de passe</label>
            <div className="auth-input-wrap">
              <input type={showPw ? 'text' : 'password'} required className="auth-input"
                style={{ paddingRight: 44 }} placeholder="Créez un mot de passe sécurisé"
                value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
              <button type="button" className="auth-eye" onClick={() => setShowPw(!showPw)}>
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {form.password && (
              <div className="pw-checks">
                {pwChecks.map(c => (
                  <span key={c.label} className="pw-check" style={{ color: c.ok ? '#059669' : '#9CA3AF' }}>
                    {c.ok ? '✓' : '○'} {c.label}
                  </span>
                ))}
              </div>
            )}
          </div>
          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? 'Création du compte...' : 'Créer mon compte gratuitement →'}
          </button>
        </form>
        <div className="auth-footer" style={{ marginTop: 16, fontSize: 12, color: '#9CA3AF' }}>
          En créant un compte, vous acceptez nos{' '}
          <span className="auth-link" style={{ fontSize: 12 }}>CGU</span> et notre{' '}
          <span className="auth-link" style={{ fontSize: 12 }}>Politique de confidentialité</span>
        </div>
        <div className="auth-footer">
          Déjà un compte ?{' '}
          <button onClick={() => nav('/login')} className="auth-link">Se connecter</button>
        </div>
      </div>
    </div>
  )
}