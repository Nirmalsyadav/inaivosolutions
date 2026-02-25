import Contact from '../components/Contact'
import PageHeader from '../components/PageHeader'

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to Inaivo Solutions about your next software initiative."
        subtitle="Share your goals, timeline, and technical context. We will reply with a practical plan and next steps."
      />
      <Contact showHeader={false} />
    </>
  )
}

export default ContactPage
