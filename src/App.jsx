import { Suspense, createElement, lazy } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import GlobalLayout from './components/GlobalLayout'
import { siteFlags } from './data/siteConfig'

const Home = lazy(() => import('./pages/Home'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const SolutionsPage = lazy(() => import('./pages/SolutionsPage'))
const WorkPage = lazy(() => import('./pages/WorkPage'))
const PricingPage = lazy(() => import('./pages/PricingPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function RouteFallback() {
  return (
    <section className="section-pad">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl border border-white/12 p-6 text-sm text-[#A9B4D0]">Loading...</div>
      </div>
    </section>
  )
}

function App() {
  const location = useLocation()
  const renderPage = (Component) => (
    <Suspense fallback={<RouteFallback />}>
      {createElement(Component)}
    </Suspense>
  )

  return (
    <Routes location={location}>
      <Route element={<GlobalLayout />}>
        <Route path="/" element={renderPage(Home)} />
        <Route path="/services" element={renderPage(ServicesPage)} />
        <Route path="/solutions" element={renderPage(SolutionsPage)} />
        <Route path="/work" element={renderPage(WorkPage)} />
        {siteFlags.showPricing ? <Route path="/pricing" element={renderPage(PricingPage)} /> : null}
        <Route path="/about" element={renderPage(AboutPage)} />
        <Route path="/contact" element={renderPage(ContactPage)} />
        <Route path="*" element={renderPage(NotFoundPage)} />
      </Route>
    </Routes>
  )
}

export default App
