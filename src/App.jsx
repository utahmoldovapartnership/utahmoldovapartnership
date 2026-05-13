import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import AccentStripe from './components/AccentStripe.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Translator from './components/Translator.jsx'
import TranslationExporter from './components/TranslationExporter.jsx'
import { LanguageProvider } from './contexts/LanguageContext.jsx'
import Home from './pages/Home.jsx'
import Interns from './pages/Interns.jsx'
import Contact from './pages/Contact.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white text-ink font-sans pt-1">
        <AccentStripe />
        <Navbar />
        <ScrollToTop />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/interns" element={<Interns />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
        <Translator />
        <TranslationExporter />
      </div>
    </LanguageProvider>
  )
}
