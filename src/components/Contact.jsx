import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Mail, Send, ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { services } from '../data/services'
import Button from './Button'
import Card from './Card'
import Container from './Container'
import SectionTitle from './SectionTitle'

const initialForm = {
  name: '',
  email: '',
  service: '',
  message: '',
}

const CONTACT_RECEIVER_EMAIL = 'admin@inaivosolutions.com'
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_RECEIVER_EMAIL}`

function Contact({ showHeader = true }) {
  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [toastMessage, setToastMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!toastMessage) return undefined
    const timer = window.setTimeout(() => setToastMessage(''), 3600)
    return () => window.clearTimeout(timer)
  }, [toastMessage])

  const validateForm = () => {
    const nextErrors = {}

    if (!formData.name.trim()) {
      nextErrors.name = 'Please enter your name.'
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Please use a valid email address.'
    }

    if (!formData.service) {
      nextErrors.service = 'Please select a service type.'
    }

    if (!formData.message.trim()) {
      nextErrors.message = 'Please tell us about your project.'
    } else if (formData.message.trim().length < 20) {
      nextErrors.message = 'Please add at least 20 characters.'
    }

    return nextErrors
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSending(true)

    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          service_type: formData.service,
          message: formData.message.trim(),
          _subject: 'New inquiry from Inaivo Solutions website',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send form.')
      }

      setIsSending(false)
      setFormData(initialForm)
      setErrors({})
      setToastMessage('Thanks! Your request has been sent. We will reach out shortly.')
    } catch {
      setIsSending(false)
      setToastMessage('Submission failed. Please email us directly at admin@inaivosolutions.com.')
    }
  }

  const inputBaseClass =
    'h-11 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 text-sm text-[#EAF0FF] placeholder:text-[#7B86A4] outline-none transition focus:border-[#1DA1FF]/60 focus:ring-2 focus:ring-[#1DA1FF]/20'

  const textareaClass = `${inputBaseClass} h-auto min-h-32 py-2.5`

  const toastAnimation = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 12 },
        transition: { duration: 0.2, ease: 'easeOut' },
      }

  return (
    <section className="section-pad pt-8">
      <Container>
        {showHeader ? (
          <SectionTitle
            eyebrow="Contact"
            title="Let's build your next software advantage."
            subtitle="Tell us what you are building and we will respond with a tailored approach."
          />
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="h-full">
            <h3 className="font-display text-2xl font-semibold text-[#EAF0FF]">Start with a free strategy call</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#A9B4D0]">
              We will review your goals, current stack, constraints, and launch timeline. You will receive clear next steps
              and recommended delivery options.
            </p>

            <div className="mt-6 space-y-3 text-sm text-[#C3CCE2]">
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-[#00D4FF]" />
                admin@inaivosolutions.com
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#00D4FF]" />
                NDA-friendly workflow available
              </p>
            </div>
          </Card>

          <Card className="h-full" glow>
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[#C3CCE2]">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={inputBaseClass}
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name ? <p className="mt-1 text-xs text-[#FF8FA3]">{errors.name}</p> : null}
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#C3CCE2]">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={inputBaseClass}
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email ? <p className="mt-1 text-xs text-[#FF8FA3]">{errors.email}</p> : null}
              </div>

              <div>
                <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-[#C3CCE2]">
                  Service Type
                </label>
                <select
                  id="service"
                  name="service"
                  className={inputBaseClass}
                  value={formData.service}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.service)}
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
                {errors.service ? <p className="mt-1 text-xs text-[#FF8FA3]">{errors.service}</p> : null}
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-[#C3CCE2]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className={textareaClass}
                  placeholder="Tell us about your goals, timeline, and technical requirements."
                  value={formData.message}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.message)}
                />
                {errors.message ? <p className="mt-1 text-xs text-[#FF8FA3]">{errors.message}</p> : null}
              </div>

              <Button type="submit" className="w-full" disabled={isSending}>
                {isSending ? 'Sending...' : 'Send Request'}
                <Send size={16} />
              </Button>
            </form>
          </Card>
        </div>
      </Container>

      <AnimatePresence>
        {toastMessage ? (
          <motion.div
            className="fixed bottom-6 right-6 z-[70] rounded-xl border border-[#1DA1FF]/35 bg-[#070B17]/95 px-4 py-3 text-sm text-[#EAF0FF] shadow-[0_20px_40px_rgba(5,7,14,0.65)]"
            {...toastAnimation}
          >
            {toastMessage}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}

export default Contact
