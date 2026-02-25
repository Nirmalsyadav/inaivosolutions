export const smoothEase = [0.22, 1, 0.36, 1]

export function createPageTransition(reduceMotion) {
  if (reduceMotion) return {}

  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
    transition: { duration: 0.34, ease: smoothEase },
  }
}

export function createRevealInView(reduceMotion, delay = 0, amount = 0.35) {
  if (reduceMotion) return {}

  return {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount },
    transition: { duration: 0.45, ease: smoothEase, delay },
  }
}

export function createInAnimation(reduceMotion, delay = 0) {
  if (reduceMotion) return {}

  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, ease: smoothEase, delay },
  }
}

export function createMenuAnimation(reduceMotion) {
  if (reduceMotion) return {}

  return {
    initial: { opacity: 0, y: -12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
    transition: { duration: 0.24, ease: smoothEase },
  }
}
