import CtaBanner from '../components/CtaBanner'
import PageHeader from '../components/PageHeader'
import PageWrapper from '../components/PageWrapper'
import Solutions from '../components/Solutions'

function SolutionsPage() {
  return (
    <PageWrapper>
      <PageHeader
        eyebrow="Solutions"
        title="Solution blueprints for SaaS, marketplaces, portals, and startup MVPs."
        subtitle="From system architecture to growth execution, we deliver tailored solution paths for high-velocity digital teams."
      />
      <Solutions />
      <CtaBanner />
    </PageWrapper>
  )
}

export default SolutionsPage
