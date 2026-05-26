import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import DashboardSection from './components/DashboardSection'
import FeaturesSection from './components/FeaturesSection'
import ClaudeSection from './components/ClaudeSection'
import APISection from './components/APISection'
import CredibilityStrip from './components/CredibilityStrip'
import WaitlistSection from './components/WaitlistSection'
import PricingPage from './pages/PricingPage'
import AboutPage from './pages/AboutPage'
import DemoPage from './pages/DemoPage'
import FreemonthPage from './pages/FreemonthPage'

function HomePage() {
  return (
    <>
      <Hero />

      <section className="bg-off-white py-12 px-6">
        <div style={{ position: 'relative', paddingTop: '56.25%', maxWidth: '800px', margin: '0 auto', borderRadius: '8px', overflow: 'hidden' }}>
          <iframe
            src="https://player.mediadelivery.net/embed/650182/fe95e30b-9b25-4806-8187-05cce98fba4d?autoplay=false&loop=false&muted=false&preload=true&responsive=true"
            loading="lazy"
            style={{ border: 0, position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
            allowFullScreen
            title="Migro product overview"
          />
        </div>
      </section>

      <DashboardSection />
      <FeaturesSection />
      <ClaudeSection />
      <APISection />
      <WaitlistSection />
      <CredibilityStrip />
    </>
  )
}

function AppShell() {
  const location = useLocation()
  const isFreemonth = location.pathname === '/freemonth'

  return (
    <div className={`min-h-screen overflow-x-hidden ${isFreemonth ? '' : 'bg-off-white'}`}>
      {!isFreemonth && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/freemonth" element={<FreemonthPage />} />
      </Routes>
      {!isFreemonth && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
