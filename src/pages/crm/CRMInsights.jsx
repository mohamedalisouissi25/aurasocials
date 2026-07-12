import { useState } from 'react'
import { Brain, Zap, RefreshCw, TrendingUp, AlertTriangle, Recycle, Users, Clock } from 'lucide-react'

const POSTS_TO_SCORE = [
  { text:"Collection été 2026 — Des couleurs qui parlent ✨ #fashion", net:'IG', client:'Nike France' },
  { text:"Comment augmenter son engagement LinkedIn de 340% en 3 mois 🚀", net:'LI', client:'TechStart SAS' },
  { text:"Nouvelle gamme BIO certifiée 🌿 — disponible maintenant !", net:'FB', client:'BioNature' },
]

const COMPETITORS = [
  { name:'HubSpot Social', color:'#F97316', posts:142, growth:'+4%', threat:'Moyen' },
  { name:'Hootsuite',      color:'#8B5CF6', posts:211, growth:'+2%', threat:'Faible' },
  { name:'Buffer',         color:'#0EA5E9', posts:98,  growth:'+1%', threat:'Faible' },
  { name:'Sprout Social',  color:'#059669', posts:176, growth:'+7%', threat:'Élevé'  },
]

const TOP_POSTS = [
  { score:94, text:"Collection été 2026 — Des couleurs qui parlent ✨", net:'IG', client:'Nike France'   },
  { score:88, text:"Comment augmenter son engagement LinkedIn de 340%", net:'LI', client:'TechStart SAS' },
  { score:81, text:"Top 5 destinations été 2026 ✈️",                   net:'TK', client:'Voyage & Liberté'},
  { score:79, text:"Behind the scenes — identité visuelle 🎨",         net:'IG', client:'Studio Kreativ' },
]

const BRAND_VOICES = [
  { client:'Nike France',   tone:'Inspirant', energy:'Élevée', formality:'Décontracté', consistency:92, color:'#111' },
  { client:'BioNature',     tone:'Authentique',energy:'Calme', formality:'Naturel',     consistency:87, color:'#059669' },
  { client:'TechStart SAS', tone:'Expert',    energy:'Neutre', formality:'Professionnel',consistency:95, color:'#4A6CF7' },
]

const TIME_HEATMAP = {
  IG: [[0,0,0,0,0,1,2],[1,2,3,4,5,8,9],[7,6,5,4,3,2,1],[0,1,2,3,4,5,6],[5,4,3,2,1,0,0],[3,2,1,0,1,2,3],[4,5,6,7,8,9,8],[8,7,6,5,4,3,2],[3,4,5,6,7,8,7],[6,5,4,3,2,1,0],[1,2,3,4,5,6,5],[4,5,6,7,8,9,8],[9,8,7,6,5,4,3],[3,4,5,6,5,4,3],[4,5,6,7,6,5,4],[5,6,7,8,7,6,5],[6,7,8,9,8,7,6],[7,8,9,8,7,6,5],[6,7,8,7,6,5,4],[5,6,5,4,3,2,1],[4,3,2,1,0,1,2],[3,2,1,0,1,2,3],[2,1,0,1,2,3,2],[1,0,0,0,0,0,1]],
}

function heatColor(val) {
  if (val >= 8) return { bg:'#4A6CF7', color:'white' }
  if (val >= 5) return { bg:'#93C5FD', color:'#1B2A5A' }
  if (val >= 2) return { bg:'#EEF1FB', color:'#6B7280' }
  return { bg:'#F9FAFB', color:'#E5E7EB' }
}

export default function CRMInsights() {
  const [scoreIdx, setScoreIdx] = useState(null)
  const [scoring,  setScoring]  = useState(false)
  const [scores,   setScores]   = useState({})
  const [netHeat,  setNetHeat]  = useState('IG')
  const [crisisFilter, setCrisisFilter] = useState('all')

  const runScore = (i) => {
    setScoring(true); setScoreIdx(i)
    setTimeout(() => {
      const s = { total: Math.floor(Math.random()*25)+70, engagement:Math.floor(Math.random()*30)+65, reach:Math.floor(Math.random()*30)+60, timing:Math.floor(Math.random()*30)+65, hashtags:Math.floor(Math.random()*30)+70 }
      setScores({...scores, [i]: s}); setScoring(false)
    }, 1600)
  }

  const CRISIS = [
    { type:'warning', text:'Commentaires négatifs en hausse (+34%) sur Nike France Instagram', time:'Il y a 12 min', client:'Nike France', net:'IG' },
    { type:'ok',      text:'Sentiment positif stable — BioNature Facebook', time:'Il y a 1h',     client:'BioNature',  net:'FB' },
    { type:'danger',  text:'Mention négative virale détectée — TechStart SAS LinkedIn (450 partages)', time:'Il y a 35 min', client:'TechStart SAS', net:'LI' },
    { type:'ok',      text:'Engagement en hausse de 28% — Café Lumière Instagram', time:'Il y a 2h', client:'Café Lumière', net:'IG' },
    { type:'warning', text:'Réponse attendue depuis 4h sur commentaire client — Studio Kreativ', time:'Il y a 4h', client:'Studio Kreativ', net:'IG' },
  ]

  const filteredCrisis = crisisFilter === 'all' ? CRISIS : CRISIS.filter(c => c.type === crisisFilter)

  return (
    <div>
      <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:28}}>
        <div style={{width:48,height:48,background:'linear-gradient(135deg,#4A6CF7,#8B5CF6)',borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <Brain size={24} style={{color:'white'}}/>
        </div>
        <div>
          <h2 style={{fontSize:22,fontWeight:800,color:'#111827'}}>Insights IA</h2>
          <p style={{fontSize:13,color:'#9CA3AF'}}>Fonctionnalités exclusives AuraSocials — introuvables ailleurs</p>
        </div>
        <div style={{marginLeft:'auto',display:'flex',gap:8}}>
          {['Unique','Exclusif','IA Native'].map(tag => (
            <span key={tag} style={{fontSize:11,fontWeight:700,padding:'4px 10px',background:'linear-gradient(135deg,#4A6CF7,#8B5CF6)',color:'white',borderRadius:99}}>{tag}</span>
          ))}
        </div>
      </div>

      <div className="insights-grid">

        {/* ── 1. AI CONTENT SCORE ── */}
        <div className="insight-card">
          <div className="insight-card-header">
            <div className="insight-icon" style={{background:'#EEF1FB'}}>🎯</div>
            <div>
              <div className="insight-title">Content Score IA</div>
              <div className="insight-sub">Score d'engagement prévu avant publication · Unique AuraSocials</div>
            </div>
          </div>
          {POSTS_TO_SCORE.map((p, i) => (
            <div key={i} style={{background:'#F8FAFF',borderRadius:12,padding:'14px',marginBottom:10,border:'1px solid #E8ECF8'}}>
              <div style={{fontSize:12,color:'#374151',marginBottom:8,fontWeight:500}}>{p.text}</div>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                <span style={{fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:99,background:'#EEF1FB',color:'#4A6CF7'}}>{p.net}</span>
                <span style={{fontSize:11,color:'#9CA3AF'}}>{p.client}</span>
              </div>
              {scores[i] ? (
                <div>
                  <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:10}}>
                    <div className="score-circle" style={{background:scores[i].total>=80?'#059669':scores[i].total>=65?'#F59E0B':'#EF4444'}}>
                      <span style={{fontSize:18}}>{scores[i].total}</span>
                      <span style={{fontSize:9,opacity:0.8}}>/100</span>
                    </div>
                    <div style={{flex:1}}>
                      {[['Engagement',scores[i].engagement],['Reach',scores[i].reach],['Timing',scores[i].timing],['Hashtags',scores[i].hashtags]].map(([l,v])=>(
                        <div key={l} className="score-bar-wrap" style={{marginBottom:5}}>
                          <div className="score-bar-label" style={{width:80,fontSize:11}}>{l}</div>
                          <div className="score-bar-bg">
                            <div className="score-bar-fill" style={{width:`${v}%`,background:v>=80?'#059669':v>=65?'#F59E0B':'#EF4444'}}/>
                          </div>
                          <div className="score-bar-val" style={{fontSize:11}}>{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{fontSize:11,color:scores[i].total>=80?'#059669':'#F59E0B',fontWeight:600}}>
                    {scores[i].total>=80?'✓ Excellent — Publiez maintenant !':scores[i].total>=65?'⚡ Bon — Quelques ajustements suggérés':'⚠️ Améliorez avant de publier'}
                  </div>
                </div>
              ) : (
                <button onClick={() => runScore(i)} disabled={scoring && scoreIdx===i}
                  style={{width:'100%',background:'#4A6CF7',color:'white',border:'none',borderRadius:8,padding:'8px',fontSize:12,fontWeight:700,cursor:'pointer',fontFamily:'inherit',display:'flex',alignItems:'center',justifyContent:'center',gap:6}}>
                  {scoring && scoreIdx===i ? <><RefreshCw size={13} style={{animation:'spin 1s linear infinite'}}/> Analyse en cours...</> : <><Zap size={13}/> Analyser ce post</>}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* ── 2. OPTIMAL TIME PREDICTOR ── */}
        <div className="insight-card">
          <div className="insight-card-header">
            <div className="insight-icon" style={{background:'#FEF3C7'}}>⏰</div>
            <div>
              <div className="insight-title">Optimal Time Predictor</div>
              <div className="insight-sub">Meilleure heure de publication par réseau et par audience</div>
            </div>
          </div>
          <div style={{display:'flex',gap:8,marginBottom:14}}>
            {['IG','LI','FB','TK'].map(n => (
              <button key={n} onClick={() => setNetHeat(n)}
                style={{flex:1,padding:'7px',borderRadius:8,border:`1.5px solid ${netHeat===n?'#4A6CF7':'#E5E7EB'}`,background:netHeat===n?'#EEF1FB':'white',color:netHeat===n?'#4A6CF7':'#374151',fontSize:12,fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}>
                {n}
              </button>
            ))}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:3,marginBottom:8}}>
            {['L','M','M','J','V','S','D'].map((d,i) => <div key={i} style={{fontSize:10,color:'#9CA3AF',textAlign:'center',fontWeight:600}}>{d}</div>)}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:3}}>
            {TIME_HEATMAP.IG.slice(6,20).map((row, h) => row.map((val, d) => {
              const style = heatColor(val)
              return (
                <div key={`${h}-${d}`} className="time-cell"
                  style={{background:style.bg,color:style.color,fontSize:val>0?'9px':'0px'}}>
                  {val >= 7 ? '🔥' : ''}
                </div>
              )
            }))}
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8,marginTop:12,flexWrap:'wrap'}}>
            <div style={{display:'flex',alignItems:'center',gap:4}}><div style={{width:10,height:10,borderRadius:3,background:'#4A6CF7'}}/><span style={{fontSize:11,color:'#9CA3AF'}}>Pic</span></div>
            <div style={{display:'flex',alignItems:'center',gap:4}}><div style={{width:10,height:10,borderRadius:3,background:'#93C5FD'}}/><span style={{fontSize:11,color:'#9CA3AF'}}>Bon</span></div>
            <div style={{display:'flex',alignItems:'center',gap:4}}><div style={{width:10,height:10,borderRadius:3,background:'#EEF1FB'}}/><span style={{fontSize:11,color:'#9CA3AF'}}>Moyen</span></div>
          </div>
          <div style={{marginTop:16,background:'linear-gradient(135deg,#4A6CF7,#8B5CF6)',borderRadius:12,padding:'14px',color:'white'}}>
            <div style={{fontSize:12,fontWeight:700,marginBottom:4}}>🔥 Pic optimal cette semaine</div>
            <div style={{fontSize:20,fontWeight:800}}>Jeudi 19h – 21h</div>
            <div style={{fontSize:12,opacity:0.8,marginTop:3}}>Audience active : +340% vs moyenne · Taux d'engagement prévu : 8.2%</div>
          </div>
        </div>

        {/* ── 3. BRAND VOICE GUARDIAN ── */}
        <div className="insight-card">
          <div className="insight-card-header">
            <div className="insight-icon" style={{background:'#D1FAE5'}}>🎙️</div>
            <div>
              <div className="insight-title">Brand Voice Guardian</div>
              <div className="insight-sub">Vérifie que chaque publication correspond à l'ADN de la marque</div>
            </div>
          </div>
          {BRAND_VOICES.map(v => (
            <div key={v.client} style={{padding:'12px 14px',background:'#F8FAFF',borderRadius:12,marginBottom:10,border:'1px solid #E8ECF8'}}>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
                <div style={{width:32,height:32,borderRadius:8,background:v.color,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:12,fontWeight:800}}>{v.client[0]}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:700,color:'#111827'}}>{v.client}</div>
                  <div style={{fontSize:11,color:'#9CA3AF'}}>Cohérence de marque</div>
                </div>
                <div style={{textAlign:'center'}}>
                  <div style={{fontSize:20,fontWeight:800,color:v.consistency>=90?'#059669':'#F59E0B'}}>{v.consistency}%</div>
                </div>
              </div>
              <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                {[{l:`🎭 ${v.tone}`,c:'#EEF1FB',tc:'#4A6CF7'},{l:`⚡ ${v.energy}`,c:'#FEF3C7',tc:'#D97706'},{l:`👔 ${v.formality}`,c:'#D1FAE5',tc:'#059669'}].map(tag=>(
                  <span key={tag.l} style={{padding:'4px 10px',background:tag.c,borderRadius:99,fontSize:11,fontWeight:600,color:tag.tc}}>{tag.l}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── 4. CRISIS RADAR ── */}
        <div className="insight-card">
          <div className="insight-card-header">
            <div className="insight-icon" style={{background:'#FEE2E2'}}>🚨</div>
            <div>
              <div className="insight-title">Crisis Radar</div>
              <div className="insight-sub">Détection en temps réel des pics de sentiment négatif</div>
            </div>
          </div>
          <div style={{display:'flex',gap:6,marginBottom:14}}>
            {[['all','Tout'],['danger','⚠️ Urgent'],['warning','Attention'],['ok','Normal']].map(([f,l])=>(
              <button key={f} onClick={() => setCrisisFilter(f)}
                style={{padding:'5px 10px',borderRadius:8,border:`1.5px solid ${crisisFilter===f?'#4A6CF7':'#E5E7EB'}`,background:crisisFilter===f?'#EEF1FB':'white',color:crisisFilter===f?'#4A6CF7':'#6B7280',fontSize:11,fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>
                {l}
              </button>
            ))}
          </div>
          {filteredCrisis.map((c,i) => (
            <div key={i} className="crisis-row" style={{background:c.type==='danger'?'#FEF2F2':c.type==='warning'?'#FFFBEB':'#F0FDF4',marginBottom:8,borderRadius:10}}>
              <div className="crisis-dot" style={{background:c.type==='danger'?'#EF4444':c.type==='warning'?'#F59E0B':'#059669'}}/>
              <div style={{flex:1}}>
                <div className="crisis-text" style={{fontSize:12}}>{c.text}</div>
                <div style={{fontSize:10,color:'#9CA3AF',marginTop:3}}>{c.time} · {c.client}</div>
              </div>
              {c.type !== 'ok' && (
                <button style={{padding:'4px 10px',background:'white',border:'1.5px solid #E5E7EB',borderRadius:7,fontSize:11,fontWeight:600,cursor:'pointer',color:'#374151',fontFamily:'inherit',whiteSpace:'nowrap'}}>Gérer</button>
              )}
            </div>
          ))}
        </div>

        {/* ── 5. CONTENT RECYCLER ── */}
        <div className="insight-card">
          <div className="insight-card-header">
            <div className="insight-icon" style={{background:'#EDE9FE'}}>♻️</div>
            <div>
              <div className="insight-title">Content Recycler IA</div>
              <div className="insight-sub">Réutilise tes meilleurs posts en les reformulant — zéro copier-coller</div>
            </div>
          </div>
          <div style={{fontSize:12,color:'#9CA3AF',marginBottom:10,fontWeight:600}}>TOP PERFORMERS À RECYCLER :</div>
          {TOP_POSTS.map((p,i) => (
            <div key={i} className="recycle-row">
              <div className="recycle-score">{p.score}</div>
              <div className="recycle-text">
                <div style={{fontWeight:600,color:'#111827',marginBottom:2}}>{p.text}</div>
                <div style={{fontSize:10,color:'#9CA3AF'}}>{p.client} · {p.net}</div>
              </div>
              <button className="recycle-btn">♻️ Recycler</button>
            </div>
          ))}
          <div style={{marginTop:12,padding:'12px 14px',background:'linear-gradient(135deg,#7C3AED,#4A6CF7)',borderRadius:12,color:'white',fontSize:12}}>
            <div style={{fontWeight:700,marginBottom:4}}>🤖 L'IA reformule automatiquement</div>
            <div style={{opacity:0.8}}>Même idée, nouveau format, nouveau réseau. Multipliez votre ROI par 4.</div>
          </div>
        </div>

        {/* ── 6. COMPETITOR PULSE ── */}
        <div className="insight-card">
          <div className="insight-card-header">
            <div className="insight-icon" style={{background:'#FEF3C7'}}>👁️</div>
            <div>
              <div className="insight-title">Competitor Pulse</div>
              <div className="insight-sub">Surveillance de la concurrence — CRM alternatifs et agences concurrentes</div>
            </div>
          </div>
          <div style={{display:'flex',gap:12,marginBottom:16}}>
            {[['4','Concurrents suivis'],['↑24%','Votre avance'],['🥇','Position marché']].map(([v,l])=>(
              <div key={l} style={{flex:1,background:'#F8FAFF',borderRadius:10,padding:'10px',textAlign:'center',border:'1px solid #E8ECF8'}}>
                <div style={{fontSize:18,fontWeight:800,color:'#111827'}}>{v}</div>
                <div style={{fontSize:10,color:'#9CA3AF',marginTop:2}}>{l}</div>
              </div>
            ))}
          </div>
          {COMPETITORS.map(c => (
            <div key={c.name} className="competitor-row">
              <div className="competitor-av" style={{background:c.color}}>{c.name[0]}</div>
              <div style={{flex:1}}>
                <div className="competitor-name">{c.name}</div>
                <div className="competitor-stat">{c.posts} posts/mois</div>
              </div>
              <div style={{textAlign:'center',marginRight:12}}>
                <div className="competitor-delta" style={{color:c.threat==='Élevé'?'#EF4444':c.threat==='Moyen'?'#F59E0B':'#059669'}}>{c.growth}</div>
              </div>
              <span style={{fontSize:11,fontWeight:700,padding:'3px 10px',borderRadius:99,background:c.threat==='Élevé'?'#FEE2E2':c.threat==='Moyen'?'#FEF3C7':'#D1FAE5',color:c.threat==='Élevé'?'#DC2626':c.threat==='Moyen'?'#D97706':'#059669'}}>
                {c.threat}
              </span>
            </div>
          ))}
          <div style={{marginTop:14,padding:'12px',background:'#D1FAE5',borderRadius:10,fontSize:12,color:'#065F46',fontWeight:600}}>
            🏆 AuraSocials publie 34% plus de contenu que la moyenne concurrente avec 70% moins d'effort.
          </div>
        </div>

      </div>
    </div>
  )
}