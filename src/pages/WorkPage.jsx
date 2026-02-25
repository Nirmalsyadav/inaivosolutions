import CtaBanner from '../components/CtaBanner'
import PageHeader from '../components/PageHeader'
import PageWrapper from '../components/PageWrapper'
import Seo from '../components/Seo'
import Work from '../components/Work'
import { createBreadcrumbSchema, pageSeo } from '../data/seo'

function WorkPage() {
  return (
    <PageWrapper>
      <Seo
        {...pageSeo.work}
        schema={[
          createBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Work', path: '/work' },
          ]),
        ]}
      />
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
