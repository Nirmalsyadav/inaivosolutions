import CtaBanner from '../components/CtaBanner'
import PageHeader from '../components/PageHeader'
import PageWrapper from '../components/PageWrapper'
import Services from '../components/Services'

function ServicesPage() {
  return (
    <PageWrapper>
      <PageHeader
        eyebrow="Services"
        title="Engineering, design, and growth services under one delivery team."
        subtitle="We build digital products that perform, convert, and scale. Every engagement is tailored to your business model and stage."
      />
      <Services />
      <CtaBanner />
    </PageWrapper>
  )
}

export default ServicesPage
