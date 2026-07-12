import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from 'lucide-react'
import SimpleNav from '../components/SimpleNav'

export default function Contact() {
  const [form, setForm]     = useState({ name:'', email:'', company:'', subject:'', message:'' })
  const [sent, setSent]     = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1500)
  }

  const F = ({ label, required, children }) => (
    <div style={{marginBottom:14}}>
      <label style={{display:'block',fontSize:13,fontWeight:600,color:'#374151',marginBottom:6}}>
        {label}{required && ' *'}
      </label>
      {children}
    </div>
  )
  const input = {
    width:'100%', border:'1.5px solid #E5E7EB', borderRadius:10,
    padding:'11px 14px', fontSize:14, fontFamily:'inherit', outline:'none', color:'#111827',
  }

  return (
    <div style={{minHeight:'100vh', background:'#F8FAFF'}}>
      <SimpleNav/>

      {/* Hero */}
      <div style={{background:'linear-gradient(135deg,#1B2A5A,#2E3F7A)',padding:'60px 48px',textAlign:'center'}}>
        <div style={{fontSize:11,fontWeight:700,color:'#93AEFF',letterSpacing:2,textTransform:'uppercase',marginBottom:10}}>✉️ Contact</div>
        <h1 style={{fontSize:38,fontWeight:800,color:'white',marginBottom:10,letterSpacing:-1}}>Parlons de votre projet</h1>
        <p style={{fontSize:16,color:'rgba(255,255,255,0.5)',maxWidth:480,margin:'0 auto'}}>Notre équipe vous répond dans les 24 heures ouvrées.</p>
      </div>

      <div style={{maxWidth:1000,margin:'40px auto',padding:'0 48px 80px',display:'grid',gridTemplateColumns:'300px 1fr',gap:32}}>

        {/* Left */}
        <div>
          <div style={{background:'white',borderRadius:20,padding:28,border:'1px solid #F1F3F9',marginBottom:16}}>
            <h2 style={{fontSize:16,fontWeight:800,color:'#111827',marginBottom:20}}>Nos coordonnées</h2>
            {[
              {icon:Mail,    label:'Email',     val:'contact@aurasocials.com'},
              {icon:Phone,   label:'Téléphone', val:'+216 XX XXX XXX'},
              {icon:MapPin,  label:'Adresse',   val:'Tunis, Tunisie\nParis, France'},
              {icon:Clock,   label:'Horaires',  val:'Lun–Ven · 9h–18h'},
            ].map(({icon:Icon,label,val}) => (
              <div key={label} style={{display:'flex',alignItems:'flex-start',gap:12,marginBottom:18}}>
                <div style={{width:38,height:38,background:'#EEF1FB',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <Icon size={17} style={{color:'#4A6CF7'}}/>
                </div>
                <div>
                  <div style={{fontSize:11,color:'#9CA3AF',fontWeight:700,letterSpacing:0.5,marginBottom:2}}>{label.toUpperCase()}</div>
                  <div style={{fontSize:13,color:'#374151',fontWeight:500,whiteSpace:'pre-line'}}>{val}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{background:'linear-gradient(135deg,#1B2A5A,#4A6CF7)',borderRadius:20,padding:24}}>
            <MessageSquare size={24} style={{color:'rgba(255,255,255,0.6)',marginBottom:10}}/>
            <div style={{fontSize:15,fontWeight:700,color:'white',marginBottom:6}}>Chatbot IA disponible</div>
            <div style={{fontSize:13,color:'rgba(255,255,255,0.55)',marginBottom:14}}>Aura répond instantanément 24h/7j sur notre site.</div>
            <div style={{background:'rgba(255,255,255,0.1)',borderRadius:10,padding:'10px 14px',fontSize:12,color:'rgba(255,255,255,0.7)'}}>
              ⚡ Temps de réponse moyen : <strong style={{color:'white'}}>2 min</strong>
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <div style={{background:'white',borderRadius:20,padding:36,border:'1px solid #F1F3F9'}}>
          {sent ? (
            <div style={{textAlign:'center',padding:'48px 20px'}}>
              <div style={{fontSize:68,marginBottom:20}}>✅</div>
              <h2 style={{fontSize:22,fontWeight:800,color:'#111827',marginBottom:8}}>Message envoyé !</h2>
              <p style={{fontSize:14,color:'#6B7280',marginBottom:28,maxWidth:300,margin:'0 auto 28px'}}>
                Nous vous répondrons à <strong>{form.email}</strong> dans les 24 heures ouvrées.
              </p>
              <button onClick={() => { setSent(false); setForm({name:'',email:'',company:'',subject:'',message:''}) }}
                style={{background:'#4A6CF7',color:'white',border:'none',padding:'11px 24px',borderRadius:10,fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}>
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <>
              <h2 style={{fontSize:18,fontWeight:800,color:'#111827',marginBottom:24}}>Envoyer un message</h2>
              <form onSubmit={submit}>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
                  <F label="Prénom & Nom" required>
                    <input required style={input} placeholder="Mohamed Ali Souissi"
                      value={form.name} onChange={e => setForm({...form,name:e.target.value})}/>
                  </F>
                  <F label="Email" required>
                    <input required type="email" style={input} placeholder="votre@email.com"
                      value={form.email} onChange={e => setForm({...form,email:e.target.value})}/>
                  </F>
                </div>
                <F label="Entreprise">
                  <input style={input} placeholder="Votre agence ou entreprise"
                    value={form.company} onChange={e => setForm({...form,company:e.target.value})}/>
                </F>
                <F label="Sujet" required>
                  <select required style={{...input,background:'white'}}
                    value={form.subject} onChange={e => setForm({...form,subject:e.target.value})}>
                    <option value="">Choisissez un sujet...</option>
                    {['Demande de démo','Question sur les tarifs','Support technique','Partenariat commercial','Presse & Médias','Autre'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </F>
                <F label="Message" required>
                  <textarea required rows={5} style={{...input,resize:'none'}}
                    placeholder="Décrivez votre besoin en détail..."
                    value={form.message} onChange={e => setForm({...form,message:e.target.value})}/>
                </F>
                <button type="submit" disabled={loading}
                  style={{width:'100%',background:'#4A6CF7',color:'white',border:'none',padding:'13px',borderRadius:11,fontSize:15,fontWeight:700,cursor:'pointer',fontFamily:'inherit',display:'flex',alignItems:'center',justifyContent:'center',gap:8,boxShadow:'0 4px 16px rgba(74,108,247,0.4)',marginTop:4,opacity:loading?0.7:1}}>
                  {loading ? '⏳ Envoi en cours...' : <><Send size={16}/> Envoyer le message</>}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}