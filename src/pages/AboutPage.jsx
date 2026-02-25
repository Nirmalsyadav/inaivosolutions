import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Handshake, ShieldCheck, Target, Zap } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import {
  SiAmazonwebservices,
  SiDocker,
  SiFigma,
  SiFramer,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiStripe,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'
import Card from '../components/Card'
import Container from '../components/Container'
import CtaBanner from '../components/CtaBanner'
import PageHeader from '../components/PageHeader'
import PageWrapper from '../components/PageWrapper'
import SectionTitle from '../components/SectionTitle'
import { companyStats, missionVision, techStack, whyChooseUs } from '../data/about'

const whyChooseIcons = {
  strategy: Target,
  quality: ShieldCheck,
  speed: Zap,
  partnership: Handshake,
}

const techIconMap = {
  react: { icon: SiReact, color: '#61DAFB' },
  nextjs: { icon: SiNextdotjs, color: '#FFFFFF' },
  nodejs: { icon: SiNodedotjs, color: '#5FA04E' },
  php: { icon: SiPhp, color: '#777BB4' },
  python: { icon: SiPython, color: '#3776AB' },
  java: { icon: SiOpenjdk, color: '#ED8B00' },
  typescript: { icon: SiTypescript, color: '#3178C6' },
  mongodb: { icon: SiMongodb, color: '#47A248' },
  postgresql: { icon: SiPostgresql, color: '#4169E1' },
  tailwindcss: { icon: SiTailwindcss, color: '#06B6D4' },
  framermotion: { icon: SiFramer, color: '#0055FF' },
  aws: { icon: SiAmazonwebservices, color: '#FF9900' },
  docker: { icon: SiDocker, color: '#2496ED' },
  stripe: { icon: SiStripe, color: '#635BFF' },
  figma: { icon: SiFigma, color: '#F24E1E' },
}

const normalizeTechKey = (name) => name.toLowerCase().replace(/[^a-z0-9]/g, '')

function StatCounter({ value, suffix, label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduceMotion = useReducedMotion()
  const [count, setCount] = useState(reduceMotion ? value : 0)

  useEffect(() => {
    if (!inView) return undefined

    if (reduceMotion) {
      setCount(value)
      return undefined
    }

    let frameId
    const duration = 1300
    const start = performance.now()

    const updateCounter = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1)
      setCount(Math.floor(progress * value))
      if (progress < 1) {
        frameId = window.requestAnimationFrame(updateCounter)
      }
    }

    frameId = window.requestAnimationFrame(updateCounter)

    return () => window.cancelAnimationFrame(frameId)
  }, [inView, reduceMotion, value])

  return (
    <div ref={ref}>
      <Card className="h-full" glow>
        <p className="font-display text-4xl font-semibold tracking-tight text-[#EAF0FF]">
          {count}
          {suffix}
        </p>
        <p className="mt-2 text-sm text-[#A9B4D0]">{label}</p>
      </Card>
    </div>
  )
}

function AboutPage() {
  const reduceMotion = useReducedMotion()

  return (
    <PageWrapper>
      <PageHeader
        eyebrow="About"
        title="We are a product-first software company focused on outcomes, not output."
        subtitle="Inaivo Solutions blends strategy, design, and engineering to help teams launch confidently, scale faster, and stay ahead in competitive markets."
      />

      <section className="section-pad pt-6">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {missionVision.map((item, index) => {
              const animation = reduceMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 18 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, amount: 0.4 },
                    transition: { duration: 0.45, ease: 'easeOut', delay: index * 0.07 },
                  }

              return (
                <motion.div key={item.id} {...animation}>
                  <Card className="h-full" glow>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#89D7FF]">{item.title}</p>
                    <p className="mt-4 text-sm leading-relaxed text-[#C3CCE2] sm:text-base">{item.description}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="section-pad pb-6">
        <Container>
          <SectionTitle
            eyebrow="Why Choose Us"
            title="A delivery model built for speed, quality, and strategic clarity."
            subtitle="We work as an extension of your internal team, bringing senior-level ownership across every stage of the product lifecycle."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {whyChooseUs.map((item, index) => {
              const Icon = whyChooseIcons[item.id] || Target
              const animation = reduceMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 18 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, amount: 0.35 },
                    transition: { duration: 0.42, ease: 'easeOut', delay: index * 0.06 },
                  }

              return (
                <motion.div key={item.id} {...animation}>
                  <Card className="h-full" tilt glow>
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#1DA1FF]/35 bg-[#1DA1FF]/10 text-[#8BD8FF]">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-[#EAF0FF]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#A9B4D0]">{item.description}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="section-pad py-6">
        <Container>
          <SectionTitle
            eyebrow="Technology Stack"
            title="Modern tools and frameworks for reliable product velocity."
            subtitle="Our stack is selected for maintainability, performance, and long-term scalability across diverse business domains."
          />

          <div className="glass-card rounded-3xl border border-white/10 p-6 sm:p-8">
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech) => {
                const iconMeta = techIconMap[normalizeTechKey(tech)]
                const TechIcon = iconMeta?.icon

                return (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-sm font-medium text-[#C3CCE2]"
                  >
                    {TechIcon ? (
                      <TechIcon size={16} style={{ color: iconMeta.color }} aria-hidden="true" />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-[#1DA1FF]" aria-hidden="true" />
                    )}
                    <span>{tech}</span>
                  </span>
                )
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="section-pad pt-6">
        <Container>
          <SectionTitle
            eyebrow="By The Numbers"
            title="Proof of consistent execution and client impact."
            subtitle="We measure success by delivery quality, retention, and long-term growth outcomes for our partners."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {companyStats.map((stat) => (
              <StatCounter key={stat.id} value={stat.value} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner />
    </PageWrapper>
  )
}

export default AboutPage
