import { useEffect, useRef } from 'react'

const TURNSTILE_SCRIPT_ID = 'cf-turnstile-script'
const TURNSTILE_SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

let turnstileScriptPromise

function loadTurnstileScript() {
  if (typeof window === 'undefined') return Promise.reject(new Error('Window is not available.'))
  if (window.turnstile) return Promise.resolve()
  if (turnstileScriptPromise) return turnstileScriptPromise

  turnstileScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById(TURNSTILE_SCRIPT_ID)
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true })
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Turnstile script.')), { once: true })
      return
    }

    const script = document.createElement('script')
    script.id = TURNSTILE_SCRIPT_ID
    script.src = TURNSTILE_SCRIPT_SRC
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Turnstile script.'))
    document.head.appendChild(script)
  })

  return turnstileScriptPromise
}

function TurnstileField({ siteKey, className = '', onVerify, onExpire, onError, theme = 'dark' }) {
  const containerRef = useRef(null)
  const widgetIdRef = useRef(null)

  useEffect(() => {
    if (!siteKey || !containerRef.current) return undefined

    let isMounted = true

    const renderWidget = () => {
      if (!isMounted || !containerRef.current || !window.turnstile) return

      if (widgetIdRef.current !== null) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme,
        callback: (token) => {
          if (isMounted && typeof onVerify === 'function') onVerify(token)
        },
        'expired-callback': () => {
          if (isMounted && typeof onExpire === 'function') onExpire()
        },
        'error-callback': () => {
          if (isMounted && typeof onError === 'function') onError()
        },
      })
    }

    loadTurnstileScript().then(renderWidget).catch(() => {
      if (typeof onError === 'function') onError()
    })

    return () => {
      isMounted = false
      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [siteKey, theme, onVerify, onExpire, onError])

  return (
    <div className={className}>
      <div ref={containerRef} />
    </div>
  )
}

export default TurnstileField
