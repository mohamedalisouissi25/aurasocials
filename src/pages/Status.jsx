import { useState } from 'react'
import SimpleNav from '../components/SimpleNav'

const SERVICES = [
  { name:'AuraSocials Web App',     status:'operational', uptime:'99.98%', response:'142ms' },
  { name:'AuraCRM Dashboard',       status:'operational', uptime:'99.97%', response:'189ms' },
  { name:'API IA Claude (Anthropic)',status:'operational', uptime:'99.95%', response:'1.8s'  },
  { name:'Base de données (PostgreSQL)', status:'operational', uptime:'99.99%', response:'12ms' },
  { name:'Authentification (JWT)',   status:'operational', uptime:'99.99%', response:'38ms'  },
  { name:'Notifications Push',       status:'operational', uptime:'99.90%', response:'210ms' },
  { name:'Intégration Instagram API',status:'operational', uptime:'99.92%', response:'420ms' },
  { name:'Intégration LinkedIn API', status:'operational', uptime:'99.88%', response:'380ms' },
  { name:'Déploiement Vercel (CDN)', status:'operational', uptime:'99.99%', response:'58ms'  },
  { name:'Railway (Backend)',        status:'operational', uptime:'99.96%', response:'95ms'  },
]

const INCIDENTS = [
  { date:'10 juin 2026', title:'Latence élevée API Claude', status:'resolved', duration:'12 min', detail:"Une latence élevée a été détectée sur les appels à l'API Claude entre 14h22 et 14h34. Le problème a été résolu par Anthropic. Aucune donnée n'a été perdue." },
  { date:'28 mai 2026',  title:'Maintenance planifiée — Base de données', status:'resolved', duration:'45 min', detail:"Maintenance planifiée pour mise à jour de la base de données PostgreSQL de v15 à v16. Le service a été interrompu de 02h00 à 02h45 CET comme annoncé." },
  { date:'15 mai 2026',  title:'Erreurs intermittentes authentification',  status:'resolved', duration:'8 min',  detail:"Des erreurs 401 intermittentes ont été détectées sur le service d'authentification. Causées par l'expiration simultanée de plusieurs tokens. Résolu avec un déploiement d'urgence." },
]

const STATUS_CONFIG = {
  operational: { label:'Opérationnel', color:'#059669', bg:'#D1FAE5', dot:'#059669' },
  degraded:    { label:'Dégradé',      color:'#D97706', bg:'#FEF3C7', dot:'#F59E0B' },
  outage:      { label:'Panne',        color:'#DC2626', bg:'#FEE2E2', dot:'#EF4444' },
}

export default function Status() {
  const allOk = SERVICES.every(s => s.status === 'operational')

  return (
    <div style={{minHeight:'100vh',background:'#F8FAFF'}}>
      <SimpleNav/>

      {/* Global status */}
      <div style={{background: allOk ? 'linear-gradient(135deg,#059669,#10B981)' : 'linear-gradient(135deg,#DC2626,#EF4444)',padding:'50px 48px',textAlign:'center'}}>
        <div style={{fontSize:56,marginBottom:12}}>{allOk ? '✅' : '⚠️'}</div>
        <h1 style={{fontSize:32,fontWeight:800,color:'white',marginBottom:8}}>
          {allOk ? 'Tous les systèmes opérationnels' : 'Incidents en cours'}
        </h1>
        <p style={{fontSize:15,color:'rgba(255,255,255,0.7)'}}>
          Mis à jour le {new Date().toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'})} à {new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}
        </p>
      </div>

      <div style={{maxWidth:800,margin:'40px auto',padding:'0 48px 80px'}}>

        {/* Services */}
        <div style={{background:'white',borderRadius:20,border:'1px solid #F1F3F9',overflow:'hidden',marginBottom:32}}>
          <div style={{padding:'20px 24px',borderBottom:'1px solid #F3F4F6'}}>
            <h2 style={{fontSize:17,fontWeight:800,color:'#111827'}}>État des services</h2>
          </div>
          {SERVICES.map((s,i) => {
            const cfg = STATUS_CONFIG[s.status]
            return (
              <div key={s.name} style={{display:'flex',alignItems:'center',gap:14,padding:'14px 24px',borderBottom:i<SERVICES.length-1?'1px solid #F9FAFB':'none'}}>
                <div style={{width:9,height:9,borderRadius:'50%',background:cfg.dot,flexShrink:0,boxShadow:`0 0 6px ${cfg.dot}`}}/>
                <div style={{flex:1,fontSize:14,fontWeight:500,color:'#111827'}}>{s.name}</div>
                <div style={{fontSize:12,color:'#9CA3AF',marginRight:16}}>{s.response}</div>
                <div style={{fontSize:12,color:'#9CA3AF',marginRight:16}}>{s.uptime} uptime</div>
                <span style={{fontSize:11,fontWeight:700,padding:'3px 10px',borderRadius:99,background:cfg.bg,color:cfg.color,whiteSpace:'nowrap'}}>
                  {cfg.label}
                </span>
              </div>
            )
          })}
        </div>

        {/* Uptime 90 days */}
        <div style={{background:'white',borderRadius:20,border:'1px solid #F1F3F9',padding:'24px',marginBottom:32}}>
          <h2 style={{fontSize:17,fontWeight:800,color:'#111827',marginBottom:16}}>Disponibilité sur 90 jours</h2>
          <div style={{display:'flex',gap:2,marginBottom:10}}>
            {Array.from({length:90},(_,i) => (
              <div key={i} style={{flex:1,height:28,borderRadius:2,background:i===45||i===72||i===85?'#FEF3C7':i===46||i===73?'#D1FAE5':'#059669',opacity:i===45||i===72||i===85?1:0.85}}/>
            ))}
          </div>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:'#9CA3AF'}}>
            <span>Il y a 90 jours</span>
            <span style={{fontWeight:700,color:'#059669'}}>99.97% uptime</span>
            <span>Aujourd'hui</span>
          </div>
        </div>

        {/* Incidents */}
        <div style={{background:'white',borderRadius:20,border:'1px solid #F1F3F9',overflow:'hidden'}}>
          <div style={{padding:'20px 24px',borderBottom:'1px solid #F3F4F6'}}>
            <h2 style={{fontSize:17,fontWeight:800,color:'#111827'}}>Historique des incidents</h2>
          </div>
          {INCIDENTS.map((inc,i) => (
            <div key={i} style={{padding:'20px 24px',borderBottom:i<INCIDENTS.length-1?'1px solid #F9FAFB':'none'}}>
              <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:12,marginBottom:8}}>
                <div>
                  <span style={{fontSize:11,fontWeight:700,padding:'2px 8px',borderRadius:99,background:'#D1FAE5',color:'#059669',marginRight:8}}>Résolu</span>
                  <span style={{fontSize:14,fontWeight:700,color:'#111827'}}>{inc.title}</span>
                </div>
                <span style={{fontSize:12,color:'#9CA3AF',whiteSpace:'nowrap'}}>{inc.date} · {inc.duration}</span>
              </div>
              <p style={{fontSize:13,color:'#6B7280',lineHeight:1.65}}>{inc.detail}</p>
            </div>
          ))}
        </div>

        <div style={{textAlign:'center',marginTop:24,fontSize:12,color:'#9CA3AF'}}>
          Abonnez-vous aux alertes status →{' '}
          <a href="/contact" style={{color:'#4A6CF7',fontWeight:600}}>contact@aurasocials.com</a>
        </div>
      </div>
    </div>
  )
}