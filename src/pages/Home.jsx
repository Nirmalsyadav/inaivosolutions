import CtaBanner from '../components/CtaBanner'
import Hero from '../components/Hero'
import Process from '../components/Process'
import PageWrapper from '../components/PageWrapper'
import Services from '../components/Services'
import Solutions from '../components/Solutions'
import Testimonials from '../components/Testimonials'
import TrustedBy from '../components/TrustedBy'

function Home() {
  return (
    <PageWrapper>
      <Hero />
      <TrustedBy />
      <Services preview />
      <Solutions preview />
      <Process />
      <Testimonials />
      <CtaBanner />
    </PageWrapper>
  )
}

export default Home
