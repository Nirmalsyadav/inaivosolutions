import Container from './Container'
import Card from './Card'
import SectionTitle from './SectionTitle'

const points = [
  {
    title: 'Experienced full-stack development team',
    description: 'Engineers and designers who deliver production-grade systems with pragmatic trade-offs.'
  },
  {
    title: 'Real project-building experience',
    description: 'Proven delivery across web, e-commerce, and SaaS products with measurable outcomes.'
  },
  {
    title: 'Modern technologies and scalable solutions',
    description: 'We use current best practices to reduce technical debt and enable growth.'
  },
  {
    title: 'Affordable and business-focused approach',
    description: 'Prioritize features that move KPIs and protect your budget and timelines.'
  },
  {
    title: 'Ongoing support and maintenance',
    description: 'Retainers, monitoring, and SLAs to keep your product secure and performant.'
  },
]

function WhyChoose() {
  return (
    <section className="section-pad">
      <Container>
        <SectionTitle
          eyebrow="Why Choose Inaivo Solutions"
          title="Trusted technology partners for growing businesses"
          subtitle="We deliver practical engineering and design with clear commercial outcomes and ongoing support."
        />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((p) => (
            <Card key={p.title} className="h-full">
              <h3 className="font-display text-lg font-semibold text-[#EAF0FF]">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#A9B4D0]">{p.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default WhyChoose
