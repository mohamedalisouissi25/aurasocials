import { useState } from 'react'
import { Book, Code, Zap, Users, Calendar, BarChart3, Key, ChevronRight } from 'lucide-react'
import SimpleNav from '../components/SimpleNav'

const DOCS = [
  {
    id:'quickstart', icon:'🚀', title:'Démarrage rapide',
    content:[
      { h:'Créer votre compte', p:"Allez sur aurasocials.com et cliquez sur 'Démarrer gratuitement'. Remplissez le formulaire avec vos informations. Aucune carte bancaire requise pour commencer." },
      { h:'Accéder à AuraCRM', p:"Une fois connecté, vous êtes redirigé vers AuraCRM. Le dashboard affiche vos KPIs principaux : nombre de clients, posts publiés, impressions et tâches IA en cours." },
      { h:'Ajouter votre premier client', p:"Allez dans Clients → Nouveau client. Renseignez le nom, le secteur d'activité, les réseaux sociaux et le statut. Le client apparaît immédiatement dans votre tableau de bord." },
      { h:'Générer votre premier post IA', p:"Dans IA Générative, choisissez un type de contenu (Post Instagram, Article LinkedIn, etc.), sélectionnez le client et cliquez sur 'Générer avec IA Claude'. Le post est prêt en 2-3 secondes." },
    ]
  },
  {
    id:'clients', icon:'👥', title:'Gestion des clients',
    content:[
      { h:'Ajouter un client', p:"Depuis la page Clients, cliquez sur 'Nouveau client'. Renseignez : nom de l'entreprise, secteur d'activité, réseaux sociaux gérés et statut (Actif/Inactif)." },
      { h:'Gérer le portfolio', p:"Chaque client a sa propre fiche avec l'historique des publications, les métriques de performance et les suggestions IA. Les données sont isolées par utilisateur — vos clients ne voient jamais les clients des autres comptes." },
      { h:'Supprimer un client', p:"Dans le tableau des clients, cliquez sur l'icône de suppression (🗑️) à droite de la ligne. La suppression est définitive. Les données associées (posts, générations IA) sont également supprimées." },
    ]
  },
  {
    id:'ai', icon:'🤖', title:'Générateur IA',
    content:[
      { h:'Types de contenu disponibles', p:"Post Instagram, Article LinkedIn, Post Facebook, Thread X/Twitter, Plan éditorial mensuel, Pack hashtags. Chaque type est optimisé pour les spécificités du réseau cible." },
      { h:'Personnaliser la génération', p:"Sélectionnez un client pour que l'IA adapte le contenu à son secteur. Ajoutez des instructions dans le champ texte pour préciser le ton, le sujet, les promotions à mentionner, etc." },
      { h:'Recycler un contenu performant', p:"Dans Insights IA → Content Recycler, vous voyez vos posts avec les meilleurs scores d'engagement. Cliquez sur 'Recycler' pour qu'AuraSocials génère une version reformulée pour un autre réseau ou une autre période." },
    ]
  },
  {
    id:'api', icon:'⚡', title:'API Reference',
    content:[
      { h:'Authentification', p:"Toutes les requêtes API doivent inclure votre clé API dans le header Authorization: Bearer {votre-clé-api}. Vos clés sont disponibles dans Paramètres → Clés API." },
      { h:'Endpoints principaux', p:"POST /api/auth/login → Connexion\nPOST /api/auth/register → Inscription\nGET /api/clients → Liste des clients\nPOST /api/clients → Créer un client\nGET /api/users → Informations utilisateur" },
      { h:'Webhooks', p:"Configurez une URL de webhook dans Paramètres → API pour recevoir des notifications en temps réel sur les événements : nouvelle publication, nouveau client, rapport IA prêt, alerte performance." },
      { h:'Rate limiting', p:"L'API est limitée à 100 requêtes/minute pour les plans Starter et Agency, et 1000 requêtes/minute pour le plan Enterprise. Les erreurs 429 (Too Many Requests) indiquent que la limite est atteinte." },
    ]
  },
]

export default function Documentation() {
  const [active, setActive] = useState('quickstart')
  const doc = DOCS.find(d => d.id === active)

  return (
    <div style={{minHeight:'100vh',background:'#F8FAFF'}}>
      <SimpleNav/>

      <div style={{background:'linear-gradient(135deg,#1B2A5A,#2E3F7A)',padding:'50px 48px',textAlign:'center'}}>
        <div style={{fontSize:11,fontWeight:700,color:'#93AEFF',letterSpacing:2,textTransform:'uppercase',marginBottom:10}}>📚 Documentation</div>
        <h1 style={{fontSize:36,fontWeight:800,color:'white',marginBottom:8,letterSpacing:-1}}>Documentation AuraSocials</h1>
        <p style={{fontSize:15,color:'rgba(255,255,255,0.5)'}}>Guides, tutoriels et référence API.</p>
      </div>

      <div style={{maxWidth:1000,margin:'40px auto',padding:'0 48px 80px',display:'grid',gridTemplateColumns:'220px 1fr',gap:28}}>

        {/* Sidebar */}
        <div>
          <div style={{background:'white',borderRadius:16,border:'1px solid #F1F3F9',overflow:'hidden',position:'sticky',top:80}}>
            {DOCS.map(d => (
              <button key={d.id} onClick={() => setActive(d.id)}
                style={{width:'100%',display:'flex',alignItems:'center',gap:10,padding:'13px 16px',background:active===d.id?'#EEF1FB':'none',border:'none',borderBottom:'1px solid #F9FAFB',cursor:'pointer',fontFamily:'inherit',color:active===d.id?'#4A6CF7':'#374151',fontWeight:active===d.id?700:500,fontSize:13,textAlign:'left',transition:'all 0.15s'}}>
                <span style={{fontSize:16}}>{d.icon}</span>
                {d.title}
                {active===d.id && <ChevronRight size={13} style={{marginLeft:'auto'}}/>}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div>
          <div style={{background:'white',borderRadius:20,padding:'36px 40px',border:'1px solid #F1F3F9',marginBottom:20}}>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:28,paddingBottom:20,borderBottom:'1px solid #F3F4F6'}}>
              <div style={{width:48,height:48,background:'#EEF1FB',borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22}}>
                {doc.icon}
              </div>
              <h2 style={{fontSize:22,fontWeight:800,color:'#111827'}}>{doc.title}</h2>
            </div>
            {doc.content.map((section,i) => (
              <div key={i} style={{marginBottom:28}}>
                <h3 style={{fontSize:16,fontWeight:700,color:'#1B2A5A',marginBottom:10}}>{section.h}</h3>
                <p style={{fontSize:14,color:'#374151',lineHeight:1.8,whiteSpace:'pre-line'}}>{section.p}</p>
              </div>
            ))}
          </div>

          <div style={{background:'linear-gradient(135deg,#4A6CF7,#8B5CF6)',borderRadius:16,padding:'20px 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div>
              <div style={{fontSize:14,fontWeight:700,color:'white',marginBottom:3}}>Besoin d'aide supplémentaire ?</div>
              <div style={{fontSize:12,color:'rgba(255,255,255,0.65)'}}>Notre équipe support répond sous 24h.</div>
            </div>
            <a href="/contact">
              <button style={{background:'white',color:'#4A6CF7',border:'none',padding:'10px 20px',borderRadius:10,fontSize:13,fontWeight:700,cursor:'pointer',fontFamily:'inherit',whiteSpace:'nowrap'}}>Contacter →</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}