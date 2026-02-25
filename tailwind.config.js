/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#05070E',
          surface: '#070B17',
          accent: '#1DA1FF',
          cyan: '#00D4FF',
          glow: '#8B5CF6',
          text: '#EAF0FF',
          muted: '#A9B4D0',
        },
      },
      fontFamily: {
        display: ['Sora', 'Space Grotesk', 'sans-serif'],
        body: ['Space Grotesk', 'Sora', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(29,161,255,.35), 0 14px 45px rgba(29,161,255,.18)',
        card: '0 20px 50px rgba(5,7,14,.55)',
      },
      borderColor: {
        soft: 'rgba(255,255,255,0.08)',
      },
    },
  },
}
