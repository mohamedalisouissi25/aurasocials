import SimpleNav from '../components/SimpleNav'

export default function MentionsLegales() {
  const Section = ({ title, children }) => (
    <div style={{marginBottom:28,paddingBottom:28,borderBottom:'1px solid #F3F4F6'}}>
      <h2 style={{fontSize:16,fontWeight:800,color:'#1B2A5A',marginBottom:12}}>{title}</h2>
      {children}
    </div>
  )
  const P = ({ children }) => (
    <p style={{fontSize:14,color:'#374151',lineHeight:1.85,marginBottom:8}}>{children}</p>
  )
  const Row = ({ label, val }) => (
    <div style={{display:'flex',gap:16,marginBottom:8,fontSize:14}}>
      <span style={{color:'#9CA3AF',width:160,flexShrink:0,fontWeight:600}}>{label}</span>
      <span style={{color:'#374151'}}>{val}</span>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:'#F8FAFF'}}>
      <SimpleNav/>
      <div style={{background:'linear-gradient(135deg,#1B2A5A,#2E3F7A)',padding:'50px 48px',textAlign:'center'}}>
        <div style={{fontSize:11,fontWeight:700,color:'#93AEFF',letterSpacing:2,textTransform:'uppercase',marginBottom:10}}>📋 Légal</div>
        <h1 style={{fontSize:34,fontWeight:800,color:'white',marginBottom:8,letterSpacing:-0.5}}>Mentions Légales</h1>
        <p style={{fontSize:14,color:'rgba(255,255,255,0.45)'}}>Dernière mise à jour : 13 juillet 2026</p>
      </div>
      <div style={{maxWidth:760,margin:'40px auto',padding:'0 48px 80px'}}>
        <div style={{background:'white',borderRadius:20,padding:'40px 48px',border:'1px solid #F1F3F9'}}>

          <Section title="1. Éditeur du site">
            <Row label="Nom" val="Mohamed Ali Souissi"/>
            <Row label="Qualité" val="Étudiant — PTT Bachelor 3 Tech For Business"/>
            <Row label="École" val="PSTB (Paris School of Technology & Business)"/>
            <Row label="Année académique" val="2025 / 2026"/>
            <Row label="Tuteur académique" val="M. Frédéric Guez"/>
            <Row label="Responsable entreprise" val="Mme Emna Souissi"/>
            <Row label="Email" val="contact@aurasocials.com"/>
          </Section>

          <Section title="2. Hébergement">
            <P><strong>Frontend</strong> : Vercel Inc., 340 Pine Street, Suite 1300, San Francisco, CA 94104, USA — vercel.com</P>
            <P><strong>Backend & Base de données</strong> : Railway Corp., San Francisco, USA — railway.app (serveurs hébergés en Europe)</P>
            <P><strong>IA générative</strong> : Anthropic PBC, 548 Market St, PMB 90375, San Francisco, CA 94104, USA — anthropic.com (API Claude)</P>
          </Section>

          <Section title="3. Propriété intellectuelle">
            <P>L'ensemble du contenu du site AuraSocials — code source, design, textes, logos, images — est la propriété exclusive de Mohamed Ali Souissi, sauf mention contraire. Toute reproduction, représentation, modification ou exploitation du site ou de l'un de ses éléments, par quelque procédé que ce soit, sans l'autorisation écrite préalable de l'éditeur est strictement interdite.</P>
            <P>La marque "AuraSocials" et le logo associé sont des créations originales protégées. Lucide React (MIT License) est utilisé pour les icônes. React.js, Node.js, Tailwind CSS et Prisma sont des logiciels open source utilisés sous leurs licences respectives.</P>
          </Section>

          <Section title="4. Technologies utilisées">
            <Row label="Frontend" val="React.js 18 + Vite + Tailwind CSS"/>
            <Row label="Backend" val="Node.js + Express.js"/>
            <Row label="Base de données" val="PostgreSQL + Prisma ORM"/>
            <Row label="IA générative" val="Anthropic Claude API (claude-sonnet-4-6)"/>
            <Row label="Authentification" val="JWT + bcrypt + OAuth2"/>
            <Row label="Internationalisation" val="i18next (50+ langues)"/>
            <Row label="Hébergement" val="Vercel (frontend) + Railway (backend)"/>
            <Row label="Versionning" val="Git + GitHub"/>
          </Section>

          <Section title="5. Limitation de responsabilité">
            <P>AuraSocials est développé dans le cadre d'un projet académique (PTT). L'éditeur s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, l'éditeur ne peut garantir l'exactitude, la complétude et l'actualité des informations diffusées sur ce site.</P>
            <P>L'éditeur décline toute responsabilité pour tout dommage direct ou indirect résultant de l'utilisation du site ou de l'impossibilité d'y accéder.</P>
          </Section>

          <div style={{marginBottom:0,paddingBottom:0}}>
            <h2 style={{fontSize:16,fontWeight:800,color:'#1B2A5A',marginBottom:12}}>6. Contact</h2>
            <P>Pour toute question relative aux présentes mentions légales ou à l'utilisation du site, vous pouvez nous contacter :</P>
            <Row label="Email" val="contact@aurasocials.com"/>
            <Row label="Site web" val="aurasocials-six.vercel.app"/>
          </div>

        </div>
      </div>
    </div>
  )
}