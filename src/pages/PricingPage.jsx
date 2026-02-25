import CtaBanner from '../components/CtaBanner'
import PageHeader from '../components/PageHeader'
import PageWrapper from '../components/PageWrapper'
import Pricing from '../components/Pricing'
import Seo from '../components/Seo'
import { createBreadcrumbSchema, pageSeo } from '../data/seo'

function PricingPage() {
  return (
    <PageWrapper>
      <Seo
        {...pageSeo.pricing}
        schema={[
          createBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Pricing', path: '/pricing' },
          ]),
        ]}
      />
      <PageHeader
        eyebrow="Pricing"
        title="Flexible pricing designed for startup, growth, and scale-stage teams."
        subtitle="Use these plans as a baseline. We tailor final delivery scope around your timeline, complexity, and business outcomes."
      />
      <Pricing showComparison />
      <CtaBanner />
    </PageWrapper>
  )
}

export default PricingPage
