import Button from '../components/Button'
import Container from '../components/Container'

function NotFoundPage() {
  return (
    <section className="section-pad">
      <Container>
        <div className="glass-card rounded-3xl border border-white/12 p-8 text-center sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#89D7FF]">404</p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-[#EAF0FF] sm:text-5xl">
            Page not found
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-[#A9B4D0] sm:text-base">
            The page you requested does not exist or may have moved. Return to home and continue exploring.
          </p>
          <div className="mt-8 flex justify-center">
            <Button to="/">Back to Home</Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default NotFoundPage
