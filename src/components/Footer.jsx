import { Facebook, Instagram, Linkedin } from 'lucide-react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { siteFlags } from '../data/siteConfig'
import Container from './Container'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/work', label: 'Work' },
  ...(siteFlags.showPricing ? [{ to: '/pricing', label: 'Pricing' }] : []),
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const socialLinks = [
  { label: 'LinkedIn', icon: Linkedin, href: '#' },
  { label: 'Instagram', icon: Instagram, href: '#' },
  { label: 'Facebook', icon: Facebook, href: '#' },
]

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#05070E]/75 py-12">
      <Container className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Link to="/" className="inline-flex items-center gap-3">
            <img
              src={logo}
              alt="Inaivo Solutions logo"
              className="h-10 w-10 rounded-full border border-white/15 object-cover"
              width="40"
              height="40"
            />
            <span className="font-display text-lg font-semibold text-[#EAF0FF]">Inaivo Solutions</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[#A9B4D0]">
            Futuristic software design and development partner for SaaS products, marketplaces, and growth-focused digital
            platforms.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#89D7FF]">Quick Links</h3>
          <ul className="mt-4 space-y-2">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link className="text-sm text-[#A9B4D0] transition-colors hover:text-[#EAF0FF]" to={link.to}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#89D7FF]">Connect</h3>
          <ul className="mt-4 space-y-2">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="inline-flex items-center gap-2 text-sm text-[#A9B4D0] transition-colors hover:text-[#EAF0FF]"
                  aria-label={social.label}
                >
                  <social.icon size={15} />
                  <span>{social.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <Container className="mt-10 border-t border-white/10 pt-6">
        <p className="text-xs text-[#7B86A4]">
          (c) {new Date().getFullYear()} Inaivo Solutions. All rights reserved.
        </p>
      </Container>
    </footer>
  )
}

export default Footer
