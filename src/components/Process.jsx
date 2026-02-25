import { motion, useReducedMotion } from 'framer-motion'
import Card from './Card'
import Container from './Container'
import SectionTitle from './SectionTitle'

const processSteps = [
  {
    title: 'Discovery',
    description:
      'We align on goals, constraints, users, and commercial priorities, then define the strategy and execution map.',
  },
  {
    title: 'Design',
    description:
      'Wireframes and UI direction are crafted into a cohesive design system focused on usability, conversion, and clarity.',
  },
  {
    title: 'Development',
    description:
      'We build in iterative sprints with quality checks, performance tuning, and transparent progress reporting.',
  },
  {
    title: 'Launch',
    description:
      'Production release is managed with confidence through QA validation, deployment safeguards, and rollout support.',
  },
  {
    title: 'Growth',
    description:
      'Post-launch optimization continues through analytics, experimentation, and product enhancements tied to outcomes.',
  },
]

function Process() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="section-pad">
      <Container>
        <SectionTitle
          eyebrow="Process"
          title="A clear execution framework from idea to scale."
          subtitle="Consistent communication and milestone-driven delivery keep complexity manageable without slowing momentum."
        />

        <div className="relative">
          <div className="absolute left-4 top-6 hidden h-[calc(100%-2.5rem)] w-px bg-gradient-to-b from-[#1DA1FF]/60 via-[#00D4FF]/30 to-transparent md:block" />
          <div className="space-y-5">
            {processSteps.map((step, index) => {
              const animationProps = reduceMotion
                ? {}
                : {
                    initial: { opacity: 0, x: -14 },
                    whileInView: { opacity: 1, x: 0 },
                    viewport: { once: true, amount: 0.35 },
                    transition: { duration: 0.4, ease: 'easeOut', delay: index * 0.06 },
                  }

              return (
                <motion.div key={step.title} className="relative md:pl-14" {...animationProps}>
                  <span className="absolute left-0 top-7 hidden h-8 w-8 items-center justify-center rounded-full border border-[#1DA1FF]/40 bg-[#1DA1FF]/15 text-xs font-semibold text-[#EAF0FF] md:inline-flex">
                    {index + 1}
                  </span>
                  <Card>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#89D7FF]">Step 0{index + 1}</p>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-[#EAF0FF]">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#A9B4D0]">{step.description}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Process
