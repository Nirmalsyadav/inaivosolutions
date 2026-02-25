import CtaBanner from '../components/CtaBanner'
import PageHeader from '../components/PageHeader'
import PageWrapper from '../components/PageWrapper'
import Work from '../components/Work'

function WorkPage() {
  return (
    <PageWrapper>
      <PageHeader
        eyebrow="Portfolio"
        title="Case studies showing real product and growth outcomes."
        subtitle="Explore selected engagements where strategic design and engineering translated into measurable business performance."
      />
      <Work />
      <CtaBanner />
    </PageWrapper>
  )
}

export default WorkPage
