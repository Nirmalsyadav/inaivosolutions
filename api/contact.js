const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 6
const MESSAGE_MIN_LENGTH = 20
const MESSAGE_MAX_LENGTH = 2000

const rateLimitStore = new Map()

const allowedServices = new Set([
  'Web Development',
  'Web Applications',
  'SaaS Development',
  'Classified Marketplace Platforms',
  'Digital Marketing',
  'Graphic Design & Branding',
])

function getClientIp(request) {
  const forwarded = request.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim()
  }

  const realIp = request.headers['x-real-ip']
  if (typeof realIp === 'string' && realIp.length > 0) {
    return realIp.trim()
  }

  return 'unknown'
}

function cleanOldRateLimitBuckets(now) {
  for (const [ip, bucket] of rateLimitStore.entries()) {
    if (now - bucket.windowStart >= RATE_LIMIT_WINDOW_MS) {
      rateLimitStore.delete(ip)
    }
  }
}

function enforceRateLimit(ip, now) {
  cleanOldRateLimitBuckets(now)

  const bucket = rateLimitStore.get(ip)
  if (!bucket) {
    rateLimitStore.set(ip, { windowStart: now, count: 1 })
    return { limited: false, retryAfterSeconds: 0 }
  }

  if (now - bucket.windowStart >= RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { windowStart: now, count: 1 })
    return { limited: false, retryAfterSeconds: 0 }
  }

  bucket.count += 1
  if (bucket.count > RATE_LIMIT_MAX_REQUESTS) {
    const retryAfterSeconds = Math.ceil((RATE_LIMIT_WINDOW_MS - (now - bucket.windowStart)) / 1000)
    return { limited: true, retryAfterSeconds }
  }

  return { limited: false, retryAfterSeconds: 0 }
}

function stripControlChars(value, allowNewline = false) {
  return String(value ?? '')
    .split('')
    .filter((char) => {
      const code = char.charCodeAt(0)
      if (allowNewline && code === 10) return true
      return code >= 32 && code !== 127
    })
    .join('')
}

function sanitizeInlineText(value, maxLength) {
  return stripControlChars(value)
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength)
}

function sanitizeMessage(value) {
  return stripControlChars(value, true)
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, MESSAGE_MAX_LENGTH)
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function normalizeBody(rawBody) {
  if (!rawBody) return {}
  if (typeof rawBody === 'string') {
    try {
      return JSON.parse(rawBody)
    } catch {
      return {}
    }
  }
  if (typeof rawBody === 'object') return rawBody
  return {}
}

async function verifyTurnstileToken(token, ipAddress, secretKey) {
  const payload = new URLSearchParams()
  payload.set('secret', secretKey)
  payload.set('response', token)
  if (ipAddress && ipAddress !== 'unknown') {
    payload.set('remoteip', ipAddress)
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: payload,
  })

  if (!response.ok) {
    return { success: false, errorCodes: ['turnstile-service-unavailable'] }
  }

  const data = await response.json()
  return {
    success: Boolean(data.success),
    errorCodes: Array.isArray(data['error-codes']) ? data['error-codes'] : [],
  }
}

function buildPlainTextEmail({ name, email, service, message, ipAddress }) {
  return [
    'New inquiry from inaivosolutions.com',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Service: ${service}`,
    `IP: ${ipAddress}`,
    '',
    'Message:',
    message,
  ].join('\n')
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function parseBooleanEnv(value, fallback = false) {
  if (typeof value !== 'string') return fallback
  const normalized = value.trim().toLowerCase()
  if (normalized === 'true') return true
  if (normalized === 'false') return false
  return fallback
}

function parsePort(value, fallback = 587) {
  const parsed = Number(value)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback
}

async function sendViaNodemailer(payload, receiverEmail) {
  const smtpHost = process.env.SMTP_HOST
  const smtpPort = parsePort(process.env.SMTP_PORT, 587)
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const smtpSecure = parseBooleanEnv(process.env.SMTP_SECURE, smtpPort === 465)
  const smtpFrom = process.env.SMTP_FROM || `Inaivo Solutions <${smtpUser}>`

  if (!smtpHost || !smtpUser || !smtpPass) {
    throw new Error('SMTP configuration is incomplete. Configure SMTP_HOST, SMTP_USER, and SMTP_PASS.')
  }

  const { default: nodemailer } = await import('nodemailer')
  const safeName = escapeHtml(payload.name)
  const safeEmail = escapeHtml(payload.email)
  const safeService = escapeHtml(payload.service)
  const safeIp = escapeHtml(payload.ipAddress)
  const safeMessage = escapeHtml(payload.message)

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  await transporter.sendMail({
    from: smtpFrom,
    to: receiverEmail,
    replyTo: payload.email,
    subject: `New website inquiry: ${payload.service}`,
    text: buildPlainTextEmail(payload),
    html: `
      <h2>New Inquiry from Inaivo Solutions Website</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Service:</strong> ${safeService}</p>
      <p><strong>IP:</strong> ${safeIp}</p>
      <hr />
      <p style="white-space: pre-wrap;"><strong>Message:</strong><br/>${safeMessage}</p>
    `,
  })
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ ok: false, message: 'Method not allowed.' })
  }

  const ipAddress = getClientIp(request)
  const now = Date.now()
  const rateLimit = enforceRateLimit(ipAddress, now)

  if (rateLimit.limited) {
    response.setHeader('Retry-After', String(rateLimit.retryAfterSeconds))
    return response.status(429).json({
      ok: false,
      message: `Too many requests. Try again in ${rateLimit.retryAfterSeconds}s.`,
    })
  }

  const body = normalizeBody(request.body)

  const name = sanitizeInlineText(body.name, 80)
  const email = sanitizeInlineText(body.email, 120).toLowerCase()
  const service = sanitizeInlineText(body.service, 120)
  const message = sanitizeMessage(body.message)
  const website = sanitizeInlineText(body.website, 200)
  const turnstileToken = sanitizeInlineText(body.turnstileToken, 2048)

  if (website) {
    // Honeypot: return success for bots to avoid signal amplification.
    return response.status(200).json({ ok: true })
  }

  if (name.length < 2) {
    return response.status(400).json({ ok: false, message: 'Please provide a valid name.' })
  }

  if (!validateEmail(email)) {
    return response.status(400).json({ ok: false, message: 'Please provide a valid email.' })
  }

  if (!allowedServices.has(service)) {
    return response.status(400).json({ ok: false, message: 'Please select a valid service.' })
  }

  if (message.length < MESSAGE_MIN_LENGTH) {
    return response.status(400).json({ ok: false, message: 'Please enter a longer project message.' })
  }

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY
  const captchaEnabled = parseBooleanEnv(process.env.TURNSTILE_ENABLED, false)

  if (captchaEnabled) {
    if (!turnstileSecret) {
      return response.status(500).json({
        ok: false,
        message: 'Captcha is enabled but TURNSTILE_SECRET_KEY is missing.',
      })
    }

    if (!turnstileToken) {
      return response.status(400).json({ ok: false, message: 'Captcha token is missing.' })
    }

    const verification = await verifyTurnstileToken(turnstileToken, ipAddress, turnstileSecret)
    if (!verification.success) {
      return response.status(400).json({ ok: false, message: 'Captcha verification failed. Please retry.' })
    }
  }

  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'admin@inaivosolutions.com'

  try {
    await sendViaNodemailer({ name, email, service, message, ipAddress }, receiverEmail)
    return response.status(200).json({ ok: true })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown email delivery error.'
    return response.status(502).json({
      ok: false,
      message: 'Message delivery failed. Please email admin@inaivosolutions.com directly.',
      error: process.env.NODE_ENV === 'production' ? undefined : errorMessage,
    })
  }
}
