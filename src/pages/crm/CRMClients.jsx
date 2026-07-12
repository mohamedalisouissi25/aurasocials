import { useState } from 'react'
import { Search, Plus, Filter, MoreHorizontal, TrendingUp, TrendingDown } from 'lucide-react'

const CLIENTS = [
  {id:1,name:'Nike France',sector:'Mode & Sport',networks:['IG','LI','TK'],posts:127,reach:'450K',engagement:'4.8%',status:'Actif',color:'#111'},
  {id:2,name:'BioNature',sector:'Santé & Bio',networks:['IG','FB'],posts:89,reach:'120K',engagement:'3.2%',status:'Actif',color:'#059669'},
  {id:3,name:'TechStart SAS',sector:'Tech & SaaS',networks:['LI'],posts:156,reach:'280K',engagement:'5.1%',status:'Actif',color:'#4A6CF7'},
  {id:4,name:'Café Lumière',sector:'Restauration',networks:['IG','FB','TK'],posts:64,reach:'85K',engagement:'6.3%',status:'Actif',color:'#F59E0B'},
  {id:5,name:'Studio Kreativ',sector:'Design',networks:['IG'],posts:43,reach:'62K',engagement:'7.1%',status:'Actif',color:'#EC4899'},
  {id:6,name:'AutoMax SAS',sector:'Automobile',networks:['FB','LI'],posts:38,reach:'95K',engagement:'2.8%',status:'Inactif',color:'#6B7280'},
  {id:7,name:'Clinique Santé+',sector:'Santé',networks:['FB','LI'],posts:72,reach:'140K',engagement:'3.9%',status:'Actif',color:'#EF4444'},
  {id:8,name:'Voyage & Liberté',sector:'Tourisme',networks:['IG','TK','FB'],posts:195,reach:'620K',engagement:'8.2%',status:'Actif',color:'#06B6D4'},
]
const NET_C = {IG:'#E97729',LI:'#0A66C2',FB:'#1877F2',TK:'#111'}

export default function CRMClients() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('Tous')

  const filtered = CLIENTS.filter(c =>
    (filter === 'Tous' || c.status === filter) &&
    (c.name.toLowerCase().includes(search.toLowerCase()) || c.sector.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24}}>
        <div>
          <h2 style={{fontSize:22,fontWeight:800,color:'#111827'}}>Gestion clients</h2>
          <p style={{fontSize:14,color:'#9CA3AF',marginTop:4}}>{CLIENTS.length} clients · {CLIENTS.filter(c=>c.status==='Actif').length} actifs</p>
        </div>
        <button className="crm-btn"><Plus size={16}/> Nouveau client</button>
      </div>

      <div className="crm-kpi-grid" style={{marginBottom:24}}>
        {[['48','Clients actifs','↑ +3 ce mois','#059669'],['1 247','Posts ce mois','↑ +12%','#059669'],['2.4M','Impressions','↑ +8%','#059669'],['87%','Taux de satisfaction','ce trimestre','#4A6CF7']].map(([v,l,d,c])=>(
          <div key={l} className="crm-kpi-card">
            <div className="crm-kpi-value">{v}</div>
            <div style={{fontSize:13,color:'#6B7280',margin:'4px 0'}}>{l}</div>
            <div style={{fontSize:12,fontWeight:600,color:c}}>{d}</div>
          </div>
        ))}
      </div>

      <div className="crm-card" style={{padding:0}}>
        <div className="crm-toolbar">
          <div className="crm-search-wrap">
            <Search size={15} className="crm-search-icon"/>
            <input className="crm-search" placeholder="Rechercher un client..."
              value={search} onChange={e => setSearch(e.target.value)}/>
          </div>
          <div className="crm-filter-group">
            {['Tous','Actif','Inactif'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`crm-filter-btn ${filter === f ? 'active' : ''}`}>{f}</button>
            ))}
          </div>
          <button style={{marginLeft:'auto',padding:'8px',border:'1.5px solid #E5E7EB',borderRadius:9,background:'white',cursor:'pointer',color:'#6B7280'}}>
            <Filter size={15}/>
          </button>
        </div>
        <div className="crm-table-wrap">
          <table className="crm-table">
            <thead>
              <tr>
                {['Client','Secteur','Réseaux','Posts','Reach','Engagement','Statut',''].map(h=>(
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}>
                  <td>
                    <div className="crm-cell-client">
                      <div className="crm-client-av" style={{background:c.color,borderRadius:10,width:36,height:36}}>{c.name[0]}</div>
                      <span style={{fontSize:13,fontWeight:600,color:'#111827'}}>{c.name}</span>
                    </div>
                  </td>
                  <td style={{fontSize:13,color:'#6B7280'}}>{c.sector}</td>
                  <td>
                    <div style={{display:'flex',gap:4}}>
                      {c.networks.map(n=>(
                        <span key={n} className="crm-net-badge" style={{background:NET_C[n]||'#888'}}>{n}</span>
                      ))}
                    </div>
                  </td>
                  <td style={{fontSize:13,fontWeight:700,color:'#111827'}}>{c.posts}</td>
                  <td style={{fontSize:13,color:'#374151'}}>{c.reach}</td>
                  <td>
                    <span style={{fontSize:13,fontWeight:700,color:parseFloat(c.engagement)>=5?'#059669':'#374151',display:'flex',alignItems:'center',gap:4}}>
                      {parseFloat(c.engagement)>=4?<TrendingUp size={13}/>:<TrendingDown size={13}/>}{c.engagement}
                    </span>
                  </td>
                  <td>
                    <span className={`crm-status-badge ${c.status==='Actif'?'crm-status-actif':'crm-status-inactif'}`}>{c.status}</span>
                  </td>
                  <td>
                    <button style={{background:'none',border:'none',cursor:'pointer',color:'#9CA3AF',padding:4,borderRadius:6}}>
                      <MoreHorizontal size={16}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}