import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'

const MotionLink = motion(Link)

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-xl border text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1DA1FF]'

const variants = {
  primary:
    'border-[#1DA1FF]/60 bg-gradient-to-r from-[#1DA1FF] to-[#00D4FF] text-[#05070E] shadow-[0_8px_30px_rgba(29,161,255,0.35)] hover:brightness-110',
  secondary:
    'border-white/15 bg-white/5 text-[#EAF0FF] hover:border-[#1DA1FF]/60 hover:bg-[#1DA1FF]/10',
  ghost:
    'border-transparent bg-transparent text-[#A9B4D0] hover:bg-white/5 hover:text-[#EAF0FF]',
}

const sizes = {
  sm: 'h-10 px-4',
  md: 'h-11 px-5',
  lg: 'h-12 px-6 text-[15px]',
}

function Button({
  as = 'button',
  href,
  to,
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  ...props
}) {
  const reduceMotion = useReducedMotion()
  const motionProps = reduceMotion
    ? {}
    : {
        whileHover: { y: -2 },
        whileTap: { scale: 0.98 },
      }

  const classes = [
    baseStyles,
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (to) {
    return (
      <MotionLink to={to} className={classes} {...motionProps} {...props}>
        {children}
      </MotionLink>
    )
  }

  if (as === 'a') {
    return (
      <motion.a href={href} className={classes} {...motionProps} {...props}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button type="button" className={classes} {...motionProps} {...props}>
      {children}
    </motion.button>
  )
}

export default Button
