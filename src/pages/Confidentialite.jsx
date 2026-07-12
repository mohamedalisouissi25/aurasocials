import SimpleNav from '../components/SimpleNav'

const SECTIONS = [
  { title:'1. Responsable du traitement', content:`Le responsable du traitement des données personnelles est Mohamed Ali Souissi, étudiant Bachelor 3 Tech For Business à PSTB, dans le cadre du Projet Technique Tutoré (PTT) 2025/2026.

Contact : contact@aurasocials.com` },
  { title:'2. Données collectées', content:`Lors de votre inscription, nous collectons :
— Prénom, nom et adresse email (obligatoires)
— Nom de l'entreprise ou de l'agence (facultatif)
— Données de connexion (date, heure, adresse IP) à des fins de sécurité

Lors de l'utilisation d'AuraCRM, nous stockons :
— Les informations sur vos clients (noms d'entreprises, secteurs, réseaux sociaux)
— Les publications générées par l'IA et programmées
— Les données analytiques de performance de vos comptes clients

Nous ne collectons jamais : numéros de carte bancaire (traitement par Stripe), mots de passe en clair (hashés avec bcrypt), données biométriques.` },
  { title:'3. Finalités du traitement', content:`Vos données sont utilisées pour :
— Créer et gérer votre compte utilisateur
— Fournir les fonctionnalités d'AuraCRM
— Améliorer la qualité du service
— Vous envoyer des notifications liées au service (avec votre consentement)
— Assurer la sécurité de la Plateforme et prévenir les fraudes
— Respecter nos obligations légales` },
  { title:'4. Base légale', content:`Le traitement de vos données repose sur :
— L'exécution du contrat (utilisation du service que vous avez souscrit)
— Votre consentement (pour les communications marketing)
— Notre intérêt légitime (sécurité, amélioration du service)
— Le respect de nos obligations légales` },
  { title:'5. Destinataires des données', content:`Vos données sont traitées par AuraSocials et ses sous-traitants techniques :
— Railway (hébergement base de données — serveurs EU)
— Vercel (hébergement frontend — réseau mondial CDN)
— Anthropic (traitement IA des prompts — les prompts sont envoyés à l'API Claude)

Nous ne vendons, ne louons et ne partageons jamais vos données avec des tiers à des fins commerciales.` },
  { title:'6. Durée de conservation', content:`Vos données sont conservées pendant la durée de votre compte actif + 3 mois après sa suppression. Les logs de connexion sont conservés 1 an pour des raisons de sécurité. Les données de facturation sont conservées 10 ans conformément aux obligations légales.` },
  { title:'7. Vos droits', content:`Conformément au RGPD, vous disposez des droits suivants :
— Droit d'accès : obtenir une copie de vos données
— Droit de rectification : corriger des données inexactes
— Droit à l'effacement : demander la suppression de vos données
— Droit à la portabilité : recevoir vos données dans un format structuré
— Droit d'opposition : vous opposer à certains traitements

Pour exercer ces droits, contactez : contact@aurasocials.com` },
  { title:'8. Sécurité', content:`Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données :
— Chiffrement HTTPS/TLS pour toutes les communications
— Hashage bcrypt (salt 12) pour les mots de passe
— Authentification JWT avec expiration courte
— Sauvegardes automatiques quotidiennes
— Accès aux données limité aux personnes autorisées` },
]

export default function Confidentialite() {
  return (
    <div style={{minHeight:'100vh',background:'#F8FAFF'}}>
      <SimpleNav/>
      <div style={{background:'linear-gradient(135deg,#1B2A5A,#2E3F7A)',padding:'50px 48px',textAlign:'center'}}>
        <div style={{fontSize:11,fontWeight:700,color:'#93AEFF',letterSpacing:2,textTransform:'uppercase',marginBottom:10}}>🔒 Légal</div>
        <h1 style={{fontSize:34,fontWeight:800,color:'white',marginBottom:8,letterSpacing:-0.5}}>Politique de Confidentialité</h1>
        <p style={{fontSize:14,color:'rgba(255,255,255,0.45)'}}>Dernière mise à jour : 13 juillet 2026</p>
      </div>
      <div style={{maxWidth:760,margin:'40px auto',padding:'0 48px 80px'}}>
        <div style={{background:'white',borderRadius:20,padding:'40px 48px',border:'1px solid #F1F3F9'}}>
          {SECTIONS.map((s,i) => (
            <div key={i} style={{marginBottom:28,paddingBottom:28,borderBottom:i<SECTIONS.length-1?'1px solid #F3F4F6':'none'}}>
              <h2 style={{fontSize:16,fontWeight:800,color:'#1B2A5A',marginBottom:10}}>{s.title}</h2>
              <p style={{fontSize:14,color:'#374151',lineHeight:1.85,whiteSpace:'pre-line'}}>{s.content}</p>
            </div>
          ))}
          <div style={{background:'#EEF1FB',borderRadius:12,padding:'16px 20px'}}>
            <div style={{fontSize:13,fontWeight:700,color:'#4A6CF7',marginBottom:4}}>Délégué à la protection des données</div>
            <div style={{fontSize:13,color:'#374151'}}>Mohamed Ali Souissi · contact@aurasocials.com</div>
          </div>
        </div>
      </div>
    </div>
  )
}