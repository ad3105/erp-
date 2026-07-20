import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'

import Home from './pages/Home'
import About from './pages/About'
import Members from './pages/Members'
import Events from './pages/Events'
import Gallery from './pages/Gallery'
import Achievements from './pages/Achievements'
import Join from './pages/Join'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Dashboard from './pages/admin/Dashboard'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo({ top: 0, behavior: 'instant' }), [pathname])
  return null
}

function DemoBanner() {
  const { configured } = useAuth()
  if (configured) return null
  return (
    <div className="fixed bottom-4 left-1/2 z-[90] w-[92%] max-w-xl -translate-x-1/2 rounded-full border border-gold/30 bg-night-900/95 px-5 py-2.5 text-center text-xs text-cream/80 shadow-gold backdrop-blur">
      <span className="text-gold">Demo mode</span> — showing built-in content. Connect Supabase (see
      README) to enable login &amp; live editing.
    </div>
  )
}

export default function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      <main className={`flex-1 ${isAdminRoute ? '' : 'pt-16'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/members" element={<Members />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/join" element={<Join />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      <DemoBanner />
    </div>
  )
}
