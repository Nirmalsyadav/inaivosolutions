import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ExternalLink, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { work } from '../data/work'
import Button from './Button'
import Card from './Card'
import Container from './Container'
import SectionTitle from './SectionTitle'

function Work({ preview = false }) {
  const [activeProject, setActiveProject] = useState(null)
  const reduceMotion = useReducedMotion()
  const modalRef = useRef(null)
  const closeButtonRef = useRef(null)
  const lastActiveElementRef = useRef(null)

  useEffect(() => {
    if (!activeProject) return undefined

    lastActiveElementRef.current = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setActiveProject(null)
        return
      }

      if (event.key !== 'Tab' || !modalRef.current) return

      const focusableElements = modalRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )

      if (!focusableElements.length) {
        event.preventDefault()
        modalRef.current.focus()
        return
      }

      const firstFocusable = focusableElements[0]
      const lastFocusable = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault()
        lastFocusable.focus()
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault()
        firstFocusable.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      if (lastActiveElementRef.current && typeof lastActiveElementRef.current.focus === 'function') {
        lastActiveElementRef.current.focus()
      }
    }
  }, [activeProject])

  const cardAnimation = (index) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.42, ease: 'easeOut', delay: index * 0.07 },
        }

  const modalAnimation = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 24 },
        transition: { duration: 0.22, ease: 'easeOut' },
      }

  return (
    <section className="section-pad">
      <Container>
        <SectionTitle
          eyebrow="Work"
          title={preview ? 'Recent work built for scale and impact.' : 'Case studies from high-growth software teams.'}
          subtitle={
            preview
              ? 'A snapshot of projects across SaaS, marketplaces, and conversion-focused product ecosystems.'
              : 'See how we solve product, UX, and growth challenges with measurable outcomes.'
          }
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {work.map((project, index) => (
            <motion.div key={project.id} {...cardAnimation(index)}>
              <Card className="flex h-full flex-col" glow>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#89D7FF]">{project.category}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-[#EAF0FF]">{project.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#A9B4D0]">{project.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1 text-xs font-medium text-[#C3CCE2]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#8BD8FF] transition-colors hover:text-[#EAF0FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1DA1FF]"
                  onClick={() => setActiveProject(project)}
                >
                  View details
                  <ExternalLink size={15} />
                </button>
              </Card>
            </motion.div>
          ))}
        </div>

        {preview ? (
          <div className="mt-10 flex justify-start">
            <Button to="/work" variant="secondary">
              Browse all case studies
            </Button>
          </div>
        ) : null}
      </Container>

      <AnimatePresence>
        {activeProject ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 p-4 sm:items-center"
            onClick={() => setActiveProject(null)}
            aria-hidden={!activeProject}
            {...modalAnimation}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${activeProject.title} details`}
              aria-describedby="project-dialog-description"
              tabIndex={-1}
              ref={modalRef}
              className="glass-card max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/15 p-6 sm:p-8"
              onClick={(event) => event.stopPropagation()}
              {...modalAnimation}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#89D7FF]">{activeProject.category}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-[#EAF0FF] sm:text-3xl">{activeProject.title}</h3>
                </div>
                <button
                  type="button"
                  aria-label="Close project details"
                  ref={closeButtonRef}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-[#C3CCE2] transition-colors hover:text-[#EAF0FF]"
                  onClick={() => setActiveProject(null)}
                >
                  <X size={18} />
                </button>
              </div>

              <div id="project-dialog-description" className="mt-7 space-y-5 text-sm leading-relaxed text-[#A9B4D0]">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#89D7FF]">Challenge</p>
                  <p>{activeProject.challenge}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#89D7FF]">Solution</p>
                  <p>{activeProject.solution}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#89D7FF]">Result</p>
                  <p>{activeProject.result}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}

export default Work
