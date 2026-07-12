import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Check, Lock, CreditCard, ArrowLeft } from 'lucide-react'

const PLANS = [
  { id:'starter', name:'STARTER', price:49, features:['5 clients','3 réseaux','50 posts/mois','Chatbot IA'] },
  { id:'agency',  name:'AGENCY',  price:149, features:['25 clients','Tous les réseaux','Posts illimités','IA générative','Support prioritaire'], popular:true },
  { id:'enterprise', name:'ENTERPRISE', price:499, features:['Illimité','IA personnalisée','API privée','Support 24/7','Onboarding dédié'] },
]

export default function Payment() {
  const nav = useNavigate()
  const [selected, setSelected] = useState('agency')
  const [step, setStep]         = useState(1) // 1=plan, 2=paiement, 3=succès
  const [loading, setLoading]   = useState(false)
  const [card, setCard]         = useState({ number:'', name:'', expiry:'', cvv:'' })

  const plan = PLANS.find(p => p.id === selected)

  const formatCard = (val) => val.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim().slice(0,19)
  const formatExpiry = (val) => val.replace(/\D/g,'').replace(/^(.{2})/, '$1/').slice(0,5)

  const pay = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); setStep(3) }, 2000)
  }

  if (step === 3) return (
    <div className="pay-page">
      <div style={{maxWidth:480,margin:'0 auto',background:'white',borderRadius:24,padding:60,textAlign:'center',boxShadow:'0 20px 60px rgba(0,0,0,0.1)'}}>
        <div style={{fontSize:80,marginBottom:24}}>🎉</div>
        <h2 style={{fontSize:28,fontWeight:800,color:'#111827',marginBottom:10}}>Paiement réussi !</h2>
        <p style={{fontSize:15,color:'#6B7280',marginBottom:8}}>
          Bienvenue dans le plan <strong style={{color:'#4A6CF7'}}>{plan.name}</strong> — {plan.price}€/mois
        </p>
        <p style={{fontSize:13,color:'#9CA3AF',marginBottom:36}}>Un email de confirmation a été envoyé. Votre abonnement est actif immédiatement.</p>
        <div style={{background:'#F8FAFF',borderRadius:16,padding:20,marginBottom:32}}>
          {plan.features.map(f => (
            <div key={f} style={{display:'flex',alignItems:'center',gap:10,marginBottom:8,fontSize:14,color:'#374151'}}>
              <Check size={16} style={{color:'#059669'}}/> {f}
            </div>
          ))}
        </div>
        <button className="auth-btn" style={{marginTop:0}} onClick={() => nav('/crm')}>
          Accéder à AuraCRM →
        </button>
      </div>
    </div>
  )

  return (
    <div className="pay-page">
      <div className="pay-container">
        <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:40}}>
          <button onClick={() => step===1?nav('/'):setStep(1)} style={{background:'none',border:'1.5px solid #E5E7EB',borderRadius:10,padding:'8px 12px',cursor:'pointer',color:'#374151',display:'flex',alignItems:'center',gap:6,fontSize:13,fontWeight:600,fontFamily:'inherit'}}>
            <ArrowLeft size={15}/> Retour
          </button>
          <div>
            <h1 style={{fontSize:24,fontWeight:800,color:'#111827'}}>
              {step===1 ? 'Choisissez votre plan' : 'Finaliser le paiement'}
            </h1>
            <p style={{fontSize:14,color:'#9CA3AF',marginTop:2}}>
              Étape {step} sur 2 · {step===1?'Sélection du plan':'Informations de paiement'}
            </p>
          </div>
        </div>

        {step === 1 && (
          <>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20,marginBottom:32}}>
              {PLANS.map(p => (
                <div key={p.id} className={`pay-plan-card ${selected===p.id?'selected':''}`}
                  onClick={() => setSelected(p.id)} style={{position:'relative'}}>
                  {p.popular && <div style={{position:'absolute',top:-12,left:'50%',transform:'translateX(-50%)',background:'#4A6CF7',color:'white',fontSize:11,fontWeight:700,padding:'4px 14px',borderRadius:99,whiteSpace:'nowrap'}}>★ POPULAIRE</div>}
                  <div className="pay-plan-name">{p.name}</div>
                  <div className="pay-plan-price">{p.price}€<span style={{fontSize:14,fontWeight:400,color:'#9CA3AF'}}>/mois</span></div>
                  <div style={{height:1,background:'#F3F4F6',margin:'16px 0'}}/>
                  {p.features.map(f=>(
                    <div key={f} style={{display:'flex',alignItems:'center',gap:8,fontSize:13,color:'#374151',marginBottom:8}}>
                      <Check size={14} style={{color:'#4A6CF7',flexShrink:0}}/> {f}
                    </div>
                  ))}
                  <div style={{marginTop:16,width:'100%',padding:'10px',textAlign:'center',borderRadius:10,background:selected===p.id?'#4A6CF7':'#F8FAFF',color:selected===p.id?'white':'#374151',fontWeight:600,fontSize:13}}>
                    {selected===p.id?'✓ Sélectionné':'Choisir'}
                  </div>
                </div>
              ))}
            </div>
            <div style={{textAlign:'center'}}>
              <button className="auth-btn" style={{maxWidth:400,margin:'0 auto'}} onClick={() => setStep(2)}>
                Continuer avec {plan.name} — {plan.price}€/mois →
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:40,alignItems:'start'}}>
            {/* Formulaire */}
            <div>
              <div className="pay-form-box">
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:24}}>
                  <CreditCard size={20} style={{color:'#4A6CF7'}}/>
                  <h2 style={{fontSize:17,fontWeight:700,color:'#111827'}}>Informations de paiement</h2>
                </div>
                <label style={{display:'block',fontSize:13,fontWeight:600,color:'#374151',marginBottom:6}}>Numéro de carte</label>
                <input className="pay-input" placeholder="4242 4242 4242 4242"
                  value={card.number} onChange={e => setCard({...card,number:formatCard(e.target.value)})}/>
                <label style={{display:'block',fontSize:13,fontWeight:600,color:'#374151',marginBottom:6}}>Nom sur la carte</label>
                <input className="pay-input" placeholder="Mohamed Ali Souissi"
                  value={card.name} onChange={e => setCard({...card,name:e.target.value})}/>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                  <div>
                    <label style={{display:'block',fontSize:13,fontWeight:600,color:'#374151',marginBottom:6}}>Expiration</label>
                    <input className="pay-input" placeholder="MM/AA"
                      value={card.expiry} onChange={e => setCard({...card,expiry:formatExpiry(e.target.value)})}/>
                  </div>
                  <div>
                    <label style={{display:'block',fontSize:13,fontWeight:600,color:'#374151',marginBottom:6}}>CVV</label>
                    <input className="pay-input" placeholder="123" maxLength={4}
                      value={card.cvv} onChange={e => setCard({...card,cvv:e.target.value.replace(/\D/g,'').slice(0,4)})}/>
                  </div>
                </div>
                <button className="pay-btn" onClick={pay} disabled={loading}>
                  {loading ? '⏳ Traitement en cours...' : `🔒 Payer ${plan.price}€ maintenant`}
                </button>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8,marginTop:12,fontSize:12,color:'#9CA3AF'}}>
                  <Lock size={12}/> Paiement sécurisé SSL · 256-bit encryption
                </div>
              </div>
            </div>

            {/* Récapitulatif */}
            <div>
              <div className="pay-form-box">
                <h3 style={{fontSize:16,fontWeight:700,color:'#111827',marginBottom:20}}>Récapitulatif</h3>
                <div style={{background:'#F8FAFF',borderRadius:14,padding:20,marginBottom:20}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                    <span style={{fontWeight:700,color:'#1B2A5A'}}>Plan {plan.name}</span>
                    <span style={{fontWeight:700,color:'#1B2A5A'}}>{plan.price}€</span>
                  </div>
                  <div style={{fontSize:12,color:'#9CA3AF'}}>Facturation mensuelle · Résiliable à tout moment</div>
                </div>
                {plan.features.map(f=>(
                  <div key={f} style={{display:'flex',alignItems:'center',gap:10,fontSize:13,color:'#374151',marginBottom:10}}>
                    <Check size={14} style={{color:'#059669',flexShrink:0}}/> {f}
                  </div>
                ))}
                <div style={{borderTop:'1px solid #F3F4F6',marginTop:16,paddingTop:16}}>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:16,fontWeight:800,color:'#111827'}}>
                    <span>Total aujourd'hui</span>
                    <span style={{color:'#4A6CF7'}}>{plan.price}€</span>
                  </div>
                  <div style={{fontSize:12,color:'#9CA3AF',marginTop:4}}>Puis {plan.price}€/mois · Annulable en ligne</div>
                </div>
              </div>
              <div style={{background:'#D1FAE5',borderRadius:14,padding:16,marginTop:16,display:'flex',alignItems:'center',gap:12}}>
                <span style={{fontSize:24}}>🛡️</span>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:'#065F46'}}>Garantie satisfait ou remboursé 30 jours</div>
                  <div style={{fontSize:12,color:'#059669'}}>Si AuraSocials ne vous convient pas, remboursement intégral.</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}