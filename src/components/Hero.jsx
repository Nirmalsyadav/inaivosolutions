import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Gauge, Layers3, Rocket, Sparkles } from 'lucide-react'
import logo from '../assets/logo.png'
import { createInAnimation } from '../utils/motion'
import Button from './Button'
import Container from './Container'

const trustIndicators = [
  { label: 'Fast Delivery', icon: Rocket },
  { label: 'Modern Stack', icon: Layers3 },
  { label: 'Startup Focused', icon: Gauge },
]

function Hero() {
  const reduceMotion = useReducedMotion()
  const contentAnimation = createInAnimation(reduceMotion)
  const orbAnimation = createInAnimation(reduceMotion, 0.15)

  return (
    <section className="relative overflow-hidden pb-16 pt-16 sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div {...contentAnimation}>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
            <img
              src={logo}
              alt="Inaivo Solutions mark"
              className="h-8 w-8 object-contain"
              width="32"
              height="32"
            />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#89D7FF]">
              Premium Software Company
            </span>
          </div>

          <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-[#EAF0FF] sm:text-5xl lg:text-6xl">
            We build modern web apps,
            <span className="block bg-gradient-to-r from-[#EAF0FF] via-[#9CE8FF] to-[#00D4FF] bg-clip-text text-transparent">
              SaaS products,
            </span>
            and growth-focused digital experiences.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#A9B4D0] sm:text-lg">
            Inaivo Solutions helps ambitious businesses launch faster with scalable engineering, conversion-first design,
            and strategic execution from MVP to enterprise-grade software.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button to="/contact" size="lg">
              Get a Quote
              <ArrowRight size={17} />
            </Button>
            <Button to="/services" variant="secondary" size="lg">
              View Services
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {trustIndicators.map((indicator) => (
              <span
                key={indicator.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-[#C3CCE2]"
              >
                <indicator.icon size={14} className="text-[#00D4FF]" />
                {indicator.label}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-8">
            <div>
              <p className="text-2xl font-semibold text-[#EAF0FF]">120+</p>
              <p className="text-sm text-[#A9B4D0]">Projects Delivered</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-[#EAF0FF]">98%</p>
              <p className="text-sm text-[#A9B4D0]">Client Satisfaction</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-[#EAF0FF]">24/7</p>
              <p className="text-sm text-[#A9B4D0]">Global Delivery Window</p>
            </div>
          </div>
        </motion.div>

        <motion.div className="relative" {...orbAnimation}>
          <div className="orb-wrap">
            <div className="orb-pulse" />
            <div className="orb-ring" />
            <div className="orb-ring-secondary" />
            <div className="orb-core" />
            <div className="absolute inset-x-0 bottom-5 mx-auto w-fit rounded-full border border-[#1DA1FF]/30 bg-[#070B17]/80 px-4 py-2 text-xs font-medium text-[#A9B4D0] shadow-[0_15px_30px_rgba(5,7,14,0.65)] backdrop-blur">
              <span className="inline-flex items-center gap-1">
                <Sparkles size={14} className="text-[#00D4FF]" />
                Built for precision, velocity, and scale
              </span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

export default Hero
