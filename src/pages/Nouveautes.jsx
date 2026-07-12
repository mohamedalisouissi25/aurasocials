import SimpleNav from '../components/SimpleNav'

const CHANGELOG = [
  {
    version:'2.1.0', date:'13 juillet 2026', badge:'Dernière version',
    items:[
      { type:'new',  text:'Insights IA — 6 nouvelles fonctionnalités exclusives : Content Score, Optimal Time Predictor, Brand Voice Guardian, Crisis Radar, Content Recycler, Competitor Pulse' },
      { type:'new',  text:'Page Paramètres complète — 8 onglets : Profil, Apparence, Notifications, Sécurité, Abonnement, Intégrations, API, Équipe' },
      { type:'new',  text:'Blog intégré avec articles lisibles complets' },
      { type:'new',  text:'Page de paiement en 2 étapes avec choix de plan' },
      { type:'new',  text:'Connexion LinkedIn avec modal de sélection de compte' },
      { type:'imp',  text:'Isolation des clients par utilisateur — chaque compte voit uniquement ses propres clients' },
      { type:'fix',  text:"Correction de la navigation Vercel (vercel.json) — plus de pages blanches sur rechargement" },
    ]
  },
  {
    version:'2.0.0', date:'10 juin 2026', badge:'Majeure',
    items:[
      { type:'new',  text:'AuraCRM complet — Dashboard, Clients, IA Générative, Calendrier éditorial, Analytics' },
      { type:'new',  text:'Générateur IA — 6 types de contenu (Instagram, LinkedIn, Facebook, Twitter, Plan mensuel, Hashtags)' },
      { type:'new',  text:'Système d\'authentification complet — JWT + bcrypt + OAuth2 (Google + LinkedIn)' },
      { type:'new',  text:'Base de données PostgreSQL + Prisma ORM — 4 modèles (User, Client, Post, AIGeneration)' },
      { type:'new',  text:'Backend Express.js REST API — endpoints auth, clients, users' },
      { type:'new',  text:'Calendrier éditorial visuel avec grille mensuelle par réseau social' },
      { type:'imp',  text:'Design professionnel complet avec CSS custom — couleurs navy/accent' },
    ]
  },
  {
    version:'1.5.0', date:'30 mai 2026', badge:'',
    items:[
      { type:'new',  text:'Internationalisation complète — 8 langues (FR, EN, AR-RTL, ES, DE, ZH, JA, PT)' },
      { type:'new',  text:'Sections homepage : Pitch Avant/Après, Chiffres clés, Témoignages' },
      { type:'new',  text:'Blog section avec 3 articles et navigation' },
      { type:'new',  text:'Footer complet avec liens fonctionnels' },
      { type:'imp',  text:'Performance — temps de chargement réduit à < 2 secondes' },
    ]
  },
  {
    version:'1.0.0', date:'18 mai 2026', badge:'Lancement',
    items:[
      { type:'new',  text:'Lancement d\'AuraSocials — site web landing page professionnel' },
      { type:'new',  text:'Hero section, Services, Aperçu CRM, Langues, Tarifs' },
      { type:'new',  text:'Chatbot IA intégré (Aura Assistant)' },
      { type:'new',  text:'Pages Login et Register avec validation' },
      { type:'new',  text:'Déploiement sur Vercel — aurasocials-six.vercel.app' },
      { type:'new',  text:'Repository GitHub public — github.com/mohamedalisouissi25/aurasocials' },
    ]
  },
]

const TYPE_CONFIG = {
  new:  { label:'Nouveau',       bg:'#EEF1FB', color:'#4A6CF7' },
  imp:  { label:'Amélioration',  bg:'#D1FAE5', color:'#059669' },
  fix:  { label:'Correction',    bg:'#FEF3C7', color:'#D97706' },
}

export default function Nouveautes() {
  return (
    <div style={{minHeight:'100vh',background:'#F8FAFF'}}>
      <SimpleNav/>

      <div style={{background:'linear-gradient(135deg,#1B2A5A,#2E3F7A)',padding:'60px 48px',textAlign:'center'}}>
        <div style={{fontSize:11,fontWeight:700,color:'#93AEFF',letterSpacing:2,textTransform:'uppercase',marginBottom:10}}>🚀 Changelog</div>
        <h1 style={{fontSize:36,fontWeight:800,color:'white',marginBottom:8,letterSpacing:-1}}>Nouveautés AuraSocials</h1>
        <p style={{fontSize:15,color:'rgba(255,255,255,0.5)'}}>Toutes les nouveautés, améliorations et corrections depuis le lancement.</p>
      </div>

      <div style={{maxWidth:760,margin:'40px auto',padding:'0 48px 80px'}}>
        {CHANGELOG.map((release,i) => (
          <div key={release.version} style={{marginBottom:40,display:'grid',gridTemplateColumns:'140px 1fr',gap:24}}>

            {/* Left - version info */}
            <div style={{textAlign:'right',paddingTop:4}}>
              <div style={{fontSize:16,fontWeight:800,color:'#1B2A5A',marginBottom:4}}>v{release.version}</div>
              <div style={{fontSize:12,color:'#9CA3AF',marginBottom:8}}>{release.date}</div>
              {release.badge && (
                <span style={{fontSize:10,fontWeight:700,padding:'3px 8px',borderRadius:99,background:i===0?'#4A6CF7':i===3?'#059669':'#EEF1FB',color:i===0?'white':i===3?'white':'#4A6CF7'}}>
                  {release.badge}
                </span>
              )}
            </div>

            {/* Right - items */}
            <div style={{background:'white',borderRadius:16,border:'1px solid #F1F3F9',padding:'22px 24px',position:'relative'}}>
              {i < CHANGELOG.length-1 && (
                <div style={{position:'absolute',left:-13,top:'50%',width:2,height:'120%',background:'#E8ECF8',transform:'translateY(-50%)'}}/>
              )}
              <div style={{position:'absolute',left:-20,top:24,width:14,height:14,borderRadius:'50%',background:i===0?'#4A6CF7':'#E8ECF8',border:`2px solid ${i===0?'#4A6CF7':'#CBD5E1'}`}}/>
              {release.items.map((item,j) => {
                const cfg = TYPE_CONFIG[item.type]
                return (
                  <div key={j} style={{display:'flex',alignItems:'flex-start',gap:10,marginBottom:j<release.items.length-1?10:0}}>
                    <span style={{fontSize:10,fontWeight:700,padding:'3px 8px',borderRadius:6,background:cfg.bg,color:cfg.color,whiteSpace:'nowrap',flexShrink:0,marginTop:2}}>
                      {cfg.label}
                    </span>
                    <span style={{fontSize:13,color:'#374151',lineHeight:1.6}}>{item.text}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        <div style={{background:'linear-gradient(135deg,#1B2A5A,#4A6CF7)',borderRadius:20,padding:'28px 32px',textAlign:'center'}}>
          <div style={{fontSize:18,fontWeight:800,color:'white',marginBottom:6}}>Une suggestion de fonctionnalité ?</div>
          <p style={{fontSize:13,color:'rgba(255,255,255,0.55)',marginBottom:18}}>Partagez vos idées avec notre équipe — certaines sont déjà dans notre roadmap.</p>
          <a href="/contact">
            <button style={{background:'white',color:'#1B2A5A',border:'none',padding:'11px 24px',borderRadius:10,fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}>
              Partager une idée →
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}