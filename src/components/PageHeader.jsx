import { motion, useReducedMotion } from 'framer-motion'
import Container from './Container'
import Button from './Button'
import { createInAnimation } from '../utils/motion'

function PageHeader({ eyebrow, title, subtitle, primaryCta, secondaryCta }) {
  const reduceMotion = useReducedMotion()
  const animation = createInAnimation(reduceMotion)

  return (
    <section className="pb-10 pt-16 sm:pb-12 sm:pt-20 lg:pb-14 lg:pt-24">
      <Container>
        <motion.div className="max-w-4xl" {...animation}>
          <p className="inline-flex rounded-full border border-[#1DA1FF]/30 bg-[#1DA1FF]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#89D7FF]">
            {eyebrow}
          </p>
          <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-[#EAF0FF] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#A9B4D0] sm:text-lg">{subtitle}</p>

          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {primaryCta ? (
                <Button to={primaryCta.to || primaryCta.href || '/contact'} size="lg">
                  {primaryCta.label || 'Get a Quote'}
                </Button>
              ) : null}

              {secondaryCta ? (
                <Button to={secondaryCta.to || secondaryCta.href || '/contact'} variant="secondary" size="lg">
                  {secondaryCta.label || 'Contact Us'}
                </Button>
              ) : null}
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  )
}

export default PageHeader
