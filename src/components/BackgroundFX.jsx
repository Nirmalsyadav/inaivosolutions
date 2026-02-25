function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[#05070E]" />
      <div className="bg-grid absolute inset-0 opacity-40" />
      <div className="animated-gradient absolute -right-32 top-[-12rem] h-[30rem] w-[30rem] rounded-full" />
      <div className="absolute -left-28 bottom-[-12rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.2),transparent_65%)] blur-2xl" />
      <div className="stars-layer absolute inset-0 opacity-40" />
      <div className="noise-layer absolute inset-0 opacity-60" />
    </div>
  )
}

export default BackgroundFX
