import CtaBanner from '../components/CtaBanner'
import PageHeader from '../components/PageHeader'
import Solutions from '../components/Solutions'

function SolutionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title="Solution blueprints for SaaS, marketplaces, portals, and startup MVPs."
        subtitle="From system architecture to growth execution, we deliver tailored solution paths for high-velocity digital teams."
      />
      <Solutions />
      <CtaBanner />
    </>
  )
}

export default SolutionsPage
