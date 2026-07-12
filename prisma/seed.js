import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding...')

  await prisma.aIGeneration.deleteMany()
  await prisma.post.deleteMany()
  await prisma.client.deleteMany()
  await prisma.user.deleteMany()

  const hashedPw = await bcrypt.hash('Admin123!', 12)

  const user = await prisma.user.create({
    data: {
      name: 'Mohamed Ali Souissi',
      email: 'admin@aurasocials.com',
      password: hashedPw,
      company: 'AuraSocials',
      plan: 'enterprise',
    }
  })

  const clientsData = [
    { name:'Nike France',      sector:'Mode & Sport',  networks:'["IG","LI","TK"]', status:'Actif',   reach:'450K', engagement:'4.8%' },
    { name:'BioNature',        sector:'Santé & Bio',   networks:'["IG","FB"]',      status:'Actif',   reach:'120K', engagement:'3.2%' },
    { name:'TechStart SAS',    sector:'Tech & SaaS',   networks:'["LI"]',           status:'Actif',   reach:'280K', engagement:'5.1%' },
    { name:'Café Lumière',     sector:'Restauration',  networks:'["IG","FB","TK"]', status:'Actif',   reach:'85K',  engagement:'6.3%' },
    { name:'Studio Kreativ',   sector:'Design',        networks:'["IG"]',           status:'Actif',   reach:'62K',  engagement:'7.1%' },
    { name:'AutoMax SAS',      sector:'Automobile',    networks:'["FB","LI"]',      status:'Inactif', reach:'95K',  engagement:'2.8%' },
    { name:'Clinique Santé+',  sector:'Santé',         networks:'["FB","LI"]',      status:'Actif',   reach:'140K', engagement:'3.9%' },
    { name:'Voyage & Liberté', sector:'Tourisme',      networks:'["IG","TK","FB"]', status:'Actif',   reach:'620K', engagement:'8.2%' },
  ]

  const clients = []
  for (const c of clientsData) {
    clients.push(await prisma.client.create({ data: { ...c, userId: user.id } }))
  }

  await prisma.post.createMany({ data: [
    { content:"Collection été 2026 ✨ #fashion",                      network:'Instagram', type:'reel',    published:true,  aiGenerated:true,  clientId:clients[0].id },
    { content:"Comment augmenter son engagement LinkedIn de 340% 🚀", network:'LinkedIn',  type:'article', published:true,  aiGenerated:false, clientId:clients[2].id },
    { content:"Nouvelle gamme BIO certifiée 🌿",                      network:'Facebook',  type:'post',    published:true,  aiGenerated:true,  clientId:clients[1].id },
    { content:"Notre terrasse vous attend ☀️",                        network:'Instagram', type:'post',    published:false, aiGenerated:true,  clientId:clients[3].id },
    { content:"Behind the scenes — identité visuelle 🎨",             network:'Instagram', type:'reel',    published:true,  aiGenerated:false, clientId:clients[4].id },
    { content:"L'avenir de la mobilité électrique 2026 ⚡",           network:'LinkedIn',  type:'article', published:false, aiGenerated:false, clientId:clients[5].id },
    { content:"Votre santé, notre priorité 🏥",                       network:'Facebook',  type:'post',    published:true,  aiGenerated:true,  clientId:clients[6].id },
    { content:"Top 5 destinations été 2026 ✈️",                       network:'TikTok',    type:'reel',    published:true,  aiGenerated:true,  clientId:clients[7].id },
  ]})

  await prisma.aIGeneration.createMany({ data: [
    { prompt:'Post Instagram été 2026 Nike France',      result:"Collection été 2026 — Des couleurs qui parlent ✨", network:'Instagram', clientId:clients[0].id },
    { prompt:'Article LinkedIn engagement social media', result:"Comment augmenter son engagement de 340% en 3 mois", network:'LinkedIn', clientId:clients[2].id },
    { prompt:'Post Facebook promotion BioNature',        result:"La nature au service de votre bien-être 🌿",        network:'Facebook',  clientId:clients[1].id },
    { prompt:'Plan éditorial juillet Voyage & Liberté',  result:"PLAN ÉDITORIAL JUILLET 2026 — 28 publications...", network:'Multi',     clientId:clients[7].id },
    { prompt:'Pack hashtags mode lifestyle Instagram',   result:"#été2026 #fashion #style #mode #ootd...",           network:'Instagram', clientId:clients[0].id },
  ]})

  console.log('✅ Seeding terminé !')
  console.log(`   Connexion démo → email: admin@aurasocials.com · mot de passe: Admin123!`)
}

main().catch(console.error).finally(() => prisma.$disconnect())