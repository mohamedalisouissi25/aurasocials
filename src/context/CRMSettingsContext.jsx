import { createContext, useContext, useState, useEffect } from 'react'

const Ctx = createContext(null)

const DEFAULTS = { theme:'light', lang:'fr', density:'comfortable' }

export const CRM_TR = {
  fr: {
    dashboard:'Dashboard', clients:'Clients', publications:'Publications',
    aiGenerator:'IA Générative', analytics:'Analytics', insights:'Insights IA',
    settings:'Paramètres', logout:'Déconnexion', newClient:'Nouveau client',
    generateAI:'Générer avec IA', activeClients:'Clients actifs',
    postsPublished:'Posts publiés', impressions:'Impressions', aiTasks:'Tâches IA',
    goodMorning:'Bonjour', dashboardSub:"Voici l'état de vos réseaux sociaux aujourd'hui",
    searchClient:'Rechercher un client...', allStatus:'Tous', active:'Actif', inactive:'Inactif',
    contentType:'Type de contenu', selectedClient:'Client concerné', instructions:'Instructions',
    generateBtn:'Générer avec IA Claude', result:'Résultat généré', readyToGenerate:'Prêt à générer',
    chooseContent:'Choisissez un type de contenu puis cliquez sur Générer',
    schedule:'Programmer', save:'Sauvegarder',
  },
  en: {
    dashboard:'Dashboard', clients:'Clients', publications:'Publications',
    aiGenerator:'AI Generator', analytics:'Analytics', insights:'AI Insights',
    settings:'Settings', logout:'Logout', newClient:'New client',
    generateAI:'Generate with AI', activeClients:'Active clients',
    postsPublished:'Posts published', impressions:'Impressions', aiTasks:'AI tasks',
    goodMorning:'Hello', dashboardSub:"Here's your social media status today",
    searchClient:'Search a client...', allStatus:'All', active:'Active', inactive:'Inactive',
    contentType:'Content type', selectedClient:'Selected client', instructions:'Instructions',
    generateBtn:'Generate with Claude AI', result:'Generated result', readyToGenerate:'Ready to generate',
    chooseContent:'Choose a content type then click Generate',
    schedule:'Schedule', save:'Save',
  },
  ar: {
    dashboard:'لوحة التحكم', clients:'العملاء', publications:'المنشورات',
    aiGenerator:'مولد الذكاء الاصطناعي', analytics:'التحليلات', insights:'رؤى الذكاء',
    settings:'الإعدادات', logout:'تسجيل الخروج', newClient:'عميل جديد',
    generateAI:'توليد بالذكاء الاصطناعي', activeClients:'العملاء النشطون',
    postsPublished:'المنشورات', impressions:'مشاهدات', aiTasks:'مهام الذكاء',
    goodMorning:'مرحباً', dashboardSub:'إليك حالة شبكاتك الاجتماعية اليوم',
    searchClient:'ابحث عن عميل...', allStatus:'الكل', active:'نشط', inactive:'غير نشط',
    contentType:'نوع المحتوى', selectedClient:'العميل المختار', instructions:'تعليمات',
    generateBtn:'توليد باستخدام Claude AI', result:'النتيجة المولّدة', readyToGenerate:'جاهز للتوليد',
    chooseContent:'اختر نوع المحتوى ثم انقر توليد',
    schedule:'جدولة', save:'حفظ',
  },
  es: {
    dashboard:'Panel', clients:'Clientes', publications:'Publicaciones',
    aiGenerator:'Generador IA', analytics:'Analíticas', insights:'Insights IA',
    settings:'Configuración', logout:'Cerrar sesión', newClient:'Nuevo cliente',
    generateAI:'Generar con IA', activeClients:'Clientes activos',
    postsPublished:'Posts publicados', impressions:'Impresiones', aiTasks:'Tareas IA',
    goodMorning:'Hola', dashboardSub:'Aquí está el estado de tus redes sociales hoy',
    searchClient:'Buscar un cliente...', allStatus:'Todos', active:'Activo', inactive:'Inactivo',
    contentType:'Tipo de contenido', selectedClient:'Cliente seleccionado', instructions:'Instrucciones',
    generateBtn:'Generar con Claude AI', result:'Resultado generado', readyToGenerate:'Listo para generar',
    chooseContent:'Elige un tipo de contenido y haz clic en Generar',
    schedule:'Programar', save:'Guardar',
  },
  de: {
    dashboard:'Dashboard', clients:'Kunden', publications:'Veröffentlichungen',
    aiGenerator:'KI-Generator', analytics:'Analytik', insights:'KI-Einblicke',
    settings:'Einstellungen', logout:'Abmelden', newClient:'Neuer Kunde',
    generateAI:'Mit KI generieren', activeClients:'Aktive Kunden',
    postsPublished:'Veröffentlichte Beiträge', impressions:'Impressionen', aiTasks:'KI-Aufgaben',
    goodMorning:'Hallo', dashboardSub:'Hier ist der Status Ihrer sozialen Netzwerke heute',
    searchClient:'Kunden suchen...', allStatus:'Alle', active:'Aktiv', inactive:'Inaktiv',
    contentType:'Inhaltstyp', selectedClient:'Ausgewählter Kunde', instructions:'Anweisungen',
    generateBtn:'Mit Claude AI generieren', result:'Generiertes Ergebnis', readyToGenerate:'Bereit zur Generierung',
    chooseContent:'Wählen Sie einen Inhaltstyp und klicken Sie auf Generieren',
    schedule:'Planen', save:'Speichern',
  },
}

export function CRMSettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const s = localStorage.getItem('aura_crm_settings')
      return s ? { ...DEFAULTS, ...JSON.parse(s) } : DEFAULTS
    } catch { return DEFAULTS }
  })

  const save = (patch) => {
    const next = { ...settings, ...patch }
    setSettings(next)
    localStorage.setItem('aura_crm_settings', JSON.stringify(next))
  }

  // Apply to DOM on every change
  useEffect(() => {
    const root = document.documentElement
    let theme = settings.theme
    if (theme === 'auto') {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    root.setAttribute('data-crm-theme',   theme)
    root.setAttribute('data-crm-density', settings.density)
    root.setAttribute('data-crm-dir',     settings.lang === 'ar' ? 'rtl' : 'ltr')
  }, [settings])

  const tr = (key) => CRM_TR[settings.lang]?.[key] ?? CRM_TR.fr[key] ?? key

  return (
    <Ctx.Provider value={{ settings, save, tr }}>
      {children}
    </Ctx.Provider>
  )
}

export const useCRMSettings = () => useContext(Ctx)