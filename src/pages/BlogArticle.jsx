import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, Clock, User, ArrowRight, Share2, BookOpen } from 'lucide-react'
import { ARTICLES } from '../data/articles'

function ContentBlock({ block }) {
  switch (block.type) {
    case 'intro':
      return (
        <p style={{ fontSize:18, color:'#374151', lineHeight:1.8, fontStyle:'italic', borderLeft:'4px solid #4A6CF7', paddingLeft:20, marginBottom:28, background:'#F8FAFF', padding:'16px 20px', borderRadius:'0 12px 12px 0' }}>
          {block.text}
        </p>
      )
    case 'heading':
      return (
        <h2 style={{ fontSize:22, fontWeight:800, color:'#1B2A5A', marginBottom:14, marginTop:36, letterSpacing:-0.3 }}>
          {block.text}
        </h2>
      )
    case 'subheading':
      return (
        <h3 style={{ fontSize:17, fontWeight:700, color:'#2E3F7A', marginBottom:10, marginTop:24 }}>
          {block.text}
        </h3>
      )
    case 'text':
      return (
        <p style={{ fontSize:15.5, color:'#374151', lineHeight:1.85, marginBottom:20 }}>
          {block.text}
        </p>
      )
    case 'list':
      return (
        <ul style={{ marginBottom:20, paddingLeft:0, listStyle:'none' }}>
          {block.items.map((item, i) => (
            <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:10, fontSize:15, color:'#374151', lineHeight:1.65, marginBottom:10, padding:'8px 12px', background:'#F8FAFF', borderRadius:8 }}>
              <span style={{ color:'#4A6CF7', fontWeight:800, flexShrink:0, marginTop:1 }}>✓</span>
              {item}
            </li>
          ))}
        </ul>
      )
    case 'highlight':
      return (
        <div style={{ background:'linear-gradient(135deg,#EEF1FB,#E0E7FF)', border:'1.5px solid #C7D4FB', borderRadius:16, padding:'20px 24px', marginBottom:24 }}>
          <div style={{ fontSize:13, fontWeight:800, color:'#4A6CF7', textTransform:'uppercase', letterSpacing:1, marginBottom:8 }}>
            💡 {block.title}
          </div>
          <p style={{ fontSize:15, color:'#374151', lineHeight:1.75, margin:0 }}>
            {block.text}
          </p>
        </div>
      )
    case 'stat':
      return (
        <div style={{ display:'grid', gridTemplateColumns:`repeat(${block.stats.length},1fr)`, gap:16, marginBottom:24, marginTop:8 }}>
          {block.stats.map((s, i) => (
            <div key={i} style={{ background:'white', border:'1.5px solid #E8ECF8', borderRadius:16, padding:'20px 16px', textAlign:'center', boxShadow:'0 2px 8px rgba(27,42,90,0.05)' }}>
              <div style={{ fontSize:32, fontWeight:800, color:'#1B2A5A', marginBottom:4 }}>{s.val}</div>
              <div style={{ fontSize:12, color:'#6B7280', fontWeight:500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      )
    case 'quote':
      return (
        <blockquote style={{ background:'#0C1635', borderRadius:16, padding:'24px 28px', marginBottom:24, position:'relative' }}>
          <div style={{ fontSize:40, color:'rgba(74,108,247,0.4)', fontFamily:'Georgia', lineHeight:1, marginBottom:8 }}>"</div>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.85)', lineHeight:1.75, fontStyle:'italic', margin:0 }}>
            {block.text}
          </p>
          {block.author && <div style={{ fontSize:13, color:'#93AEFF', marginTop:12, fontWeight:600 }}>— {block.author}</div>}
        </blockquote>
      )
    default:
      return null
  }
}

export default function BlogArticle() {
  const { slug } = useParams()
  const nav = useNavigate()
  const article = ARTICLES.find(a => a.slug === slug)
  const related = ARTICLES.filter(a => a.slug !== slug).slice(0, 2)

  if (!article) return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16, background:'#F8FAFF' }}>
      <div style={{ fontSize:56 }}>😕</div>
      <div style={{ fontSize:20, fontWeight:700, color:'#111827' }}>Article introuvable</div>
      <button onClick={() => nav('/blog')} style={{ background:'#4A6CF7', color:'white', border:'none', padding:'11px 24px', borderRadius:10, fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
        Retour au blog
      </button>
    </div>
  )

  const share = () => {
    navigator.clipboard.writeText(window.location.href)
    alert('Lien copié dans le presse-papiers !')
  }

  return (
    <div style={{ minHeight:'100vh', background:'#F8FAFF' }}>

      {/* Top bar */}
      <div style={{ background:'white', borderBottom:'1px solid #F1F3F9', padding:'14px 48px', display:'flex', alignItems:'center', gap:16, position:'sticky', top:0, zIndex:100 }}>
        <button onClick={() => nav('/blog')}
          style={{ display:'flex', alignItems:'center', gap:6, background:'none', border:'1.5px solid #E5E7EB', color:'#374151', padding:'7px 14px', borderRadius:9, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
          <ChevronLeft size={14}/> Blog
        </button>
        <div style={{ flex:1 }}/>
        <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, color:'#9CA3AF' }}>
          <BookOpen size={13}/> {article.read} de lecture
        </div>
        <button onClick={share}
          style={{ display:'flex', alignItems:'center', gap:6, background:'#EEF1FB', border:'none', color:'#4A6CF7', padding:'7px 14px', borderRadius:9, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
          <Share2 size={13}/> Partager
        </button>
      </div>

      {/* Hero */}
      <div style={{ background:article.bg, padding:'60px 48px 80px', position:'relative', overflow:'hidden' }}>
        <div style={{ maxWidth:720, margin:'0 auto' }}>
          <div style={{ display:'inline-block', fontSize:11, fontWeight:700, color:article.tagColor, background:'rgba(255,255,255,0.7)', padding:'5px 12px', borderRadius:99, marginBottom:16, letterSpacing:0.5, backdropFilter:'blur(8px)' }}>
            {article.tag.toUpperCase()}
          </div>
          <h1 style={{ fontSize:36, fontWeight:800, color:'#1B2A5A', lineHeight:1.2, marginBottom:18, letterSpacing:-0.5 }}>
            {article.title}
          </h1>
          <p style={{ fontSize:16, color:'#4B5563', lineHeight:1.7, marginBottom:24, maxWidth:580 }}>
            {article.excerpt}
          </p>
          {/* Author */}
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ width:44, height:44, borderRadius:12, background:article.authorColor, display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:800, fontSize:16 }}>
              {article.authorInitial}
            </div>
            <div>
              <div style={{ fontSize:14, fontWeight:700, color:'#1B2A5A' }}>{article.author}</div>
              <div style={{ display:'flex', alignItems:'center', gap:10, fontSize:12, color:'#6B7280' }}>
                <span>{article.authorRole}</span>
                <span>·</span>
                <Clock size={11}/> <span>{article.date}</span>
                <span>·</span>
                <span>{article.read} de lecture</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article content */}
      <div style={{ maxWidth:720, margin:'-32px auto 0', padding:'0 48px 60px', position:'relative', zIndex:1 }}>
        {/* Content card */}
        <div style={{ background:'white', borderRadius:24, padding:'40px 48px', boxShadow:'0 8px 40px rgba(27,42,90,0.08)', marginBottom:40 }}>
          {article.content.map((block, i) => (
            <ContentBlock key={i} block={block}/>
          ))}

          {/* CTA */}
          <div style={{ background:'linear-gradient(135deg,#1B2A5A,#2E3F7A)', borderRadius:16, padding:'28px 32px', marginTop:36, textAlign:'center' }}>
            <div style={{ fontSize:20, fontWeight:800, color:'white', marginBottom:8 }}>
              Prêt à appliquer ces conseils ?
            </div>
            <p style={{ fontSize:14, color:'rgba(255,255,255,0.55)', marginBottom:20 }}>
              AuraSocials vous donne tous les outils pour mettre en pratique ces stratégies dès aujourd'hui.
            </p>
            <button onClick={() => nav('/payment')}
              style={{ background:'#4A6CF7', color:'white', border:'none', padding:'13px 32px', borderRadius:11, fontSize:15, fontWeight:700, cursor:'pointer', fontFamily:'inherit', boxShadow:'0 4px 16px rgba(74,108,247,0.4)' }}>
              Démarrer avec AuraSocials →
            </button>
          </div>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div>
            <h3 style={{ fontSize:18, fontWeight:800, color:'#1B2A5A', marginBottom:16 }}>Articles similaires</h3>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              {related.map(rel => (
                <div key={rel.slug}
                  onClick={() => { nav(`/blog/${rel.slug}`); window.scrollTo(0,0) }}
                  style={{ background:'white', borderRadius:16, overflow:'hidden', border:'1.5px solid #E8ECF8', cursor:'pointer', transition:'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.borderColor='#4A6CF7' }}
                  onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.borderColor='#E8ECF8' }}>
                  <div style={{ height:90, background:rel.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:36 }}>
                    {rel.emoji}
                  </div>
                  <div style={{ padding:16 }}>
                    <div style={{ fontSize:10, fontWeight:700, color:rel.tagColor, letterSpacing:0.5, marginBottom:6 }}>
                      {rel.tag.toUpperCase()}
                    </div>
                    <div style={{ fontSize:13, fontWeight:700, color:'#1B2A5A', lineHeight:1.4, marginBottom:8 }}>
                      {rel.title}
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:11, color:'#4A6CF7', fontWeight:700 }}>
                      Lire l'article <ArrowRight size={11}/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}