import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { testimonials } from '../data/testimonials'
import Card from './Card'
import Container from './Container'
import SectionTitle from './SectionTitle'

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const reduceMotion = useReducedMotion()
  const total = testimonials.length

  useEffect(() => {
    if (reduceMotion) return undefined
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total)
    }, 6500)

    return () => window.clearInterval(interval)
  }, [reduceMotion, total])

  const current = testimonials[activeIndex]

  const slideAnimation = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: 24 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -24 },
        transition: { duration: 0.3, ease: 'easeOut' },
      }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total)
  }

  return (
    <section id="testimonials" className="section-pad">
      <Container>
        <SectionTitle
          eyebrow="Testimonials"
          title="What clients say about working with Inaivo."
          subtitle="Long-term partnerships built on clarity, velocity, and results."
          align="center"
        />

        <Card className="relative overflow-hidden p-0" glow>
          <div className="p-7 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.figure key={current.id} {...slideAnimation}>
                <div className="mb-5 flex items-center gap-1 text-[#00D4FF]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={16} fill="currentColor" />
                  ))}
                </div>
                <blockquote className="max-w-3xl font-display text-2xl leading-relaxed text-[#EAF0FF] sm:text-3xl">
                  "{current.quote}"
                </blockquote>
                <figcaption className="mt-6 text-sm text-[#A9B4D0]">
                  <span className="font-semibold text-[#EAF0FF]">{current.name}</span> - {current.role}, {current.company}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="border-t border-white/10 px-7 py-4 sm:px-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                {testimonials.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      index === activeIndex ? 'w-7 bg-[#1DA1FF]' : 'w-2.5 bg-white/25 hover:bg-white/45'
                    }`}
                    aria-label={`Show testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-[#C3CCE2] transition-colors hover:border-[#1DA1FF]/50 hover:text-[#EAF0FF]"
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft size={17} />
                </button>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-[#C3CCE2] transition-colors hover:border-[#1DA1FF]/50 hover:text-[#EAF0FF]"
                  onClick={handleNext}
                  aria-label="Next testimonial"
                >
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  )
}

export default Testimonials
