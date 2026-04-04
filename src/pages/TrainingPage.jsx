import PageWrapper from '../components/PageWrapper'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'
import Card from '../components/Card'
import Button from '../components/Button'
import TrainingPrograms from '../components/TrainingPrograms'
import TrainingForm from '../components/TrainingForm'
import { createBreadcrumbSchema, pageSeo } from '../data/seo'

function TrainingPage() {
  return (
    <PageWrapper>
      <Seo
        {...(pageSeo.training || {})}
        schema={[
          createBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Training', path: '/training' },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Training"
        title="Training & Internship Programs"
        subtitle="Learn job-ready skills through practical training, real projects, and guided mentorship."
        primaryCta={{ label: 'Apply Now', to: '/training#apply' }}
        secondaryCta={{ label: 'Enquire Now', to: '/contact' }}
      />

      <section className="section-pad">
        <Container>
          <SectionTitle eyebrow="Programs" title="Practical, project-based training" subtitle="Select a program focused on real work experience and portfolio-ready projects." />

          <TrainingPrograms />
        </Container>
      </section>

      <section className="section-pad">
        <Container>
          <SectionTitle eyebrow="Why Learn With Inaivo" title="Practical training led by working developers" subtitle="Focused on building portfolio work, practical skills, and placement-ready outcomes." />

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <h3 className="font-display text-lg font-semibold text-[#EAF0FF]">Real project-based learning</h3>
              <p className="mt-3 text-sm text-[#A9B4D0]">Work on tasks and features from real product backlogs to build portfolio pieces.</p>
            </Card>
            <Card>
              <h3 className="font-display text-lg font-semibold text-[#EAF0FF]">Internship-oriented approach</h3>
              <p className="mt-3 text-sm text-[#A9B4D0]">Practical exposure with mentor-led sprints and code reviews, not just lectures.</p>
            </Card>
            <Card>
              <h3 className="font-display text-lg font-semibold text-[#EAF0FF]">Portfolio & placement support</h3>
              <p className="mt-3 text-sm text-[#A9B4D0]">Resume guidance, interview prep, and portfolio packaging to help you present your work.</p>
            </Card>
          </div>
        </Container>
      </section>

      <section className="section-pad">
        <Container>
          <SectionTitle eyebrow="Internship Exposure" title="Guided exposure to practical engineering tasks" subtitle="Participants may get hands-on experience in common product development activities." />

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <h4 className="font-display text-sm font-semibold text-[#89D7FF]">Feature Development</h4>
              <p className="mt-2 text-sm text-[#A9B4D0]">Implement small features under mentor guidance and ship working increments.</p>
            </Card>
            <Card>
              <h4 className="font-display text-sm font-semibold text-[#89D7FF]">Bug Fixing</h4>
              <p className="mt-2 text-sm text-[#A9B4D0]">Understand debugging workflows, error tracing, and fix prioritization.</p>
            </Card>
            <Card>
              <h4 className="font-display text-sm font-semibold text-[#89D7FF]">API Integration</h4>
              <p className="mt-2 text-sm text-[#A9B4D0]">Integrate third-party APIs and learn secure data handling patterns.</p>
            </Card>
            <Card>
              <h4 className="font-display text-sm font-semibold text-[#89D7FF]">Git Collaboration</h4>
              <p className="mt-2 text-sm text-[#A9B4D0]">Work with Git, branches, and pull request workflows in a team setting.</p>
            </Card>
            <Card>
              <h4 className="font-display text-sm font-semibold text-[#89D7FF]">Deployment Basics</h4>
              <p className="mt-2 text-sm text-[#A9B4D0]">Learn simple deployment flows and environment considerations for production.</p>
            </Card>
          </div>
        </Container>
      </section>

      <section className="section-pad" id="apply">
        <Container>
          <SectionTitle eyebrow="Apply / Enquire" title="Ready to apply?" subtitle="Fill the short application below and our team will reach out with next steps." />

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-2xl font-semibold text-[#EAF0FF]">Who can join</h3>
              <ul className="mt-4 space-y-2 text-sm text-[#A9B4D0]">
                <li>Students</li>
                <li>Fresh graduates</li>
                <li>Career switchers</li>
                <li>Job seekers</li>
              </ul>

              <div className="mt-8">
                <h4 className="font-display text-lg font-semibold text-[#EAF0FF]">Final CTA</h4>
                <p className="mt-2 text-sm text-[#A9B4D0]">Ready to start your tech career with practical training?</p>
                <div className="mt-4 flex gap-3">
                  <Button to="#apply">Apply Now</Button>
                  <Button to="/contact" variant="secondary">Contact Us</Button>
                </div>
              </div>
            </div>

            <div>
              <TrainingForm />
            </div>
          </div>
        </Container>
      </section>
    </PageWrapper>
  )
}

export default TrainingPage
