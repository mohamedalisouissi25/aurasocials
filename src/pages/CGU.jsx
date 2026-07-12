import SimpleNav from '../components/SimpleNav'

const SECTIONS = [
  { title:'1. Objet', content:`Les présentes Conditions Générales d'Utilisation (CGU) régissent l'utilisation de la plateforme AuraSocials (ci-après "la Plateforme"), accessible à l'adresse aurasocials-six.vercel.app, et développée par Mohamed Ali Souissi dans le cadre d'un Projet Technique Tutoré (PTT) — Bachelor 3 Tech For Business, PSTB 2025/2026.

En accédant à la Plateforme, vous acceptez sans réserve les présentes CGU. Si vous n'acceptez pas ces conditions, vous devez cesser d'utiliser la Plateforme.` },
  { title:'2. Description du service', content:`AuraSocials est une plateforme SaaS combinant un site web vitrine et AuraCRM, un outil de gestion des réseaux sociaux propulsé par l'intelligence artificielle (API Claude d'Anthropic). La Plateforme permet aux agences de communication de gérer les comptes réseaux sociaux de leurs clients, de générer du contenu automatiquement et d'analyser les performances.

Les services incluent : tableau de bord analytique, générateur de contenu IA, calendrier éditorial, gestion des clients, insights IA avancés.` },
  { title:'3. Inscription et compte utilisateur', content:`Pour utiliser AuraCRM, vous devez créer un compte en fournissant une adresse email valide, un mot de passe sécurisé (minimum 8 caractères) et votre nom. Vous êtes responsable de la confidentialité de vos identifiants de connexion.

Vous pouvez également vous inscrire via Google OAuth2 ou LinkedIn OAuth2. Dans ce cas, les informations de votre profil social sont importées avec votre consentement.

Vous garantissez que les informations fournies lors de l'inscription sont exactes et à jour. AuraSocials se réserve le droit de suspendre ou supprimer tout compte en cas d'informations incorrectes ou de violation des présentes CGU.` },
  { title:'4. Propriété intellectuelle', content:`La Plateforme AuraSocials, son code source, son design, ses textes, ses logos et tous ses éléments constitutifs sont la propriété exclusive de Mohamed Ali Souissi. Toute reproduction, distribution ou utilisation commerciale sans autorisation préalable est strictement interdite.

Le contenu généré par l'IA pour vos clients vous appartient intégralement une fois généré sur la Plateforme. AuraSocials ne revendique aucun droit sur le contenu produit via le générateur IA.` },
  { title:'5. Utilisation acceptable', content:`Vous vous engagez à utiliser la Plateforme conformément aux lois applicables et à ne pas :
— Utiliser la Plateforme à des fins illicites ou frauduleuses
— Tenter d'accéder aux données d'autres utilisateurs
— Reproduire, vendre ou exploiter commercialement la Plateforme sans autorisation
— Publier du contenu illégal, diffamatoire ou portant atteinte aux droits de tiers via les outils de publication
— Utiliser le générateur IA pour produire du contenu haineux, discriminatoire ou trompeur` },
  { title:'6. Limitation de responsabilité', content:`AuraSocials est fournie "en l'état". Dans les limites permises par la loi applicable, Mohamed Ali Souissi décline toute responsabilité pour :
— Les interruptions ou indisponibilités de la Plateforme
— La perte de données résultant d'un événement indépendant de notre volonté
— Les dommages indirects résultant de l'utilisation de la Plateforme
— La qualité ou exactitude du contenu généré par l'IA

L'utilisateur est seul responsable de la validation et de la publication du contenu généré.` },
  { title:'7. Modification des CGU', content:`AuraSocials se réserve le droit de modifier les présentes CGU à tout moment. Les modifications entrent en vigueur dès leur publication sur la Plateforme. L'utilisation continuée de la Plateforme après modification constitue une acceptation des nouvelles CGU. Nous vous recommandons de consulter régulièrement cette page.` },
  { title:'8. Droit applicable', content:`Les présentes CGU sont régies par le droit tunisien. Tout litige relatif à l'interprétation ou à l'exécution des présentes CGU sera soumis aux tribunaux compétents de Tunis, Tunisie.

Pour toute question relative aux présentes CGU, contactez-nous à : contact@aurasocials.com` },
]

export default function CGU() {
  return (
    <div style={{minHeight:'100vh',background:'#F8FAFF'}}>
      <SimpleNav/>
      <div style={{background:'linear-gradient(135deg,#1B2A5A,#2E3F7A)',padding:'50px 48px',textAlign:'center'}}>
        <div style={{fontSize:11,fontWeight:700,color:'#93AEFF',letterSpacing:2,textTransform:'uppercase',marginBottom:10}}>⚖️ Légal</div>
        <h1 style={{fontSize:34,fontWeight:800,color:'white',marginBottom:8,letterSpacing:-0.5}}>Conditions Générales d'Utilisation</h1>
        <p style={{fontSize:14,color:'rgba(255,255,255,0.45)'}}>Dernière mise à jour : 13 juillet 2026</p>
      </div>
      <div style={{maxWidth:760,margin:'40px auto',padding:'0 48px 80px'}}>
        <div style={{background:'white',borderRadius:20,padding:'40px 48px',border:'1px solid #F1F3F9'}}>
          {SECTIONS.map((s,i) => (
            <div key={i} style={{marginBottom:30,paddingBottom:30,borderBottom:i<SECTIONS.length-1?'1px solid #F3F4F6':'none'}}>
              <h2 style={{fontSize:16,fontWeight:800,color:'#1B2A5A',marginBottom:12}}>{s.title}</h2>
              <p style={{fontSize:14,color:'#374151',lineHeight:1.85,whiteSpace:'pre-line'}}>{s.content}</p>
            </div>
          ))}
          <div style={{background:'#EEF1FB',borderRadius:12,padding:'16px 20px',marginTop:8}}>
            <div style={{fontSize:13,fontWeight:700,color:'#4A6CF7',marginBottom:4}}>Contact</div>
            <div style={{fontSize:13,color:'#374151'}}>Pour toute question : <strong>contact@aurasocials.com</strong> · Mohamed Ali Souissi · PTT PSTB 2025/2026</div>
          </div>
        </div>
      </div>
    </div>
  )
}