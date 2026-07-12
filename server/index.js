import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

// ── REGISTER ──
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, company } = req.body
  try {
    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) return res.status(400).json({ error: 'Cet email est déjà utilisé.' })

    const hashed = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: { name, email, password: hashed, company: company || '' }
    })
    res.json({ success: true, user: { id:user.id, name:user.name, email:user.email, company:user.company } })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ── LOGIN ──
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(401).json({ error: 'Email ou mot de passe incorrect.' })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(401).json({ error: 'Email ou mot de passe incorrect.' })

    res.json({ success: true, user: { id:user.id, name:user.name, email:user.email, company:user.company } })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ── USERS (démo jury) ──
app.get('/api/users', async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id:true, name:true, email:true, company:true, plan:true, createdAt:true }
  })
  res.json(users)
})

// ── CLIENTS ──
app.get('/api/clients', async (req, res) => {
  const clients = await prisma.client.findMany({ include: { _count: { select: { posts:true } } } })
  res.json(clients)
})

app.listen(3001, () => {
  console.log('🚀 AuraSocials API  →  http://localhost:3001')
  console.log('📊 Endpoints dispo  →  /api/auth/register · /api/auth/login · /api/users · /api/clients')
})