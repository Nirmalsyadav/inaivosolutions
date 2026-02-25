import CtaBanner from '../components/CtaBanner'
import PageHeader from '../components/PageHeader'
import Work from '../components/Work'

function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Case studies showing real product and growth outcomes."
        subtitle="Explore selected engagements where strategic design and engineering translated into measurable business performance."
      />
      <Work />
      <CtaBanner />
    </>
  )
}

export default WorkPage
