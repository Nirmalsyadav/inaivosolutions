import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import BackgroundFX from './BackgroundFX'
import Footer from './Footer'
import Navbar from './Navbar'
import ScrollToTop from './ScrollToTop'

function GlobalLayout() {
  const location = useLocation()
  const reduceMotion = useReducedMotion()

  const pageAnimation = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -18 },
        transition: { duration: 0.32, ease: 'easeOut' },
      }

  return (
    <div className="relative isolate min-h-screen bg-[#05070E] font-body text-[#EAF0FF]">
      <a
        href="#content"
        className="sr-only z-[80] rounded-lg bg-[#1DA1FF] px-3 py-2 font-medium text-[#05070E] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <BackgroundFX />
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main id="content" key={location.pathname} {...pageAnimation}>
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default GlobalLayout
