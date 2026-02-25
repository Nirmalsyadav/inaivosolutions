import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, Mail, Send, ShieldCheck } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { services } from '../data/services'
import Button from './Button'
import Card from './Card'
import Container from './Container'
import SectionTitle from './SectionTitle'
import TurnstileField from './TurnstileField'
import { createInAnimation } from '../utils/motion'

const initialForm = {
  name: '',
  email: '',
  service: '',
  message: '',
  website: '',
}

const CONTACT_RECEIVER_EMAIL = 'admin@inaivosolutions.com'
const CONTACT_API_ENDPOINT = import.meta.env.VITE_CONTACT_API_ENDPOINT || '/api/contact'
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || ''
const CAPTCHA_ENABLED = import.meta.env.VITE_TURNSTILE_ENABLED === 'true' && Boolean(TURNSTILE_SITE_KEY)
const SUBMIT_COOLDOWN_MS = 15000
const LAST_SUBMIT_KEY = 'inaivo_last_submit_ts'

function Contact({ showHeader = true }) {
  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [focusedField, setFocusedField] = useState('')
  const [captchaToken, setCaptchaToken] = useState('')
  const [captchaWidgetKey, setCaptchaWidgetKey] = useState(0)
  const [captchaLoadError, setCaptchaLoadError] = useState('')
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('success')
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

    if (CAPTCHA_ENABLED && !captchaToken) {
      nextErrors.captcha = 'Please complete captcha verification.'
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

    if (formData.website.trim()) {
      setToastType('success')
      setToastMessage('Thanks! Your request has been sent. We will reach out shortly.')
      return
    }

    let cooldownRemainingMs = 0
    try {
      const lastSubmitTs = Number(window.localStorage.getItem(LAST_SUBMIT_KEY) || 0)
      cooldownRemainingMs = Math.max(0, SUBMIT_COOLDOWN_MS - (Date.now() - lastSubmitTs))
    } catch {
      cooldownRemainingMs = 0
    }

    if (cooldownRemainingMs > 0) {
      const cooldownSeconds = Math.ceil(cooldownRemainingMs / 1000)
      setToastType('error')
      setToastMessage(`Please wait ${cooldownSeconds}s before sending another request.`)
      return
    }

    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSending(true)

    try {
      const response = await fetch(CONTACT_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          service: formData.service,
          message: formData.message.trim(),
          website: formData.website.trim(),
          turnstileToken: captchaToken,
        }),
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send form.')
      }

      setIsSending(false)
      try {
        window.localStorage.setItem(LAST_SUBMIT_KEY, String(Date.now()))
      } catch {
        // Ignore storage errors and continue.
      }
      setFormData(initialForm)
      setErrors({})
      setCaptchaToken('')
      setCaptchaLoadError('')
      if (CAPTCHA_ENABLED) {
        setCaptchaWidgetKey((prev) => prev + 1)
      }
      setToastType('success')
      setToastMessage('Thanks! Your request has been sent. We will reach out shortly.')
    } catch (error) {
      setIsSending(false)
      setCaptchaToken('')
      if (CAPTCHA_ENABLED) {
        setCaptchaWidgetKey((prev) => prev + 1)
      }
      setToastType('error')
      setToastMessage(
        error instanceof Error && error.message
          ? error.message
          : `Submission failed. Please email us directly at ${CONTACT_RECEIVER_EMAIL}.`,
      )
    }
  }

  const handleCaptchaVerify = useCallback((token) => {
    setCaptchaToken(token)
    setCaptchaLoadError('')
    setErrors((prev) => ({ ...prev, captcha: '' }))
  }, [])

  const handleCaptchaExpire = useCallback(() => {
    setCaptchaToken('')
  }, [])

  const handleCaptchaError = useCallback(() => {
    setCaptchaToken('')
    setCaptchaLoadError('Captcha failed to load. Refresh and try again.')
  }, [])

  const inputBaseClass =
    'h-14 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 pb-2.5 pt-6 text-sm text-[#EAF0FF] placeholder:text-transparent outline-none transition focus:border-[#1DA1FF]/60 focus:ring-2 focus:ring-[#1DA1FF]/20'

  const textareaClass = `${inputBaseClass} h-auto min-h-36 resize-y`
  const selectClass = `${inputBaseClass} appearance-none`
  const isFloating = (fieldName) => focusedField === fieldName || String(formData[fieldName] || '').trim().length > 0

  const getLabelClasses = (fieldName) => {
    if (fieldName === 'service') {
      return 'pointer-events-none absolute left-3 top-2.5 -translate-y-0 text-xs text-[#89D7FF]'
    }

    const floating = isFloating(fieldName)
    const restingPosition =
      fieldName === 'message' ? 'top-5 -translate-y-0 text-sm text-[#7B86A4]' : 'top-1/2 -translate-y-1/2 text-sm text-[#7B86A4]'

    return `pointer-events-none absolute left-3 transition-all duration-200 ${
      floating ? 'top-2.5 -translate-y-0 text-xs text-[#89D7FF]' : restingPosition
    }`
  }

  const toastAnimation = reduceMotion
    ? {}
    : createInAnimation(reduceMotion)

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
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={inputBaseClass}
                  placeholder=" "
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField('')}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  autoComplete="name"
                  required
                  maxLength={80}
                />
                <label htmlFor="name" className={getLabelClasses('name')}>
                  Name
                </label>
                {errors.name ? (
                  <p id="name-error" className="mt-1 text-xs text-[#FF8FA3]">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={inputBaseClass}
                  placeholder=" "
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  autoComplete="email"
                  required
                />
                <label htmlFor="email" className={getLabelClasses('email')}>
                  Email
                </label>
                {errors.email ? (
                  <p id="email-error" className="mt-1 text-xs text-[#FF8FA3]">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div className="relative">
                <select
                  id="service"
                  name="service"
                  className={`${selectClass} ${!formData.service ? 'text-[#7B86A4]' : 'text-[#EAF0FF]'}`}
                  value={formData.service}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('service')}
                  onBlur={() => setFocusedField('')}
                  aria-invalid={Boolean(errors.service)}
                  aria-describedby={errors.service ? 'service-error' : undefined}
                  required
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
                <label htmlFor="service" className={getLabelClasses('service')}>
                  Service Type
                </label>
                {errors.service ? (
                  <p id="service-error" className="mt-1 text-xs text-[#FF8FA3]">
                    {errors.service}
                  </p>
                ) : null}
              </div>

              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  className={textareaClass}
                  placeholder=" "
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField('')}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  required
                  maxLength={2000}
                />
                <label htmlFor="message" className={getLabelClasses('message')}>
                  Message
                </label>
                {errors.message ? (
                  <p id="message-error" className="mt-1 text-xs text-[#FF8FA3]">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              {CAPTCHA_ENABLED ? (
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#89D7FF]">Spam Protection</p>
                  <div className="overflow-x-auto rounded-xl border border-white/12 bg-white/[0.02] p-2">
                    <TurnstileField
                      key={captchaWidgetKey}
                      siteKey={TURNSTILE_SITE_KEY}
                      onVerify={handleCaptchaVerify}
                      onExpire={handleCaptchaExpire}
                      onError={handleCaptchaError}
                    />
                  </div>

                  {errors.captcha ? <p className="mt-1 text-xs text-[#FF8FA3]">{errors.captcha}</p> : null}
                  {captchaLoadError ? <p className="mt-1 text-xs text-[#FF8FA3]">{captchaLoadError}</p> : null}
                </div>
              ) : null}

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
            className={`fixed bottom-6 right-6 z-[70] inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm text-[#EAF0FF] shadow-[0_20px_40px_rgba(5,7,14,0.65)] ${
              toastType === 'success'
                ? 'border-emerald-400/35 bg-[#070B17]/95'
                : 'border-amber-400/35 bg-[#070B17]/95'
            }`}
            role={toastType === 'success' ? 'status' : 'alert'}
            aria-live={toastType === 'success' ? 'polite' : 'assertive'}
            {...toastAnimation}
          >
            {toastType === 'success' ? (
              <CheckCircle2 size={16} className="text-emerald-300" />
            ) : (
              <AlertTriangle size={16} className="text-amber-300" />
            )}
            {toastMessage}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}

export default Contact
