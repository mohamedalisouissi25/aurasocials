import { useState } from 'react'
import { ChevronDown, ChevronUp, Search } from 'lucide-react'
import SimpleNav from '../components/SimpleNav'

const FAQS = [
  {
    cat: "🚀 Général",
    items: [
      { q:"Qu'est-ce qu'AuraSocials ?", a:"AuraSocials est une plateforme SaaS combinant un site web professionnel et AuraCRM — un CRM social media propulsé par l'IA Claude d'Anthropic. Il permet aux agences de gérer les réseaux sociaux de leurs clients, de générer du contenu automatiquement et de piloter leurs performances depuis un seul tableau de bord." },
      { q:"À qui s'adresse AuraSocials ?", a:"AuraSocials est conçu pour les agences de communication digitale, les freelances en community management, et toute entreprise souhaitant gérer ses réseaux sociaux de manière professionnelle. Notre interface multilingue (50+ langues) le rend adapté aux marchés tunisien, européen et mondial." },
      { q:"Dans quelles langues est disponible l'interface ?", a:"L'interface est disponible en 50+ langues dont le français, l'anglais, l'arabe (avec support RTL), l'espagnol, l'allemand, le chinois, le japonais et le portugais. Vous pouvez changer de langue à tout moment depuis le sélecteur dans la barre de navigation." },
    ]
  },
  {
    cat: "🤖 Intelligence Artificielle",
    items: [
      { q:"Comment fonctionne le générateur IA ?", a:"Le générateur IA utilise l'API Claude d'Anthropic, l'un des modèles les plus avancés du marché. Vous sélectionnez un client, un type de contenu (post Instagram, article LinkedIn, plan mensuel...) et des instructions optionnelles. L'IA génère en 2-3 secondes un contenu optimisé pour le réseau choisi, adapté au secteur et au ton de la marque." },
      { q:"Les publications générées par l'IA sont-elles publiables directement ?", a:"Oui, avec votre validation. AuraSocials génère le contenu, vous le relisez et l'approuvez (ou modifiez), puis vous pouvez le programmer directement dans le calendrier éditorial pour publication automatique. Nous recommandons toujours une validation humaine avant publication." },
      { q:"L'IA peut-elle analyser les commentaires de mes clients ?", a:"Oui. Le module Crisis Radar d'AuraSocials analyse en temps réel le sentiment des commentaires (positif, neutre, négatif) et vous alerte en cas de pic négatif détecté sur n'importe quel compte de vos clients." },
    ]
  },
  {
    cat: "💳 Tarifs & Abonnement",
    items: [
      { q:"Puis-je essayer AuraSocials gratuitement ?", a:"Oui. Vous pouvez créer un compte gratuitement et accéder à AuraCRM avec les fonctionnalités de base. Aucune carte bancaire n'est requise pour démarrer. Les fonctionnalités avancées (IA générative complète, réseaux illimités, analytics avancés) sont disponibles à partir du plan Agency à 149€/mois." },
      { q:"Comment puis-je annuler mon abonnement ?", a:"Vous pouvez annuler votre abonnement à tout moment depuis la page Paramètres → Abonnement. L'annulation prend effet à la fin de la période de facturation en cours. Aucun remboursement n'est appliqué pour la période partielle, mais vous continuez à bénéficier des fonctionnalités jusqu'à la fin de la période." },
      { q:"Existe-t-il une réduction pour les agences avec plusieurs comptes ?", a:"Oui. Le plan Agency permet de gérer 25 clients depuis un seul compte. Pour les grandes agences, le plan Enterprise (499€/mois) offre des clients illimités, une IA personnalisée et un onboarding dédié. Contactez-nous pour un devis personnalisé si vous avez des besoins spécifiques." },
    ]
  },
  {
    cat: "🔒 Sécurité & Données",
    items: [
      { q:"Comment mes données sont-elles protégées ?", a:"AuraSocials utilise HTTPS/TLS pour toutes les communications, les mots de passe sont hashés avec bcrypt (salt 12), et l'authentification JWT avec expiration courte. Toutes les données sont stockées dans une base PostgreSQL sécurisée sur Railway, avec des sauvegardes quotidiennes automatiques." },
      { q:"Où sont hébergées les données ?", a:"Les données sont hébergées en Europe (serveurs Railway EU). Nous respectons le RGPD et ne vendons jamais vos données à des tiers. Vous restez propriétaire de toutes vos données et pouvez les exporter ou les supprimer à tout moment depuis les paramètres." },
      { q:"Puis-je inviter des membres de mon équipe ?", a:"Oui. Le plan Agency permet jusqu'à 5 membres d'équipe. Le plan Enterprise permet des membres illimités. Chaque membre peut avoir un rôle différent : Admin, Member, ou Lecteur. La gestion des membres se fait depuis Paramètres → Mon équipe." },
    ]
  },
  {
    cat: "🔗 Intégrations",
    items: [
      { q:"Quels réseaux sociaux sont supportés ?", a:"AuraSocials supporte Instagram, LinkedIn, Facebook, TikTok et X (anciennement Twitter). Vous pouvez connecter les comptes de vos clients via OAuth2 depuis le module Intégrations dans les Paramètres. La connexion aux APIs est sécurisée et peut être révoquée à tout moment." },
      { q:"AuraSocials dispose-t-il d'une API publique ?", a:"Oui. Les plans Agency et Enterprise incluent l'accès à l'API REST AuraSocials avec authentification par clé API. La documentation complète est disponible dans la page Documentation. Vous pouvez également configurer des webhooks pour recevoir des notifications en temps réel." },
    ]
  },
]

export default function FAQ() {
  const [open,   setOpen]   = useState(null)
  const [search, setSearch] = useState('')

  const filteredFaqs = FAQS.map(cat => ({
    ...cat,
    items: cat.items.filter(item =>
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0)

  let globalIdx = 0

  return (
    <div style={{minHeight:'100vh', background:'#F8FAFF'}}>
      <SimpleNav/>

      {/* Hero */}
      <div style={{background:'linear-gradient(135deg,#1B2A5A,#2E3F7A)',padding:'60px 48px',textAlign:'center'}}>
        <div style={{fontSize:11,fontWeight:700,color:'#93AEFF',letterSpacing:2,textTransform:'uppercase',marginBottom:10}}>❓ FAQ</div>
        <h1 style={{fontSize:38,fontWeight:800,color:'white',marginBottom:10,letterSpacing:-1}}>Questions fréquentes</h1>
        <p style={{fontSize:16,color:'rgba(255,255,255,0.5)',marginBottom:32}}>Tout ce que vous devez savoir sur AuraSocials.</p>
        <div style={{maxWidth:480,margin:'0 auto',position:'relative'}}>
          <Search size={16} style={{position:'absolute',left:16,top:'50%',transform:'translateY(-50%)',color:'rgba(255,255,255,0.4)'}}/>
          <input
            style={{width:'100%',padding:'13px 16px 13px 44px',background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:12,fontSize:14,color:'white',outline:'none',fontFamily:'inherit'}}
            placeholder="Rechercher une question..."
            value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
      </div>

      <div style={{maxWidth:760,margin:'40px auto',padding:'0 48px 80px'}}>
        {filteredFaqs.length === 0 ? (
          <div style={{textAlign:'center',padding:'60px',background:'white',borderRadius:20,border:'1px solid #F1F3F9'}}>
            <div style={{fontSize:48,marginBottom:16}}>🔍</div>
            <div style={{fontSize:18,fontWeight:700,color:'#111827',marginBottom:8}}>Aucun résultat</div>
            <div style={{fontSize:14,color:'#6B7280'}}>Essayez d'autres mots-clés ou <a href="/contact" style={{color:'#4A6CF7',fontWeight:600}}>contactez-nous</a>.</div>
          </div>
        ) : filteredFaqs.map(cat => (
          <div key={cat.cat} style={{marginBottom:32}}>
            <div style={{fontSize:16,fontWeight:800,color:'#1B2A5A',marginBottom:12,display:'flex',alignItems:'center',gap:8}}>
              {cat.cat}
            </div>
            <div style={{background:'white',borderRadius:16,border:'1px solid #F1F3F9',overflow:'hidden'}}>
              {cat.items.map((item, i) => {
                const idx = globalIdx++
                const isOpen = open === idx
                return (
                  <div key={i} style={{borderBottom:i < cat.items.length-1?'1px solid #F9FAFB':'none'}}>
                    <button onClick={() => setOpen(isOpen ? null : idx)}
                      style={{width:'100%',padding:'18px 22px',display:'flex',alignItems:'center',justifyContent:'space-between',background:'none',border:'none',cursor:'pointer',fontFamily:'inherit',textAlign:'left',gap:16}}>
                      <span style={{fontSize:14,fontWeight:600,color:'#111827',lineHeight:1.5}}>{item.q}</span>
                      {isOpen ? <ChevronUp size={18} style={{color:'#4A6CF7',flexShrink:0}}/> : <ChevronDown size={18} style={{color:'#9CA3AF',flexShrink:0}}/>}
                    </button>
                    {isOpen && (
                      <div style={{padding:'0 22px 18px',fontSize:14,color:'#374151',lineHeight:1.8,borderTop:'1px solid #F3F4F6'}}>
                        <div style={{paddingTop:14}}>{item.a}</div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div style={{background:'linear-gradient(135deg,#1B2A5A,#2E3F7A)',borderRadius:20,padding:'32px',textAlign:'center',marginTop:20}}>
          <div style={{fontSize:20,fontWeight:800,color:'white',marginBottom:8}}>Vous n'avez pas trouvé votre réponse ?</div>
          <p style={{fontSize:14,color:'rgba(255,255,255,0.55)',marginBottom:20}}>Notre équipe répond dans les 24 heures ouvrées.</p>
          <a href="/contact">
            <button style={{background:'#4A6CF7',color:'white',border:'none',padding:'12px 28px',borderRadius:11,fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:'inherit',boxShadow:'0 4px 16px rgba(74,108,247,0.4)'}}>
              Contacter l'équipe →
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}