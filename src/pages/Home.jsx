import CtaBanner from '../components/CtaBanner'
import Hero from '../components/Hero'
import Process from '../components/Process'
import PageWrapper from '../components/PageWrapper'
import Seo from '../components/Seo'
import Services from '../components/Services'
import Solutions from '../components/Solutions'
import Testimonials from '../components/Testimonials'
import TrustedBy from '../components/TrustedBy'
import {
  createOrganizationSchema,
  createProfessionalServiceSchema,
  pageSeo,
} from '../data/seo'

function Home() {
  return (
    <PageWrapper>
      <Seo
        {...pageSeo.home}
        schema={[createOrganizationSchema(), createProfessionalServiceSchema()]}
      />
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
