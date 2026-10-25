/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#171717',
          light: '#1e1e1e',
          dark: '#0f0f0f',
        },
        ivory: {
          DEFAULT: '#F2EBDD',
          muted: '#D8D0C0',
          dark: '#B0A896',
        },
        terracotta: {
          DEFAULT: '#A64B42',
          hover: '#BA594F',
          muted: '#853B33',
          dark: '#632B25',
        },
        stone: {
          DEFAULT: '#8C8B83',
          light: '#A3A29B',
          dark: '#5C5B55',
        },
        charcoal: {
          DEFAULT: '#222222',
          elevated: '#2a2a2a',
          surface: '#1c1c1c',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'widest-editorial': '0.25em',
        'loose-editorial': '0.15em',
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}
