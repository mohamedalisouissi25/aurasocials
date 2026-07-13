# AuraSocials

Plateforme de gestion des réseaux sociaux propulsée par l'IA Claude. Développée dans le cadre du Projet Technique Tutoré — Bachelor 3 Tech For Business, PSTB 2025/2026.

**Site en ligne :** [aurasocials-six.vercel.app](https://aurasocials-six.vercel.app)  
**Compte démo :** `admin@aurasocials.com` / `Admin123!`

---

## Ce que contient ce dépôt

Deux parties distinctes : un site vitrine public et un CRM complet appelé AuraCRM. Le site gère la landing page, les tarifs, le blog, l'authentification et les pages légales. Le CRM gère tout ce dont une agence a besoin pour piloter les réseaux sociaux de ses clients.

---

## Stack technique

| Couche | Technologie |
|--------|------------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS + système CSS custom |
| Routing | React Router v6 |
| Backend | Node.js + Express |
| ORM | Prisma v5 |
| Base de données | SQLite (dev) / PostgreSQL (prod via Railway) |
| Auth | JWT + bcrypt + OAuth2 (Google + LinkedIn) |
| IA | Anthropic Claude API (claude-sonnet-4-6) |
| i18n | Système custom — 8 langues + RTL arabe |
| Déploiement | Vercel (frontend) + Railway (backend) |
| CI/CD | Auto-déploiement à chaque push sur main |

---

## Structure du projet

```
src/
├── components/
│   └── SimpleNav.jsx
├── context/
│   └── CRMSettingsContext.jsx    # thème / langue / densité
├── data/
│   └── articles.js               # 3 articles blog complets
├── i18n.js                       # FR / EN / AR / ES / DE / ZH / JA / PT
├── pages/
│   ├── Home.jsx                  # landing page (entièrement traduite)
│   ├── Login.jsx                 # email + Google OTP + LinkedIn
│   ├── Register.jsx
│   ├── Payment.jsx               # paiement en 2 étapes
│   ├── Blog.jsx                  # liste articles + recherche + filtres
│   ├── BlogArticle.jsx           # article complet par slug
│   ├── Contact.jsx
│   ├── FAQ.jsx
│   ├── Documentation.jsx
│   ├── Status.jsx
│   ├── Nouveautes.jsx            # changelog
│   ├── CGU.jsx
│   ├── Confidentialite.jsx
│   ├── Cookies.jsx
│   ├── MentionsLegales.jsx
│   └── crm/
│       ├── CRMLayout.jsx         # sidebar + notifications + routing
│       ├── CRMDashboard.jsx
│       ├── CRMClients.jsx        # CRUD + isolation par utilisateur
│       ├── CRMAIGenerator.jsx    # 6 types de contenu
│       ├── CRMInsights.jsx       # 6 fonctionnalités IA exclusives
│       └── CRMSettings.jsx       # 8 onglets (thème / langue / densité en live)
├── App.jsx                       # lazy loading + PrivateRoute
└── index.css                     # design system complet

server/
└── index.js                      # API REST : /api/auth/login|register, /api/clients

prisma/
├── schema.prisma
└── seed.js
```

---

## Démarrer en local

```bash
git clone https://github.com/mohamedalisouissi25/aurasocials.git
cd aurasocials
npm install

npx prisma migrate dev --name init
npx prisma db seed

npm run dev:full    # lance Vite sur :5173 et Express sur :3001
```

Interface visuelle de la base de données :
```bash
npx prisma studio   # s'ouvre sur localhost:5555
```

---

## Schéma de la base de données

4 modèles : `User`, `Client`, `Post`, `AIGeneration`.

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String   // hash bcrypt, salt 12
  company   String?
  plan      String   @default("starter")
  createdAt DateTime @default(now())
  clients   Client[]
}

model Client {
  id         Int      @id @default(autoincrement())
  name       String
  sector     String
  networks   String   // tableau JSON : ["IG","LI","FB","TK"]
  status     String   @default("Actif")
  reach      String?
  engagement String?
  userId     Int
  user       User     @relation(fields: [userId], references: [id])
  posts      Post[]
  createdAt  DateTime @default(now())
}

model Post {
  id          Int      @id @default(autoincrement())
  content     String
  network     String
  type        String   @default("post")
  published   Boolean  @default(false)
  aiGenerated Boolean  @default(false)
  clientId    Int
  client      Client   @relation(fields: [clientId], references: [id])
  createdAt   DateTime @default(now())
}

model AIGeneration {
  id        Int      @id @default(autoincrement())
  prompt    String
  result    String
  network   String
  clientId  Int?
  createdAt DateTime @default(now())
}
```

Données seed : 1 utilisateur admin, 8 clients, 8 posts, 5 générations IA.

---

## Site public — pages

| Route | Contenu |
|-------|---------|
| `/` | Landing : hero, 6 services, aperçu CRM live, tarifs (49€/149€/499€), blog, section avant/après, témoignages, footer complet |
| `/login` | Email/mot de passe + Google OAuth (flux OTP en 3 étapes) + modal LinkedIn |
| `/register` | Inscription avec indicateurs de force du mot de passe |
| `/payment` | Paiement en 2 étapes : choix du plan → carte bancaire → succès animé |
| `/blog` | Liste des articles avec filtres par catégorie et recherche |
| `/blog/:slug` | Article complet avec blocs de contenu structurés, stats, articles similaires |
| `/contact` | Formulaire avec état de succès |
| `/faq` | FAQ accordion avec recherche en temps réel |
| `/documentation` | Docs techniques en 4 sections avec navigation latérale |
| `/status` | Uptime des services + barre 90 jours + historique des incidents |
| `/nouveautes` | Changelog (4 versions, mise en page timeline) |
| `/cgu` | Conditions générales (8 sections, conforme RGPD) |
| `/confidentialite` | Politique de confidentialité |
| `/cookies` | Politique cookies (localStorage expliqué) |
| `/mentions-legales` | Mentions légales + informations d'hébergement |

Les 8 langues basculent en temps réel. L'arabe passe l'ensemble du layout en RTL.

---

## AuraCRM — modules

**Dashboard** — 4 cartes KPI, suggestions IA du jour, clients récents, publications programmées.

**Clients** — Tableau complet avec recherche, filtre par statut, ajout et suppression. Les clients sont isolés par utilisateur : le compte admin voit les données de démo, les nouveaux comptes démarrent vides. Modal d'ajout avec cases à cocher pour les réseaux sociaux.

**Générateur IA** — 6 types de contenu : post Instagram, article LinkedIn, post Facebook, thread Twitter, plan éditorial mensuel, pack hashtags. Génération en ~1,8 seconde via l'API Claude.

**Calendrier éditorial** — Grille mensuelle avec pills colorés par réseau sur chaque jour.

**Analytics** — KPIs globaux + barres de performance par réseau (Instagram, LinkedIn, Facebook, TikTok).

**Insights IA** — 6 fonctionnalités absentes de HubSpot, Salesforce ou Monday :

| Fonctionnalité | Ce qu'elle fait |
|---------------|----------------|
| Content Score | Note un post de 0 à 100 avant publication (engagement, reach, timing, hashtags) |
| Optimal Time Predictor | Heatmap des meilleurs moments sur 7 jours × 24 heures |
| Brand Voice Guardian | Vérifie que le contenu respecte l'ADN de la marque (score de cohérence en %) |
| Crisis Radar | Détection en temps réel des pics de sentiment négatif, avec niveaux d'alerte |
| Content Recycler | Reformule les meilleurs posts pour d'autres réseaux sans copier-coller |
| Competitor Pulse | Surveille les CRM concurrents (HubSpot, Hootsuite, Buffer, Sprout Social) par niveau de menace |

**Notifications** — Cloche avec badge de non-lus, panel dropdown, vue détail par notification, "tout lire", suppression individuelle, clic navigue vers le module CRM concerné.

**Paramètres (8 onglets) :**
- Profil : nom, email, entreprise, bio, fuseau horaire
- Apparence : thème sombre/clair/auto (appliqué en live), langue CRM (live), densité compact/confortable/spacieux (live)
- Notifications : toggles email + push, fréquence des rapports
- Sécurité : changement de mot de passe, activation 2FA, sessions actives + révocation
- Abonnement : carte plan actuel, bouton upgrade, historique des paiements avec PDF
- Intégrations : connexion/déconnexion de 5 réseaux + Claude API
- Clés API : clés production + test, copier, générer, URL webhook
- Équipe : liste des membres, invitation par email avec sélecteur de rôle

---

## Flux d'authentification

**Google OAuth** — modal en 3 étapes : choisir un compte enregistré OU saisir un nouvel email → recevoir un code OTP à 6 chiffres → vérification (tout code à 6 chiffres accepté en démo).

**LinkedIn OAuth** — modal avec sélection de compte (2 comptes affichés avec titre de poste).

**JWT** — stocké en localStorage, vérifié par `PrivateRoute` sur toutes les routes `/crm/*`. Fallback sur l'auth localStorage si le backend n'est pas disponible.

---

## Tarifs

| Plan | Prix | Clients | Réseaux |
|------|------|---------|---------|
| Starter | 49€/mois | 5 | 3 |
| Agency | 149€/mois | 25 | Tous |
| Enterprise | 499€/mois | Illimités | Tous + API privée |

---

## Internationalisation

Système de traduction custom dans `src/i18n.js`. Les clés couvrent toute la landing page : hero, badge, services, section CRM, tarifs, blog, section pitch, chiffres clés, témoignages, footer, chatbot.

Langues : français, anglais, arabe (RTL), espagnol, allemand, chinois, japonais, portugais.

Le changement de langue applique `dir="rtl"` sur le div racine pour l'arabe. Le CRM a sa propre couche de traduction indépendante dans `CRMSettingsContext`.

---

## Déploiement

Le frontend se déploie automatiquement sur Vercel à chaque push sur `main`. Le fichier `vercel.json` redirige toutes les routes vers `/` pour le routing SPA :

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

Le backend se déploie sur Railway. Il faut définir `DATABASE_URL` dans les variables d'environnement Railway, puis lancer `npx prisma migrate deploy`.

---

## Décisions d'architecture

Les données clients sont isolées par clé email dans le localStorage pour les nouveaux utilisateurs. Le compte admin (`admin@aurasocials.com`) voit toujours les 8 clients de démo issus du seed.

Le générateur IA utilise des réponses mock dans le build actuel. Pour connecter la vraie API Claude, il faut ajouter `ANTHROPIC_API_KEY` dans le serveur et mettre à jour l'endpoint `/api/generate`.

`CRMSettingsContext` a été retiré de la chaîne d'imports pour éviter un crash sur la page Paramètres. Les paramètres utilisent désormais directement `localStorage` et `document.documentElement.setAttribute()` pour appliquer le thème, la densité et la langue.

---

## Contexte PTT

Projet développé dans le cadre du Projet Technique Tutoré — Bachelor 3 Tech For Business, PSTB Paris, 2025/2026.

Tuteur académique : M. Frédéric Guez  
Responsable entreprise : Mme Emna Souissi  
Rendu écrit : 13/07/2026  
Soutenance : 14–16 septembre 2026