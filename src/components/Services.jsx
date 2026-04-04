import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Code2, Globe, Megaphone, Palette, Rocket, Store } from 'lucide-react'
import { services } from '../data/services'
import Button from './Button'
import Card from './Card'
import Container from './Container'
import SectionTitle from './SectionTitle'

const iconMap = {
  Globe,
  Code2,
  Rocket,
  Store,
  Megaphone,
  Palette,
}

function Services({ preview = false }) {
  const reduceMotion = useReducedMotion()
  const items = preview ? services.slice(0, 3) : services

  return (
    <section className="section-pad">
      <Container>
        <SectionTitle
          eyebrow="Services"
          title={
            preview
              ? 'Core capabilities built for product growth.'
              : 'Full-spectrum services to launch, scale, and optimize digital products.'
          }
          subtitle={
            preview
              ? 'Explore our high-impact engineering, design, and growth services tailored for modern software companies.'
              : 'We combine software engineering, UX, and growth systems to deliver measurable outcomes across the full product lifecycle.'
          }
        />

        <div className={`grid gap-6 ${preview ? 'lg:grid-cols-3' : 'sm:grid-cols-2 xl:grid-cols-3'}`}>
          {items.map((service, index) => {
            const Icon = iconMap[service.icon] || Globe
            const animationProps = reduceMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 18 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.25 },
                  transition: { duration: 0.4, ease: 'easeOut', delay: index * 0.05 },
                }

            return (
              <motion.div key={service.id} {...animationProps}>
                <Card className="flex h-full flex-col" tilt glow>
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#1DA1FF]/35 bg-[#1DA1FF]/10 text-[#8BD8FF]">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[#EAF0FF]">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#A9B4D0]">{service.description}</p>

                  {!preview ? (
                    <ul className="mt-5 space-y-2.5">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-[#C3CCE2]">
                          <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#00D4FF]" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {!preview ? (
                    <Button to="/contact" variant="secondary" className="mt-6 w-full">
                      Get a Quote
                      <ArrowRight size={16} />
                    </Button>
                  ) : null}
                </Card>
              </motion.div>
            )
          })}
        </div>

        {preview ? (
          <div className="mt-10 flex justify-start">
            <Button to="/services" variant="secondary">
              Explore all services
              <ArrowRight size={16} />
            </Button>
          </div>
        ) : null}
      </Container>
    </section>
  )
}

export default Services
