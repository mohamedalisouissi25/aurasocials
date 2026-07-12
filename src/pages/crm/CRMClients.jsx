import { useState } from 'react'
import { Search, Plus, Filter, Trash2, TrendingUp, TrendingDown, X } from 'lucide-react'

const INIT_CLIENTS = [
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
const ALL_NETS = ['IG','LI','FB','TK']
const SECTORS = ['Mode & Sport','Santé & Bio','Tech & SaaS','Restauration','Design','Automobile','Santé','Tourisme','Finance','Éducation','Immobilier','Autre']
const COLORS = ['#111','#059669','#4A6CF7','#F59E0B','#EC4899','#EF4444','#06B6D4','#8B5CF6','#F97316','#0EA5E9']

function Toast({ msg }) {
  return msg ? <div className="toast">✓ &nbsp;{msg}</div> : null
}

export default function CRMClients() {
  const [clients, setClients] = useState(INIT_CLIENTS)
  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState('Tous')
  const [modal, setModal]     = useState(false)
  const [toast, setToast]     = useState('')
  const [form, setForm]       = useState({ name:'', sector:'Mode & Sport', networks:['IG'], status:'Actif' })

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2800)
  }

  const filtered = clients.filter(c =>
    (filter==='Tous' || c.status===filter) &&
    (c.name.toLowerCase().includes(search.toLowerCase()) || c.sector.toLowerCase().includes(search.toLowerCase()))
  )

  const openModal = () => {
    setForm({ name:'', sector:'Mode & Sport', networks:['IG'], status:'Actif' })
    setModal(true)
  }

  const toggleNet = (n) => {
    setForm(f => ({
      ...f,
      networks: f.networks.includes(n) ? f.networks.filter(x=>x!==n) : [...f.networks, n]
    }))
  }

  const addClient = () => {
    if (!form.name.trim()) return
    const newClient = {
      id: Date.now(),
      name: form.name,
      sector: form.sector,
      networks: form.networks,
      posts: 0,
      reach: '0',
      engagement: '0%',
      status: form.status,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }
    setClients(c => [newClient, ...c])
    setModal(false)
    showToast(`Client "${form.name}" ajouté avec succès !`)
  }

  const deleteClient = (id, name) => {
    setClients(c => c.filter(x => x.id !== id))
    showToast(`Client "${name}" supprimé.`)
  }

  return (
    <div>
      <Toast msg={toast}/>

      {/* Modal */}
      {modal && (
        <div className="modal-overlay" onClick={e => e.target===e.currentTarget && setModal(false)}>
          <div className="modal-box">
            <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:24}}>
              <div>
                <div className="modal-title">Nouveau client</div>
                <div className="modal-sub">Ajoutez un client à gérer dans AuraCRM</div>
              </div>
              <button onClick={() => setModal(false)} style={{background:'none',border:'none',cursor:'pointer',color:'#9CA3AF',padding:4}}><X size={20}/></button>
            </div>
            <div className="modal-grid">
              <div className="modal-field" style={{gridColumn:'1/-1'}}>
                <label className="modal-label">Nom de l'entreprise *</label>
                <input className="modal-input" placeholder="Ex : Nike France"
                  value={form.name} onChange={e => setForm({...form, name:e.target.value})}
                  autoFocus/>
              </div>
              <div className="modal-field">
                <label className="modal-label">Secteur d'activité</label>
                <select className="modal-select" value={form.sector} onChange={e => setForm({...form, sector:e.target.value})}>
                  {SECTORS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="modal-field">
                <label className="modal-label">Statut</label>
                <select className="modal-select" value={form.status} onChange={e => setForm({...form, status:e.target.value})}>
                  <option>Actif</option>
                  <option>Inactif</option>
                </select>
              </div>
            </div>
            <div className="modal-field">
              <label className="modal-label">Réseaux sociaux gérés</label>
              <div className="modal-nets">
                {ALL_NETS.map(n => (
                  <button key={n} className={`modal-net ${form.networks.includes(n)?'on':''}`}
                    onClick={() => toggleNet(n)}>
                    <span style={{width:10,height:10,borderRadius:'50%',background:NET_C[n],display:'inline-block',marginRight:6}}/>
                    {n==='IG'?'Instagram':n==='LI'?'LinkedIn':n==='FB'?'Facebook':'TikTok'}
                  </button>
                ))}
              </div>
            </div>
            <div className="modal-btns">
              <button className="modal-cancel" onClick={() => setModal(false)}>Annuler</button>
              <button className="modal-submit" onClick={addClient} disabled={!form.name.trim()}>
                ✓ &nbsp;Ajouter le client
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24}}>
        <div>
          <h2 style={{fontSize:22,fontWeight:800,color:'#111827'}}>Gestion clients</h2>
          <p style={{fontSize:14,color:'#9CA3AF',marginTop:4}}>
            {clients.length} clients · {clients.filter(c=>c.status==='Actif').length} actifs
          </p>
        </div>
        <button className="crm-btn" onClick={openModal}><Plus size={16}/> Nouveau client</button>
      </div>

      {/* KPIs */}
      <div className="crm-kpi-grid" style={{marginBottom:24}}>
        {[
          [String(clients.length),'Total clients','AuraCRM','#4A6CF7'],
          [String(clients.filter(c=>c.status==='Actif').length),'Clients actifs','↑ +3 ce mois','#059669'],
          ['1 247','Posts ce mois','↑ +12%','#059669'],
          ['2.4M','Impressions','↑ +8%','#059669'],
        ].map(([v,l,d,c]) => (
          <div key={l} className="crm-kpi-card">
            <div className="crm-kpi-value">{v}</div>
            <div style={{fontSize:13,color:'#6B7280',margin:'4px 0'}}>{l}</div>
            <div style={{fontSize:12,fontWeight:600,color:c}}>{d}</div>
          </div>
        ))}
      </div>

      {/* Table */}
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
                className={`crm-filter-btn ${filter===f?'active':''}`}>{f}</button>
            ))}
          </div>
          <span style={{marginLeft:'auto',fontSize:13,color:'#9CA3AF'}}>{filtered.length} résultat{filtered.length>1?'s':''}</span>
        </div>
        <div className="crm-table-wrap">
          <table className="crm-table">
            <thead>
              <tr>
                {['Client','Secteur','Réseaux','Posts','Reach','Engagement','Statut','Action'].map(h => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} style={{textAlign:'center',padding:'48px',color:'#9CA3AF',fontSize:14}}>
                  Aucun client trouvé pour « {search} »
                </td></tr>
              ) : filtered.map(c => (
                <tr key={c.id}>
                  <td>
                    <div className="crm-cell-client">
                      <div className="crm-client-av" style={{background:c.color,borderRadius:10,width:36,height:36}}>
                        {c.name[0]}
                      </div>
                      <span style={{fontSize:13,fontWeight:600,color:'#111827'}}>{c.name}</span>
                    </div>
                  </td>
                  <td style={{fontSize:13,color:'#6B7280'}}>{c.sector}</td>
                  <td>
                    <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
                      {c.networks.map(n => (
                        <span key={n} className="crm-net-badge" style={{background:NET_C[n]||'#888'}}>{n}</span>
                      ))}
                    </div>
                  </td>
                  <td style={{fontSize:13,fontWeight:700,color:'#111827'}}>{c.posts}</td>
                  <td style={{fontSize:13,color:'#374151'}}>{c.reach}</td>
                  <td>
                    <span style={{fontSize:13,fontWeight:700,color:parseFloat(c.engagement)>=5?'#059669':'#374151',display:'flex',alignItems:'center',gap:4}}>
                      {parseFloat(c.engagement)>=4?<TrendingUp size={13}/>:<TrendingDown size={13}/>}
                      {c.engagement}
                    </span>
                  </td>
                  <td>
                    <span className={`crm-status-badge ${c.status==='Actif'?'crm-status-actif':'crm-status-inactif'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => deleteClient(c.id, c.name)}
                      style={{background:'none',border:'1.5px solid #FEE2E2',borderRadius:8,padding:'6px 8px',cursor:'pointer',color:'#EF4444',transition:'all 0.15s'}}
                      title="Supprimer">
                      <Trash2 size={14}/>
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