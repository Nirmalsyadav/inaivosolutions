import Contact from '../components/Contact'
import PageHeader from '../components/PageHeader'
import PageWrapper from '../components/PageWrapper'

function ContactPage() {
  return (
    <PageWrapper>
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
