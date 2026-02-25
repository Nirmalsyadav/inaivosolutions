import CtaBanner from '../components/CtaBanner'
import PageHeader from '../components/PageHeader'
import PageWrapper from '../components/PageWrapper'
import Pricing from '../components/Pricing'

function PricingPage() {
  return (
    <PageWrapper>
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
