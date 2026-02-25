import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
import { siteFlags } from '../data/siteConfig'
import { createMenuAnimation } from '../utils/motion'
import Button from './Button'
import Container from './Container'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/work', label: 'Work' },
  ...(siteFlags.showPricing ? [{ to: '/pricing', label: 'Pricing' }] : []),
  { to: '/contact', label: 'Contact' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  const { pathname } = useLocation()
  const menuAnimation = createMenuAnimation(reduceMotion)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05070E]/70 backdrop-blur-xl supports-[backdrop-filter]:bg-[#05070E]/60">
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-3 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1DA1FF]"
          aria-label="Go to Inaivo Solutions home"
        >
          <img
            src={logo}
            alt="Inaivo Solutions logo"
            className="h-10 w-10 object-contain"
            loading="eager"
            width="40"
            height="40"
          />
          <span className="font-display text-base font-semibold tracking-wide text-[#EAF0FF] sm:text-lg">
            Inaivo Solutions
          </span>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Primary Navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `rounded-full border px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1DA1FF] ${
                  isActive
                    ? 'border-[#1DA1FF]/45 bg-[#1DA1FF]/12 text-[#EAF0FF] shadow-[0_0_0_1px_rgba(29,161,255,0.2)]'
                    : 'border-transparent text-[#A9B4D0] hover:border-white/12 hover:bg-white/[0.03] hover:text-[#EAF0FF]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button to="/contact" size="sm">
            Book a Free Call
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-[#EAF0FF] transition-colors hover:border-[#1DA1FF]/55 lg:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="border-t border-white/10 bg-[#070B17]/95 lg:hidden"
            {...menuAnimation}
          >
            <Container className="flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `rounded-xl border px-3 py-2 text-sm font-medium transition-all ${
                      isActive
                        ? 'border-[#1DA1FF]/40 bg-[#1DA1FF]/10 text-[#EAF0FF]'
                        : 'border-transparent text-[#A9B4D0] hover:border-white/12 hover:bg-white/5 hover:text-[#EAF0FF]'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Button to="/contact" className="mt-2 w-full">
                Book a Free Call
              </Button>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
