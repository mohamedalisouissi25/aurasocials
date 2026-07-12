import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Clock, User, ArrowRight, ChevronLeft } from 'lucide-react'
import { ARTICLES } from '../data/articles'

const ALL_TAGS = ['Tous', ...new Set(ARTICLES.map(a => a.tag))]

export default function Blog() {
  const nav = useNavigate()
  const [search,  setSearch]  = useState('')
  const [tag,     setTag]     = useState('Tous')

  const filtered = ARTICLES.filter(a =>
    (tag === 'Tous' || a.tag === tag) &&
    (a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div style={{ minHeight:'100vh', background:'#F8FAFF' }}>

      {/* Header */}
      <div style={{ background:'#1B2A5A', padding:'60px 48px 80px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 20% 50%, rgba(74,108,247,0.3) 0%, transparent 60%)', pointerEvents:'none' }}/>
        <div style={{ maxWidth:900, margin:'0 auto', position:'relative', zIndex:1 }}>
          <button onClick={() => nav('/')}
            style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', color:'white', padding:'8px 16px', borderRadius:10, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit', marginBottom:32 }}>
            <ChevronLeft size={15}/> Retour au site
          </button>
          <div style={{ fontSize:11, fontWeight:700, color:'#93AEFF', letterSpacing:2, textTransform:'uppercase', marginBottom:12 }}>📝 Blog AuraSocials</div>
          <h1 style={{ fontSize:42, fontWeight:800, color:'white', lineHeight:1.15, marginBottom:14, letterSpacing:-1 }}>
            Ressources & Actualités
          </h1>
          <p style={{ fontSize:17, color:'rgba(255,255,255,0.55)', maxWidth:560, lineHeight:1.7 }}>
            Stratégies, analyses et guides pratiques pour dominer le social media en 2026.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ maxWidth:900, margin:'-28px auto 0', padding:'0 48px', position:'relative', zIndex:2 }}>
        <div style={{ background:'white', borderRadius:16, padding:'16px 20px', boxShadow:'0 8px 32px rgba(27,42,90,0.1)', display:'flex', gap:12, alignItems:'center' }}>
          <div style={{ position:'relative', flex:1 }}>
            <Search size={15} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'#9CA3AF' }}/>
            <input
              style={{ width:'100%', padding:'10px 12px 10px 36px', border:'1.5px solid #E5E7EB', borderRadius:10, fontSize:14, fontFamily:'inherit', outline:'none', color:'#111827' }}
              placeholder="Rechercher un article..."
              value={search} onChange={e => setSearch(e.target.value)}/>
          </div>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            {ALL_TAGS.map(t => (
              <button key={t} onClick={() => setTag(t)}
                style={{ padding:'8px 14px', borderRadius:99, border:`1.5px solid ${tag===t?'#4A6CF7':'#E5E7EB'}`, background:tag===t?'#4A6CF7':'white', color:tag===t?'white':'#6B7280', fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'inherit', transition:'all 0.15s', whiteSpace:'nowrap' }}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles grid */}
      <div style={{ maxWidth:900, margin:'40px auto 60px', padding:'0 48px' }}>
        <div style={{ fontSize:13, color:'#9CA3AF', marginBottom:20 }}>
          {filtered.length} article{filtered.length > 1 ? 's' : ''} {tag !== 'Tous' ? `en "${tag}"` : ''}
        </div>
        {filtered.length === 0 ? (
          <div style={{ textAlign:'center', padding:'80px 20px' }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🔍</div>
            <div style={{ fontSize:18, fontWeight:700, color:'#111827', marginBottom:8 }}>Aucun article trouvé</div>
            <div style={{ fontSize:14, color:'#9CA3AF' }}>Essayez un autre mot-clé ou catégorie.</div>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px,1fr))', gap:24 }}>
            {filtered.map(article => (
              <div key={article.slug}
                onClick={() => nav(`/blog/${article.slug}`)}
                style={{ background:'white', borderRadius:20, overflow:'hidden', border:'1.5px solid #E8ECF8', cursor:'pointer', transition:'all 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow='0 24px 60px rgba(27,42,90,0.1)'; e.currentTarget.style.borderColor='#4A6CF7' }}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.borderColor='#E8ECF8' }}>
                {/* Thumb */}
                <div style={{ height:160, background:article.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:56 }}>
                  {article.emoji}
                </div>
                {/* Body */}
                <div style={{ padding:24 }}>
                  <div style={{ display:'inline-block', fontSize:11, fontWeight:700, color:article.tagColor, background:article.tagBg, padding:'4px 10px', borderRadius:99, marginBottom:10, letterSpacing:0.5 }}>
                    {article.tag.toUpperCase()}
                  </div>
                  <div style={{ fontSize:16, fontWeight:700, color:'#1B2A5A', lineHeight:1.45, marginBottom:10 }}>
                    {article.title}
                  </div>
                  <div style={{ fontSize:13, color:'#6B7280', lineHeight:1.65, marginBottom:16 }}>
                    {article.excerpt}
                  </div>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, color:'#9CA3AF' }}>
                      <User size={12}/> {article.author}
                      &nbsp;·&nbsp;
                      <Clock size={12}/> {article.read}
                    </div>
                    <div style={{ color:'#4A6CF7', display:'flex', alignItems:'center', gap:4, fontSize:12, fontWeight:700 }}>
                      Lire <ArrowRight size={12}/>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}