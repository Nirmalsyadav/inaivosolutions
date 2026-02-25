import { motion, useReducedMotion } from 'framer-motion'

function SectionTitle({ eyebrow, title, subtitle, align = 'left' }) {
  const reduceMotion = useReducedMotion()
  const isCentered = align === 'center'
  const animationProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.35 },
        transition: { duration: 0.5, ease: 'easeOut' },
      }

  return (
    <motion.div
      className={`mb-12 flex max-w-3xl flex-col gap-4 ${isCentered ? 'mx-auto items-center text-center' : ''}`}
      {...animationProps}
    >
      {eyebrow ? (
        <p className="inline-flex w-fit rounded-full border border-[#1DA1FF]/30 bg-[#1DA1FF]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#89D7FF]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-[#EAF0FF] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="text-base text-[#A9B4D0] sm:text-lg">{subtitle}</p>
      ) : null}
    </motion.div>
  )
}

export default SectionTitle
