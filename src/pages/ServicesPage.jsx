import CtaBanner from '../components/CtaBanner'
import PageHeader from '../components/PageHeader'
import PageWrapper from '../components/PageWrapper'
import Seo from '../components/Seo'
import Services from '../components/Services'
import WhyChoose from '../components/WhyChoose'
import Process from '../components/Process'
import Work from '../components/Work'
import { createBreadcrumbSchema, pageSeo } from '../data/seo'

function ServicesPage() {
  return (
    <PageWrapper>
      <Seo
        {...pageSeo.services}
        schema={[
          createBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ]),
        ]}
      />
      <PageHeader
        eyebrow="Services"
        title="IT Services & Consulting"
        subtitle="We build scalable websites, software, and digital solutions for businesses and startups."
        primaryCta={{ label: 'Get a Quote', to: '/contact' }}
        secondaryCta={{ label: 'Contact Us', to: '/contact' }}
      />

      <Services />

      <WhyChoose />

      <Process />

      <Work preview />

      <CtaBanner />
    </PageWrapper>
  )
}

export default ServicesPage
