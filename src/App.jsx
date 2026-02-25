import { Route, Routes, useLocation } from 'react-router-dom'
import GlobalLayout from './components/GlobalLayout'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import { siteFlags } from './data/siteConfig'
import Home from './pages/Home'
import NotFoundPage from './pages/NotFoundPage'
import PricingPage from './pages/PricingPage'
import ServicesPage from './pages/ServicesPage'
import SolutionsPage from './pages/SolutionsPage'
import WorkPage from './pages/WorkPage'

function App() {
  const location = useLocation()

  return (
    <Routes location={location}>
      <Route element={<GlobalLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/work" element={<WorkPage />} />
        {siteFlags.showPricing ? <Route path="/pricing" element={<PricingPage />} /> : null}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
