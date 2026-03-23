import Navbar from './components/Navbar'
import Hero from './components/Hero'
import DashboardSection from './components/DashboardSection'
import FeaturesSection from './components/FeaturesSection'
import HowItWorks from './components/HowItWorks'
import CredibilityStrip from './components/CredibilityStrip'
import WaitlistSection from './components/WaitlistSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-off-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <DashboardSection />
      <FeaturesSection />
      <HowItWorks />
      <CredibilityStrip />
      <WaitlistSection />
      <Footer />
    </div>
  )
}
