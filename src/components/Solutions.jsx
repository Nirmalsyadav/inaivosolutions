import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { solutions } from '../data/solutions'
import Button from './Button'
import Card from './Card'
import Container from './Container'
import SectionTitle from './SectionTitle'

function Solutions({ preview = false }) {
  const reduceMotion = useReducedMotion()
  const items = preview ? solutions.slice(0, 3) : solutions

  return (
    <section className="section-pad">
      <Container>
        <SectionTitle
          eyebrow="Solutions"
          title={
            preview
              ? 'Tailored solution models for modern digital businesses.'
              : 'Solution architecture designed for specific business models.'
          }
          subtitle={
            preview
              ? 'From SaaS products to marketplaces, we deliver solutions aligned with your growth stage and market fit.'
              : 'Each engagement is structured around your go-to-market goals, product maturity, and technical constraints.'
          }
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {items.map((solution, index) => {
            const animationProps = reduceMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.3 },
                  transition: { duration: 0.45, ease: 'easeOut', delay: index * 0.07 },
                }

            return (
              <motion.div key={solution.id} {...animationProps}>
                <Card className="h-full" glow>
                  <h3 className="font-display text-2xl font-semibold text-[#EAF0FF]">{solution.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#A9B4D0]">{solution.description}</p>
                  <ul className="mt-5 space-y-3">
                    {solution.bullets.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-[#C3CCE2]">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#00D4FF]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <Button to="/contact" variant="secondary" className="mt-6 w-full sm:w-auto">
                    Learn more
                    <ArrowRight size={16} />
                  </Button>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {preview ? (
          <div className="mt-10 flex justify-start">
            <Button to="/solutions" variant="secondary">
              View all solutions
              <ArrowRight size={16} />
            </Button>
          </div>
        ) : null}
      </Container>
    </section>
  )
}

export default Solutions
