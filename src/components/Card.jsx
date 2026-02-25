import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

function Card({ children, className = '', tilt = false, glow = false, ...props }) {
  const reduceMotion = useReducedMotion()
  const cardRef = useRef(null)
  const frameRef = useRef(0)
  const nextTransformRef = useRef('')

  useEffect(
    () => () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current)
      }
    },
    [],
  )

  const motionProps = reduceMotion || tilt
    ? {}
    : {
        whileHover: { y: -4 },
        transition: { type: 'spring', stiffness: 260, damping: 22 },
      }

  const applyTransform = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = nextTransformRef.current
    }
    frameRef.current = 0
  }

  const handleMouseMove = (event) => {
    if (!tilt || reduceMotion) return

    const bounds = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - bounds.left
    const y = event.clientY - bounds.top
    const rotateX = ((y / bounds.height) * 2 - 1) * -4
    const rotateY = ((x / bounds.width) * 2 - 1) * 5

    nextTransformRef.current = `perspective(900px) translateY(-4px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`
    if (!frameRef.current) {
      frameRef.current = window.requestAnimationFrame(applyTransform)
    }
  }

  const handleMouseLeave = () => {
    if (!tilt || reduceMotion) return
    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current)
      frameRef.current = 0
    }
    if (cardRef.current) {
      cardRef.current.style.transform = ''
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className={`glass-card rounded-3xl p-6 ${glow ? 'card-glow' : ''} ${tilt ? 'will-change-transform' : ''} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card
