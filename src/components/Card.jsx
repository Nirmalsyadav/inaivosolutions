import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'

function Card({ children, className = '', tilt = false, glow = false, ...props }) {
  const reduceMotion = useReducedMotion()
  const [transformStyle, setTransformStyle] = useState({})

  const motionProps = reduceMotion
    ? {}
    : {
        whileHover: { y: -4 },
        transition: { type: 'spring', stiffness: 260, damping: 22 },
      }

  const handleMouseMove = (event) => {
    if (!tilt || reduceMotion) return

    const bounds = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - bounds.left
    const y = event.clientY - bounds.top
    const rotateX = ((y / bounds.height) * 2 - 1) * -4
    const rotateY = ((x / bounds.width) * 2 - 1) * 5

    setTransformStyle({
      transform: `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`,
    })
  }

  const handleMouseLeave = () => {
    if (!tilt || reduceMotion) return
    setTransformStyle({})
  }

  return (
    <motion.div
      className={`glass-card rounded-3xl p-6 ${glow ? 'card-glow' : ''} ${className}`}
      style={transformStyle}
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
