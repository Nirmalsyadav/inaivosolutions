import { motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import { pricing, pricingComparison } from '../data/pricing'
import Button from './Button'
import Card from './Card'
import Container from './Container'
import SectionTitle from './SectionTitle'

function Pricing({ preview = false, showComparison = false }) {
  const reduceMotion = useReducedMotion()
  const items = preview ? pricing.slice(0, 3) : pricing

  return (
    <section className="section-pad">
      <Container>
        <SectionTitle
          eyebrow="Pricing"
          title={
            preview
              ? 'Flexible engagement models for every growth stage.'
              : 'Transparent pricing tiers for startups to scale-ups.'
          }
          subtitle={
            preview
              ? 'Choose the delivery model that fits your stage today, then scale as your product matures.'
              : 'All plans are configurable. Final scope and pricing depend on timelines, technical complexity, and business goals.'
          }
          align="center"
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {items.map((plan, index) => {
            const animationProps = reduceMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.3 },
                  transition: { duration: 0.42, ease: 'easeOut', delay: index * 0.08 },
                }

            return (
              <motion.div key={plan.id} {...animationProps}>
                <Card className={`relative h-full ${plan.popular ? 'border-[#1DA1FF]/45' : ''}`} glow>
                  {plan.popular ? (
                    <span className="absolute -top-3 left-6 inline-flex rounded-full border border-[#1DA1FF]/40 bg-[#1DA1FF]/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#89D7FF]">
                      Most Popular
                    </span>
                  ) : null}

                  <h3 className="font-display text-2xl font-semibold text-[#EAF0FF]">{plan.name}</h3>
                  <p className="mt-2 text-lg font-semibold text-[#8BD8FF]">{plan.price}</p>
                  <p className="mt-3 text-sm text-[#A9B4D0]">{plan.description}</p>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-[#C3CCE2]">
                        <Check size={16} className="mt-0.5 shrink-0 text-[#00D4FF]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button to="/contact" className="mt-7 w-full" variant={plan.popular ? 'primary' : 'secondary'}>
                    {plan.cta}
                  </Button>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {preview ? (
          <div className="mt-10 flex justify-center">
            <Button to="/pricing" variant="secondary">
              View full pricing details
            </Button>
          </div>
        ) : null}

        {showComparison ? (
          <div className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10 text-sm">
                <thead>
                  <tr className="bg-white/[0.02] text-left text-xs uppercase tracking-[0.14em] text-[#89D7FF]">
                    <th className="px-4 py-4 font-semibold sm:px-6">Feature</th>
                    <th className="px-4 py-4 font-semibold sm:px-6">Starter</th>
                    <th className="px-4 py-4 font-semibold sm:px-6">Growth</th>
                    <th className="px-4 py-4 font-semibold sm:px-6">Scale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-[#C3CCE2]">
                  {pricingComparison.map((row) => (
                    <tr key={row.feature}>
                      <td className="px-4 py-4 font-medium text-[#EAF0FF] sm:px-6">{row.feature}</td>
                      <td className="px-4 py-4 sm:px-6">{row.starter}</td>
                      <td className="px-4 py-4 sm:px-6">{row.growth}</td>
                      <td className="px-4 py-4 sm:px-6">{row.scale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  )
}

export default Pricing
