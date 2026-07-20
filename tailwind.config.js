/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Deep navy → near-black base
        night: {
          DEFAULT: '#0A1128',
          900: '#070B1A',
          950: '#050813',
          800: '#0B0F1A',
          700: '#111832',
          600: '#182142',
        },
        // Rich metallic gold accent
        gold: {
          DEFAULT: '#C9A227',
          light: '#E7CE6B',
          400: '#D4AF37',
          500: '#C9A227',
          600: '#A9871B',
          700: '#8A6D14',
        },
        cream: {
          DEFAULT: '#F5F1E6',
          dim: '#CFC9B8',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 10px 40px -12px rgba(201, 162, 39, 0.35)',
        'gold-lg': '0 20px 60px -12px rgba(201, 162, 39, 0.45)',
        card: '0 12px 40px -16px rgba(0, 0, 0, 0.6)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #E7CE6B 0%, #C9A227 45%, #8A6D14 100%)',
        'night-radial': 'radial-gradient(1200px 600px at 50% -10%, #182142 0%, #0A1128 45%, #050813 100%)',
      },
      keyframes: {
        'fade-rise': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        'fade-rise': 'fade-rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        shimmer: 'shimmer 6s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
