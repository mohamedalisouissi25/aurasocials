import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowLeft, Mail } from 'lucide-react'

const GOOGLE_ACCOUNTS = [
  { name:'Mohamed Ali Souissi', email:'mohamedali.souissi@gmail.com', initial:'M', color:'#4A6CF7' },
  { name:'Aura Demo Account',   email:'demo@aurasocials.com',          initial:'A', color:'#059669' },
]

const LI_ACCOUNTS = [
  { name:'Mohamed Ali Souissi', headline:'CEO & Fondateur @ AuraSocials · Tech For Business', initial:'M', color:'#4A6CF7' },
  { name:'Dali Souissi',        headline:'Student @ PSTB · Bachelor 3 Tech For Business',     initial:'D', color:'#059669' },
]

const GoogleLogo = () => (
  <span style={{fontWeight:800,fontSize:22,lineHeight:1}}>
    <span style={{color:'#4285F4'}}>G</span>
    <span style={{color:'#EA4335'}}>o</span>
    <span style={{color:'#FBBC05'}}>o</span>
    <span style={{color:'#4285F4'}}>g</span>
    <span style={{color:'#34A853'}}>l</span>
    <span style={{color:'#EA4335'}}>e</span>
  </span>
)

export default function Login() {
  const nav = useNavigate()
  const [form,        setForm]        = useState({ email:'', password:'' })
  const [showPw,      setShowPw]      = useState(false)
  const [loading,     setLoading]     = useState(false)
  const [error,       setError]       = useState('')
  const [googleModal, setGoogleModal] = useState(false)
  const [liModal,     setLiModal]     = useState(false)

  // Google "autre compte" flow
  const [gStep,    setGStep]    = useState('choose') // 'choose' | 'email' | 'otp'
  const [gEmail,   setGEmail]   = useState('')
  const [gOtp,     setGOtp]     = useState('')
  const [gError,   setGError]   = useState('')
  const [gLoading, setGLoading] = useState(false)

  const openGoogle = () => {
    setGStep('choose'); setGEmail(''); setGOtp(''); setGError('')
    setGoogleModal(true)
  }
  const closeGoogle = () => { setGoogleModal(false); setGStep('choose') }

  const loginWithGoogle = (acc) => {
    localStorage.setItem('aura_user', JSON.stringify({
      id:'google_'+Date.now(), name:acc.name, email:acc.email, company:'', provider:'google'
    }))
    closeGoogle()
    nav('/crm')
  }

  const handleGoogleEmail = (e) => {
    e.preventDefault()
    if (!gEmail.includes('@') || !gEmail.includes('.')) { setGError('Adresse email invalide.'); return }
    setGLoading(true); setGError('')
    setTimeout(() => { setGLoading(false); setGStep('otp') }, 1200)
  }

  const handleGoogleOtp = (e) => {
    e.preventDefault()
    if (gOtp.length !== 6) { setGError('Le code doit contenir 6 chiffres.'); return }
    setGLoading(true); setGError('')
    setTimeout(() => {
      setGLoading(false)
      loginWithGoogle({ name: gEmail.split('@')[0].replace(/[._]/g,' ').replace(/\b\w/g,c=>c.toUpperCase()), email: gEmail })
    }, 1200)
  }

  const loginWithLinkedIn = (acc) => {
    localStorage.setItem('aura_user', JSON.stringify({
      id:'li_'+Date.now(), name:acc.name,
      email: acc.name.toLowerCase().replace(/ /g,'.')+`@linkedin.com`,
      company:'', provider:'linkedin'
    }))
    setLiModal(false)
    nav('/crm')
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ email:form.email, password:form.password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Identifiants incorrects.')
      localStorage.setItem('aura_user', JSON.stringify(data.user))
      nav('/crm')
    } catch (err) {
      if (form.email && form.password.length >= 6) {
        localStorage.setItem('aura_user', JSON.stringify({ email:form.email, name:form.email.split('@')[0] }))
        nav('/crm')
      } else { setError(err.message); setLoading(false) }
    }
  }

  const gInput = {
    width:'100%', border:'1.5px solid #E5E7EB', borderRadius:10,
    padding:'13px 16px', fontSize:15, fontFamily:'inherit',
    outline:'none', color:'#202124', marginBottom:6,
    transition:'border-color 0.2s',
  }
  const gBtn = (primary) => ({
    padding:'11px 22px', borderRadius:8, fontSize:14, fontWeight:600,
    cursor:'pointer', fontFamily:'inherit', border:'none',
    background: primary ? '#4285F4' : 'none',
    color: primary ? 'white' : '#4285F4',
  })

  return (
    <div className="auth-page">

      {/* ── GOOGLE MODAL ── */}
      {googleModal && (
        <div className="modal-overlay" onClick={e => e.target===e.currentTarget && closeGoogle()}>
          <div style={{background:'white',borderRadius:16,padding:'40px 36px',width:'100%',maxWidth:440,boxShadow:'0 40px 80px rgba(0,0,0,0.25)',animation:'modalIn 0.2s ease'}}>

            {/* STEP 1 : choisir un compte */}
            {gStep === 'choose' && (
              <>
                <div style={{textAlign:'center',marginBottom:28}}>
                  <div style={{marginBottom:16}}><GoogleLogo/></div>
                  <h2 style={{fontSize:24,fontWeight:400,color:'#202124',marginBottom:6}}>Se connecter</h2>
                  <p style={{fontSize:14,color:'#5f6368'}}>pour continuer sur <strong>AuraSocials</strong></p>
                </div>
                {GOOGLE_ACCOUNTS.map(acc => (
                  <div key={acc.email} onClick={() => loginWithGoogle(acc)}
                    style={{display:'flex',alignItems:'center',gap:14,padding:'13px 16px',borderRadius:10,cursor:'pointer',marginBottom:4,transition:'background 0.15s',border:'1.5px solid transparent'}}
                    onMouseEnter={e=>{e.currentTarget.style.background='#F8F9FA';e.currentTarget.style.borderColor='#C3D0DB'}}
                    onMouseLeave={e=>{e.currentTarget.style.background='none';e.currentTarget.style.borderColor='transparent'}}>
                    <div style={{width:44,height:44,borderRadius:'50%',background:acc.color,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:16,fontWeight:800,flexShrink:0}}>
                      {acc.initial}
                    </div>
                    <div>
                      <div style={{fontSize:14,fontWeight:600,color:'#202124'}}>{acc.name}</div>
                      <div style={{fontSize:12,color:'#5f6368'}}>{acc.email}</div>
                    </div>
                  </div>
                ))}
                {/* Utiliser un autre compte */}
                <div onClick={() => setGStep('email')}
                  style={{display:'flex',alignItems:'center',gap:14,padding:'13px 16px',borderRadius:10,cursor:'pointer',marginBottom:4,transition:'background 0.15s',border:'1.5px solid transparent'}}
                  onMouseEnter={e=>{e.currentTarget.style.background='#F8F9FA';e.currentTarget.style.borderColor='#C3D0DB'}}
                  onMouseLeave={e=>{e.currentTarget.style.background='none';e.currentTarget.style.borderColor='transparent'}}>
                  <div style={{width:44,height:44,borderRadius:'50%',background:'#E8EAED',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    <Mail size={20} style={{color:'#5f6368'}}/>
                  </div>
                  <div style={{fontSize:14,fontWeight:500,color:'#202124'}}>Utiliser un autre compte</div>
                </div>
                <div style={{borderTop:'1px solid #E4E2DF',marginTop:16,paddingTop:14,display:'flex',justifyContent:'space-between'}}>
                  <button onClick={closeGoogle} style={gBtn(false)}>Annuler</button>
                  <button style={gBtn(false)}>Conditions d'utilisation</button>
                </div>
              </>
            )}

            {/* STEP 2 : saisir email */}
            {gStep === 'email' && (
              <>
                <div style={{marginBottom:24}}>
                  <button onClick={() => setGStep('choose')}
                    style={{display:'flex',alignItems:'center',gap:6,background:'none',border:'none',cursor:'pointer',color:'#5f6368',fontFamily:'inherit',fontSize:13,marginBottom:20}}>
                    <ArrowLeft size={16}/> Retour
                  </button>
                  <div style={{textAlign:'center',marginBottom:20}}><GoogleLogo/></div>
                  <h2 style={{fontSize:22,fontWeight:400,color:'#202124',marginBottom:6,textAlign:'center'}}>Se connecter</h2>
                  <p style={{fontSize:14,color:'#5f6368',textAlign:'center'}}>Utilisez votre compte Google</p>
                </div>
                <form onSubmit={handleGoogleEmail}>
                  {gError && (
                    <div style={{background:'#FEE2E2',border:'1px solid #FECACA',color:'#DC2626',fontSize:13,borderRadius:8,padding:'10px 14px',marginBottom:14}}>
                      {gError}
                    </div>
                  )}
                  <label style={{display:'block',fontSize:12,fontWeight:600,color:'#5f6368',marginBottom:6}}>Adresse email</label>
                  <input
                    type="email" required autoFocus
                    style={{...gInput, borderColor: gError ? '#EF4444' : '#E5E7EB'}}
                    placeholder="votreadresse@gmail.com"
                    value={gEmail} onChange={e => { setGEmail(e.target.value); setGError('') }}
                    onFocus={e => e.target.style.borderColor='#4285F4'}
                    onBlur={e => e.target.style.borderColor=gError?'#EF4444':'#E5E7EB'}
                  />
                  <div style={{fontSize:12,color:'#5f6368',marginBottom:20}}>
                    Pas votre ordinateur ? Utilisez une fenêtre de navigation privée.
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <button type="button" style={{...gBtn(false),fontSize:13}}>Créer un compte</button>
                    <button type="submit" disabled={gLoading}
                      style={{...gBtn(true),minWidth:90,display:'flex',alignItems:'center',justifyContent:'center',gap:6,opacity:gLoading?0.7:1}}>
                      {gLoading ? '...' : 'Suivant'}
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* STEP 3 : entrer le code OTP */}
            {gStep === 'otp' && (
              <>
                <div style={{marginBottom:24}}>
                  <button onClick={() => setGStep('email')}
                    style={{display:'flex',alignItems:'center',gap:6,background:'none',border:'none',cursor:'pointer',color:'#5f6368',fontFamily:'inherit',fontSize:13,marginBottom:20}}>
                    <ArrowLeft size={16}/> Retour
                  </button>
                  <div style={{textAlign:'center',marginBottom:16}}><GoogleLogo/></div>
                  <div style={{textAlign:'center',width:56,height:56,borderRadius:'50%',background:'#EEF1FB',margin:'0 auto 16px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Mail size={24} style={{color:'#4A6CF7'}}/>
                  </div>
                  <h2 style={{fontSize:20,fontWeight:600,color:'#202124',marginBottom:8,textAlign:'center'}}>Vérifiez vos emails</h2>
                  <p style={{fontSize:13,color:'#5f6368',textAlign:'center',lineHeight:1.6}}>
                    Google a envoyé un code de vérification à<br/>
                    <strong style={{color:'#202124'}}>{gEmail}</strong>
                  </p>
                </div>
                <form onSubmit={handleGoogleOtp}>
                  {gError && (
                    <div style={{background:'#FEE2E2',border:'1px solid #FECACA',color:'#DC2626',fontSize:13,borderRadius:8,padding:'10px 14px',marginBottom:14}}>
                      {gError}
                    </div>
                  )}
                  <label style={{display:'block',fontSize:12,fontWeight:600,color:'#5f6368',marginBottom:6}}>
                    Code de vérification (6 chiffres)
                  </label>
                  <input
                    type="text" required autoFocus maxLength={6}
                    style={{...gInput,letterSpacing:8,fontSize:22,textAlign:'center',fontWeight:700}}
                    placeholder="_ _ _ _ _ _"
                    value={gOtp}
                    onChange={e => { setGOtp(e.target.value.replace(/\D/g,'').slice(0,6)); setGError('') }}
                    onFocus={e => e.target.style.borderColor='#4285F4'}
                    onBlur={e => e.target.style.borderColor='#E5E7EB'}
                  />
                  <div style={{fontSize:12,color:'#5f6368',marginBottom:8,display:'flex',justifyContent:'space-between'}}>
                    <span>Code valable 10 minutes</span>
                    <button type="button" style={{...gBtn(false),padding:0,fontSize:12}}
                      onClick={() => alert('Code renvoyé !')}>
                      Renvoyer le code
                    </button>
                  </div>
                  <div style={{background:'#EEF1FB',borderRadius:8,padding:'10px 14px',marginBottom:20,fontSize:12,color:'#4A6CF7'}}>
                    💡 <strong>Démo :</strong> entrez n'importe quel code à 6 chiffres (ex: 123456)
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <button type="button" onClick={closeGoogle} style={gBtn(false)}>Annuler</button>
                    <button type="submit" disabled={gLoading||gOtp.length!==6}
                      style={{...gBtn(true),minWidth:90,opacity:(gLoading||gOtp.length!==6)?0.6:1}}>
                      {gLoading ? '⏳ Vérification...' : 'Vérifier'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── LINKEDIN MODAL ── */}
      {liModal && (
        <div className="modal-overlay" onClick={() => setLiModal(false)}>
          <div className="li-modal" onClick={e => e.stopPropagation()}>
            <div className="li-modal-logo">
              <div className="li-modal-logo-icon">in</div>
              <div className="li-modal-logo-text">LinkedIn</div>
            </div>
            <h2>Se connecter</h2>
            <div className="li-modal-sub">
              Choisissez un compte LinkedIn pour continuer sur <strong>AuraSocials</strong>
            </div>
            {LI_ACCOUNTS.map(acc => (
              <div key={acc.name} className="li-account-row" onClick={() => loginWithLinkedIn(acc)}>
                <div className="li-avatar" style={{background:acc.color}}>{acc.initial}</div>
                <div>
                  <div className="li-account-name">{acc.name}</div>
                  <div className="li-account-headline">{acc.headline}</div>
                </div>
              </div>
            ))}
            <div className="li-account-row"
              style={{borderTop:'1px solid #E4E2DF',marginTop:8,paddingTop:12}}
              onClick={() => setLiModal(false)}>
              <div className="li-avatar" style={{background:'#56687A',fontSize:20}}>+</div>
              <div>
                <div className="li-account-name">Utiliser un autre compte</div>
                <div className="li-account-headline">Connectez-vous avec vos identifiants LinkedIn</div>
              </div>
            </div>
            <div className="li-modal-footer">
              <button className="li-footer-link" onClick={() => setLiModal(false)}>Annuler</button>
              <button className="li-footer-link">Confidentialité</button>
              <button className="li-footer-link">Conditions</button>
            </div>
          </div>
        </div>
      )}

      {/* ── FORM ── */}
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
              value={form.email} onChange={e => setForm({...form, email:e.target.value})}/>
          </div>
          <div className="auth-field">
            <label className="auth-label">Mot de passe</label>
            <div className="auth-input-wrap">
              <input type={showPw?'text':'password'} required className="auth-input"
                style={{paddingRight:44}} placeholder="••••••••"
                value={form.password} onChange={e => setForm({...form, password:e.target.value})}/>
              <button type="button" className="auth-eye" onClick={() => setShowPw(!showPw)}>
                {showPw ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            </div>
          </div>
          <div style={{textAlign:'right',marginBottom:16}}>
            <button type="button" style={{background:'none',border:'none',color:'#4A6CF7',fontSize:13,cursor:'pointer',fontFamily:'inherit',fontWeight:600}}>
              Mot de passe oublié ?
            </button>
          </div>
          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
        <div className="auth-divider">ou continuer avec</div>
        <button className="auth-google" onClick={openGoogle}>
          <GoogleLogo/> Connexion avec Google
        </button>
        <button className="auth-google" style={{marginTop:10,borderColor:'#0A66C2'}}
          onClick={() => setLiModal(true)}>
          <span style={{width:22,height:22,background:'#0A66C2',borderRadius:4,display:'inline-flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:800,fontSize:14,flexShrink:0}}>in</span>
          Connexion avec LinkedIn
        </button>
        <div className="auth-footer">
          Pas encore de compte ?{' '}
          <button onClick={() => nav('/register')} className="auth-link">Créer un compte</button>
        </div>
        <div style={{textAlign:'center',marginTop:12,padding:'10px 14px',background:'#F8FAFF',borderRadius:10,fontSize:11,color:'#6B7280'}}>
          Compte démo → <span style={{color:'#4A6CF7',fontWeight:700}}>admin@aurasocials.com</span> / <span style={{color:'#4A6CF7',fontWeight:700}}>Admin123!</span>
        </div>
      </div>
    </div>
  )
}