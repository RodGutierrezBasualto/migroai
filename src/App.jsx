import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import DashboardSection from './components/DashboardSection'
import DemoVideo from './components/DemoVideo'
import FeaturesSection from './components/FeaturesSection'
import ClaudeSection from './components/ClaudeSection'
import APISection from './components/APISection'
import CredibilityStrip from './components/CredibilityStrip'
import PricingPage from './pages/PricingPage'
import AboutPage from './pages/AboutPage'
import FreemonthPage from './pages/FreemonthPage'

function HomePage() {
  return (
    <>
      <Hero />

      <DashboardSection />
      <DemoVideo />
      <FeaturesSection />
      <ClaudeSection />
      <APISection />
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
