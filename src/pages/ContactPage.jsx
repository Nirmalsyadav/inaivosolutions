import Contact from '../components/Contact'
import PageHeader from '../components/PageHeader'
import PageWrapper from '../components/PageWrapper'
import Seo from '../components/Seo'
import { createBreadcrumbSchema, pageSeo } from '../data/seo'

function ContactPage() {
  return (
    <PageWrapper>
      <Seo
        {...pageSeo.contact}
        schema={[
          createBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
        ]}
      />
      <PageHeader
        eyebrow="Contact"
        title="Talk to Inaivo Solutions about your next software initiative."
        subtitle="Share your goals, timeline, and technical context. We will reply with a practical plan and next steps."
      />
      <Contact showHeader={false} />
    </PageWrapper>
  )
}

export default ContactPage
