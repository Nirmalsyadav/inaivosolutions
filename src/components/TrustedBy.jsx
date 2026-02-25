import { motion, useReducedMotion } from 'framer-motion'
import Container from './Container'

const partnerNames = [
  'NovaTech',
  'CloudHarbor',
  'AxisPay',
  'Vertex Labs',
  'QuantumOps',
  'BrightCore',
]

function TrustedBy() {
  const reduceMotion = useReducedMotion()

  const revealAnimation = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.5 },
        transition: { duration: 0.45, ease: 'easeOut' },
      }

  return (
    <section className="py-6 sm:py-8">
      <Container>
        <motion.div
          className="glass-card rounded-3xl border border-white/10 p-6 sm:p-8"
          {...revealAnimation}
        >
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#89D7FF]">
            Trusted by fast-moving teams
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {partnerNames.map((name) => (
              <div
                key={name}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-center text-sm font-semibold text-[#A9B4D0]"
              >
                {name}
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

export default TrustedBy
