import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

export default function SimpleNav({ backTo = '/', backLabel = 'Retour au site' }) {
  const nav = useNavigate()
  return (
    <nav style={{background:'#1B2A5A',padding:'0 48px',height:64,display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100,boxShadow:'0 2px 20px rgba(0,0,0,0.2)'}}>
      <div onClick={() => nav('/')} style={{cursor:'pointer',lineHeight:1}}>
        <span style={{color:'white',fontWeight:300,fontSize:18,letterSpacing:4}}>AURA</span>
        <span style={{fontSize:9,color:'rgba(255,255,255,0.4)',display:'block',letterSpacing:6,marginTop:1}}>SOCIALS</span>
      </div>
      <button onClick={() => nav(backTo)}
        style={{display:'flex',alignItems:'center',gap:6,background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',color:'white',padding:'8px 16px',borderRadius:10,fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>
        <ChevronLeft size={14}/> {backLabel}
      </button>
    </nav>
  )
}