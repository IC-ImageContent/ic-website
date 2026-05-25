import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Healthcare from './pages/Healthcare'
import Contact from './pages/Contact'
import Impressum from './pages/Impressum'
import Datenschutz from './pages/Datenschutz'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"            element={<Home />} />
          <Route path="/leistungen"  element={<Services />} />
          <Route path="/unternehmen" element={<About />} />
          <Route path="/healthcare"  element={<Healthcare />} />
          <Route path="/kontakt"     element={<Contact />} />
          <Route path="/impressum"   element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <CookieBanner />
    </>
  )
}
