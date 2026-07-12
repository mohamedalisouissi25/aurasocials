import { useState } from 'react'
import { Brain, Wand2, Copy, RefreshCw, Check } from 'lucide-react'

const TEMPLATES = [
  {label:'Post Instagram',icon:'📸',net:'Instagram'},
  {label:'Article LinkedIn',icon:'💼',net:'LinkedIn'},
  {label:'Post Facebook',icon:'👥',net:'Facebook'},
  {label:'Thread X/Twitter',icon:'🐦',net:'Twitter'},
  {label:'Plan mensuel',icon:'📅',net:'Multi-réseaux'},
  {label:'Pack Hashtags',icon:'#️⃣',net:'Tous réseaux'},
]

const MOCK = {
  Instagram:`✨ L'été commence MAINTENANT ! ☀️

Cette saison, on vous propose notre nouvelle collection capsule — pensée pour les journées longues et les soirées qui s'étirent.

🌊 Des matières légères, des coupes fluides, des couleurs qui parlent.

Retrouvez-la dès maintenant en boutique et en ligne — lien dans la bio 👆

#Été2026 #NouvelleCollection #Fashion #Style #Mode #Lifestyle #SummerVibes #Tendances`,

  LinkedIn:`🚀 Comment nous avons augmenté notre engagement LinkedIn de 340% en 3 mois.

Beaucoup de marques publient sur LinkedIn sans stratégie. Voici ce qui change vraiment :

1️⃣ Publier à 7h-8h30 — quand les décideurs commencent leur journée
2️⃣ Structurer le texte pour une lecture rapide (bullets, espaces, émojis sobres)
3️⃣ Interpeller la communauté avec une question finale pertinente
4️⃣ Répondre aux 10 premiers commentaires dans l'heure

Résultat ? Reach x3,4 et +127 prospects qualifiés par mois.

Quelle est votre plus grande difficulté sur LinkedIn ? 👇`,

  Facebook:`🎉 Grande nouvelle pour notre communauté !

Cet été, nous passons à la vitesse supérieure avec des offres exclusives.

👉 -20% sur toute la gamme été
👉 Livraison offerte dès 50€
👉 Retours gratuits 60 jours

Valable jusqu'au 31 juillet — taguez un ami qui adorerait ! 👇`,

  Twitter:`Ce que j'ai appris en gérant les réseaux de 40+ marques 🧵

1/ Le plus grand mythe : "il faut poster tous les jours"
Faux. 3 posts/semaine excellents > 7 médiocres.

2/ L'heure de publication ne fait pas tout. La qualité prime. Toujours.

3/ L'engagement dans l'heure qui suit la publication multiplie votre reach par 3.`,

  'Multi-réseaux':`📅 PLAN ÉDITORIAL JUILLET 2026

SEMAINE 1 (01-07/07)
- Lun 01 — Instagram : Lancement campagne été (Reel 30s)
- Mar 02 — LinkedIn : Article tendances secteur
- Jeu 04 — Facebook : Post promotionnel -20%
- Ven 05 — TikTok : Behind the scenes

SEMAINE 2 (08-14/07)
- Lun 08 — Instagram : Carousel produits bestsellers
- Mer 10 — LinkedIn : Témoignage client
- Ven 12 — Facebook + Instagram : Concours été

[28 publications optimisées sur 4 semaines]`,

  'Tous réseaux':`🏷️ PACK HASHTAGS — Secteur Mode & Lifestyle

📸 INSTAGRAM (30 hashtags) :
#été2026 #fashion #style #mode #ootd #lookdujour #tendances #nouvellecollection #shopping #modeparis #fashionista #outfitoftheday #styleblogger #instagood #fashionblogger #lifestyle #collection2026 #modelife #instafashion #streetstyle

💼 LINKEDIN (10 hashtags) :
#Mode #Fashion #Retail #Ecommerce #MarketingDigital #StratégieMarketing #Innovation #Tendances2026

📊 Engagement attendu : +23% vs hashtags génériques`,
}

export default function CRMAIGenerator() {
  const [prompt, setPrompt] = useState('')
  const [template, setTemplate] = useState(null)
  const [client, setClient] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const generate = () => {
    if (!prompt && !template) return
    setLoading(true); setResult('')
    setTimeout(() => {
      setResult(MOCK[template?.net] || MOCK.Instagram)
      setLoading(false)
    }, 1800)
  }

  const copy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:24}}>
        <div className="crm-ai-icon-box"><Brain size={24} style={{color:'#4A6CF7'}}/></div>
        <div>
          <h2 style={{fontSize:22,fontWeight:800,color:'#111827'}}>Générateur IA de contenu</h2>
          <p style={{fontSize:13,color:'#9CA3AF'}}>Propulsé par Claude — Anthropic · Génération en 2 secondes</p>
        </div>
      </div>
      <div className="crm-ai-page">
        {/* LEFT */}
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div className="crm-card">
            <div style={{fontSize:13,fontWeight:700,color:'#374151',marginBottom:12}}>Type de contenu</div>
            <div className="crm-template-grid">
              {TEMPLATES.map(t => (
                <button key={t.label}
                  onClick={() => setTemplate(template?.label===t.label?null:t)}
                  className={`crm-template-btn ${template?.label===t.label?'selected':''}`}>
                  <span style={{fontSize:18}}>{t.icon}</span>
                  <span style={{fontSize:12}}>{t.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="crm-card" style={{display:'flex',flexDirection:'column',gap:14}}>
            <div>
              <label style={{display:'block',fontSize:13,fontWeight:600,color:'#374151',marginBottom:8}}>Client concerné</label>
              <select className="crm-select" value={client} onChange={e=>setClient(e.target.value)}>
                <option value="">Sélectionner un client...</option>
                {['Nike France','BioNature','TechStart SAS','Café Lumière','Studio Kreativ'].map(c=>(
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{display:'block',fontSize:13,fontWeight:600,color:'#374151',marginBottom:8}}>Instructions</label>
              <textarea className="crm-textarea" rows={4}
                placeholder="Ex: Promouvoir la collection été, ton dynamique, livraison gratuite..."
                value={prompt} onChange={e=>setPrompt(e.target.value)}/>
            </div>
            <button onClick={generate} disabled={loading||(!prompt&&!template)} className="crm-btn" style={{justifyContent:'center',opacity:(loading||(!prompt&&!template))?0.4:1}}>
              {loading ? <><RefreshCw size={15} className="crm-spin"/> Génération en cours...</> : <><Wand2 size={15}/> Générer avec IA Claude</>}
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="crm-card" style={{display:'flex',flexDirection:'column'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
            <span style={{fontSize:14,fontWeight:700,color:'#111827'}}>Résultat généré</span>
            {result && (
              <div style={{display:'flex',gap:8}}>
                <button onClick={generate} style={{background:'none',border:'1.5px solid #E5E7EB',borderRadius:9,padding:'6px 10px',cursor:'pointer',color:'#6B7280'}}>
                  <RefreshCw size={14}/>
                </button>
                <button onClick={copy} className={`crm-copy-btn ${copied?'copied':''}`}>
                  {copied?<><Check size={13}/>Copié !</>:<><Copy size={13}/>Copier</>}
                </button>
              </div>
            )}
          </div>
          {loading ? (
            <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:12}}>
              <div style={{width:44,height:44,border:'3px solid #EEF1FB',borderTopColor:'#4A6CF7',borderRadius:'50%'}} className="crm-spin"/>
              <p style={{fontSize:13,color:'#9CA3AF'}}>Claude génère votre contenu...</p>
            </div>
          ) : result ? (
            <>
              <div className="crm-result-box" style={{flex:1}}>
                <pre className="crm-result-text">{result}</pre>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:14}}>
                <button className="crm-btn crm-btn-sm" style={{justifyContent:'center'}}>📅 Programmer</button>
                <button style={{padding:'9px 14px',borderRadius:9,border:'1.5px solid #E5E7EB',background:'white',fontSize:12,fontWeight:600,cursor:'pointer',color:'#374151'}}>💾 Sauvegarder</button>
              </div>
            </>
          ) : (
            <div className="crm-result-empty" style={{flex:1}}>
              <div className="crm-ai-icon-box"><Brain size={28} style={{color:'#4A6CF7'}}/></div>
              <div>
                <p style={{fontSize:14,fontWeight:600,color:'#374151'}}>Prêt à générer</p>
                <p style={{fontSize:13,color:'#9CA3AF',marginTop:4}}>Choisissez un type de contenu puis cliquez sur Générer</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}