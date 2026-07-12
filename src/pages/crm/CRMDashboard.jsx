import { Brain, Calendar, Users, TrendingUp, ArrowRight, BarChart3 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function CRMDashboard() {
  const nav = useNavigate()
  const user = JSON.parse(localStorage.getItem('aura_user') || '{}')

  return (
    <div>
      {/* Welcome */}
      <div className="crm-welcome">
        <div>
          <div className="crm-welcome-title">Bonjour, {user.name || 'Mohamed Ali'} 👋</div>
          <div className="crm-welcome-sub">Voici l'état de vos réseaux sociaux aujourd'hui — {new Date().toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'})}</div>
        </div>
        <button onClick={() => nav('/crm/ai')} className="crm-btn">
          <Brain size={16}/> Générer avec IA
        </button>
      </div>

      {/* KPIs */}
      <div className="crm-kpi-grid">
        {[
          {label:'Clients actifs',value:'48',delta:'+3 ce mois',color:'#059669',icon:Users},
          {label:'Posts publiés',value:'1 247',delta:'+12% vs mois dernier',color:'#059669',icon:Calendar},
          {label:'Impressions',value:'2.4M',delta:'+8% cette semaine',color:'#059669',icon:TrendingUp},
          {label:'Tâches IA générées',value:'34',delta:"générées aujourd'hui",color:'#4A6CF7',icon:Brain},
        ].map(({label,value,delta,color,icon:Icon}) => (
          <div key={label} className="crm-kpi-card">
            <div className="crm-kpi-header">
              <span className="crm-kpi-label">{label}</span>
              <Icon size={16} className="crm-kpi-icon"/>
            </div>
            <div className="crm-kpi-value">{value}</div>
            <div className="crm-kpi-delta" style={{color}}>{delta}</div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="crm-grid-2">
        <div className="crm-card">
          <div className="crm-card-title">
            <Brain size={16} style={{color:'#4A6CF7'}}/> Suggestions IA du jour
            <button onClick={() => nav('/crm/ai')} className="crm-link-btn" style={{marginLeft:'auto',fontSize:12}}>
              Générer <ArrowRight size={12}/>
            </button>
          </div>
          {[
            {dot:'#4A6CF7',text:"Publier un carousel LinkedIn pour Nike France — Taux d'engagement prévu : 5.2%",net:'LinkedIn',nc:'#0A66C2'},
            {dot:'#10B981',text:"Répondre aux 12 commentaires Instagram de la boutique Zara Paris",net:'Instagram',nc:'#E97729'},
            {dot:'#F59E0B',text:"Boost Stories TikTok prévu ce soir à 20h — heure de pic d'engagement",net:'TikTok',nc:'#111'},
            {dot:'#4A6CF7',text:"Créer 4 posts Facebook pour la campagne d'été de BioNature",net:'Facebook',nc:'#1877F2'},
          ].map((s,i) => (
            <div key={i} className="crm-suggestion">
              <div className="crm-suggestion-dot" style={{background:s.dot}}/>
              <span className="crm-suggestion-text">{s.text}</span>
              <span className="crm-net-badge" style={{background:s.nc}}>{s.net}</span>
            </div>
          ))}
        </div>

        <div className="crm-card">
          <div className="crm-card-title">
            <Users size={16} style={{color:'#4A6CF7'}}/> Clients récents
          </div>
          {[
            {name:'Nike France',sector:'Mode & Sport',color:'#111'},
            {name:'BioNature',sector:'Santé & Bio',color:'#059669'},
            {name:'TechStart SAS',sector:'Tech & SaaS',color:'#4A6CF7'},
            {name:'Café Lumière',sector:'Restauration',color:'#F59E0B'},
            {name:'Studio Kreativ',sector:'Design & Créa',color:'#EC4899'},
          ].map(c => (
            <div key={c.name} className="crm-client-row">
              <div className="crm-client-av" style={{background:c.color}}>{c.name[0]}</div>
              <div style={{flex:1}}>
                <div className="crm-client-name">{c.name}</div>
                <div className="crm-client-sector">{c.sector}</div>
              </div>
            </div>
          ))}
          <button onClick={() => nav('/crm/clients')} className="crm-link-btn" style={{marginTop:12,justifyContent:'center',width:'100%'}}>
            Voir tous les clients <ArrowRight size={12}/>
          </button>
        </div>
      </div>

      {/* Scheduled posts */}
      <div className="crm-card" style={{marginTop:20}}>
        <div className="crm-card-title">
          <Calendar size={16} style={{color:'#4A6CF7'}}/> Prochaines publications programmées
          <button onClick={() => nav('/crm/calendar')} className="crm-link-btn" style={{marginLeft:'auto',fontSize:12}}>
            Voir le calendrier <ArrowRight size={12}/>
          </button>
        </div>
        {[
          {time:"Aujourd'hui 18:00",net:'Instagram',nc:'#E97729',text:'Nike France — Reel collection été 2026'},
          {time:"Demain 09:30",net:'LinkedIn',nc:'#0A66C2',text:'TechStart SAS — Article tendances IA 2026'},
          {time:"Demain 14:00",net:'Facebook',nc:'#1877F2',text:'BioNature — Post promotionnel -20% été'},
          {time:"15/07 20:00",net:'TikTok',nc:'#111',text:'Café Lumière — Vidéo nouvelle carte été'},
        ].map((p,i) => (
          <div key={i} className="crm-scheduled-row">
            <span className="crm-scheduled-time">{p.time}</span>
            <span className="crm-net-badge" style={{background:p.nc}}>{p.net}</span>
            <span className="crm-scheduled-text">{p.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}