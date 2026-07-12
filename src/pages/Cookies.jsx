import SimpleNav from '../components/SimpleNav'

const COOKIES = [
  { type:'Essentiels', required:true, desc:"Ces cookies sont indispensables au fonctionnement d'AuraSocials. Ils ne peuvent pas être désactivés.", items:[
    { name:'aura_user', desc:'Stocke les informations de session utilisateur (localStorage)', duration:'Session ou jusqu\'à déconnexion' },
    { name:'aura_clients_*', desc:'Stocke le portfolio de clients de l\'utilisateur en local', duration:'Permanent jusqu\'à suppression du compte' },
  ]},
  { type:'Performance', required:false, desc:"Ces cookies nous aident à comprendre comment les visiteurs utilisent AuraSocials pour améliorer l'expérience.", items:[
    { name:'_vercel_jwt', desc:'Cookie technique Vercel pour l\'authentification au CDN', duration:'1 heure' },
  ]},
  { type:'Tiers', required:false, desc:"Ces cookies proviennent de services tiers intégrés à AuraSocials.", items:[
    { name:'Anthropic Claude', desc:'Traitement des requêtes IA — aucun cookie déposé sur votre navigateur', duration:'Traitement en temps réel uniquement' },
  ]},
]

export default function Cookies() {
  return (
    <div style={{minHeight:'100vh',background:'#F8FAFF'}}>
      <SimpleNav/>
      <div style={{background:'linear-gradient(135deg,#1B2A5A,#2E3F7A)',padding:'50px 48px',textAlign:'center'}}>
        <div style={{fontSize:11,fontWeight:700,color:'#93AEFF',letterSpacing:2,textTransform:'uppercase',marginBottom:10}}>🍪 Légal</div>
        <h1 style={{fontSize:34,fontWeight:800,color:'white',marginBottom:8,letterSpacing:-0.5}}>Politique des Cookies</h1>
        <p style={{fontSize:14,color:'rgba(255,255,255,0.45)'}}>Dernière mise à jour : 13 juillet 2026</p>
      </div>
      <div style={{maxWidth:760,margin:'40px auto',padding:'0 48px 80px'}}>
        <div style={{background:'white',borderRadius:20,padding:'40px 48px',border:'1px solid #F1F3F9'}}>

          <div style={{background:'#EEF1FB',borderRadius:12,padding:'16px 20px',marginBottom:28}}>
            <div style={{fontSize:13,fontWeight:700,color:'#4A6CF7',marginBottom:4}}>Information importante</div>
            <p style={{fontSize:13,color:'#374151',lineHeight:1.7}}>AuraSocials utilise principalement le <strong>localStorage</strong> du navigateur (pas de cookies traditionnels) pour stocker vos préférences et données de session. Ces données restent sur votre appareil et ne sont pas transmises à des serveurs tiers.</p>
          </div>

          <h2 style={{fontSize:17,fontWeight:800,color:'#111827',marginBottom:8}}>Qu'est-ce qu'un cookie ?</h2>
          <p style={{fontSize:14,color:'#374151',lineHeight:1.8,marginBottom:28}}>Un cookie est un petit fichier texte stocké sur votre appareil lors de la visite d'un site web. AuraSocials utilise principalement le localStorage (stockage local) plutôt que des cookies HTTP traditionnels, ce qui signifie que vos données ne sont pas envoyées automatiquement à chaque requête serveur.</p>

          {COOKIES.map((cat,i) => (
            <div key={i} style={{marginBottom:28}}>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
                <h3 style={{fontSize:15,fontWeight:800,color:'#1B2A5A'}}>{cat.type}</h3>
                <span style={{fontSize:11,fontWeight:700,padding:'2px 8px',borderRadius:99,background:cat.required?'#EEF1FB':'#F3F4F6',color:cat.required?'#4A6CF7':'#6B7280'}}>
                  {cat.required ? 'Obligatoire' : 'Optionnel'}
                </span>
              </div>
              <p style={{fontSize:13,color:'#6B7280',lineHeight:1.65,marginBottom:12}}>{cat.desc}</p>
              <div style={{background:'#F8FAFF',borderRadius:12,overflow:'hidden',border:'1px solid #E8ECF8'}}>
                <div style={{display:'grid',gridTemplateColumns:'1fr 2fr 1fr',padding:'10px 16px',background:'#EEF1FB',fontSize:11,fontWeight:700,color:'#4A6CF7',letterSpacing:0.5}}>
                  <span>NOM</span><span>DESCRIPTION</span><span>DURÉE</span>
                </div>
                {cat.items.map((item,j) => (
                  <div key={j} style={{display:'grid',gridTemplateColumns:'1fr 2fr 1fr',padding:'12px 16px',borderTop:'1px solid #E8ECF8',fontSize:13}}>
                    <span style={{fontWeight:600,color:'#374151',fontFamily:'monospace',fontSize:12}}>{item.name}</span>
                    <span style={{color:'#6B7280'}}>{item.desc}</span>
                    <span style={{color:'#9CA3AF',fontSize:12}}>{item.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div style={{borderTop:'1px solid #F3F4F6',paddingTop:24,marginTop:8}}>
            <h3 style={{fontSize:15,fontWeight:800,color:'#1B2A5A',marginBottom:10}}>Comment gérer vos préférences</h3>
            <p style={{fontSize:14,color:'#374151',lineHeight:1.8}}>Vous pouvez supprimer vos données stockées localement depuis les outils développeur de votre navigateur (F12 → Application → Local Storage → aurasocials) ou en vous déconnectant et en effaçant les données du site. Pour toute question : <strong>contact@aurasocials.com</strong></p>
          </div>
        </div>
      </div>
    </div>
  )
}