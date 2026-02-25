import CtaBanner from '../components/CtaBanner'
import Hero from '../components/Hero'
import Process from '../components/Process'
import Services from '../components/Services'
import Solutions from '../components/Solutions'
import Testimonials from '../components/Testimonials'
import TrustedBy from '../components/TrustedBy'

function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Services preview />
      <Solutions preview />
      <Process />
      <Testimonials />
      <CtaBanner />
    </>
  )
}

export default Home
