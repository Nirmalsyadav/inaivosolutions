import CtaBanner from '../components/CtaBanner'
import PageHeader from '../components/PageHeader'
import PageWrapper from '../components/PageWrapper'
import Seo from '../components/Seo'
import Solutions from '../components/Solutions'
import { createBreadcrumbSchema, pageSeo } from '../data/seo'

function SolutionsPage() {
  return (
    <PageWrapper>
      <Seo
        {...pageSeo.solutions}
        schema={[
          createBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Solutions', path: '/solutions' },
          ]),
        ]}
      />
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
