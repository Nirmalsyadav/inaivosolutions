import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, CalendarCheck2 } from 'lucide-react'
import Button from './Button'
import Container from './Container'

function CtaBanner() {
  const reduceMotion = useReducedMotion()

  const animation = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.5 },
        transition: { duration: 0.45, ease: 'easeOut' },
      }

  return (
    <section className="section-pad pt-12">
      <Container>
        <motion.div
          className="glass-card relative overflow-hidden rounded-3xl border border-[#1DA1FF]/25 px-6 py-10 sm:px-10"
          {...animation}
        >
          <div className="pointer-events-none absolute right-[-5rem] top-[-5rem] h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.22),transparent_70%)] blur-2xl" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#89D7FF]">
                <CalendarCheck2 size={14} />
                Ready to Start
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-[#EAF0FF] sm:text-4xl">
                Turn your product vision into a growth engine.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#A9B4D0] sm:text-base">
                Book a free strategy call with Inaivo Solutions and get a clear roadmap for launch, scale, and measurable results.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button to="/contact" size="lg">
                Book a Free Call
                <ArrowRight size={16} />
              </Button>
              <Button to="/work" variant="secondary" size="lg">
                View Case Studies
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

export default CtaBanner
