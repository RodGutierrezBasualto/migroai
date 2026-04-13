import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

function HomePage() {
  return (
    <>
      <Hero />
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
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
