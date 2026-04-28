import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AnnouncementBand from './components/AnnouncementBand'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import DashboardSection from './components/DashboardSection'
import FeaturesSection from './components/FeaturesSection'
import HowItWorks from './components/HowItWorks'
import CredibilityStrip from './components/CredibilityStrip'
import WaitlistSection from './components/WaitlistSection'
import PricingPage from './pages/PricingPage'
import AboutPage from './pages/AboutPage'
import DemoPage from './pages/DemoPage'

function HomePage() {
  return (
    <>
      <Hero />

      <section className="bg-off-white py-12 px-6">
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '800px', margin: '0 auto', borderRadius: '8px' }}>
          <iframe
            src="https://www.youtube.com/embed/lOR3Wjybbqc"
            title="Migro — The only AI built for Australian migration agents"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
          />
        </div>
      </section>

      <DashboardSection />
      <WaitlistSection />
      <FeaturesSection />
      <HowItWorks />
      <CredibilityStrip />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-off-white overflow-x-hidden">
        <AnnouncementBand />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/demo" element={<DemoPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
