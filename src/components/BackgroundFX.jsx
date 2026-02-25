function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[#05070E]" />
      <div className="bg-grid absolute inset-0 opacity-40" />
      <div className="gradient-a absolute -right-36 top-[-12rem] h-[32rem] w-[32rem] rounded-full" />
      <div className="gradient-b absolute -left-28 bottom-[-10rem] h-[30rem] w-[30rem] rounded-full" />
      <div className="radial-sweep absolute inset-0 opacity-65" />
      <div className="stars-layer absolute inset-0 opacity-40" />
      <div className="noise-layer absolute inset-0 opacity-60" />
    </div>
  )
}

export default BackgroundFX
