/** @type {import('tailwindcss').Config} */
export const tailwindConfig = {
  important: true,
  content: [
    './src/**/*.{components,ts,jsx,tsx,mdx}',
    './shared/**/*.{components,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      screens: {
        'xs': '425px',
        // => @media (min-width: 425px) { ... }

        'sm': '640px',
        // => @media (min-width: 640px) { ... }

        'md': '768px',
        // => @media (min-width: 768px) { ... }

        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }

        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }

        'less_xs': {'max': '425px'},
        // => @media (max-width: 425px) { ... }

        'less_sm': {'max': '640px'},
        // => @media (max-width: 640px) { ... }

        'less_md': {'max': '768px'},
        // => @media (max-width: 640px) { ... }

        'less_lg': {'max': '1024px'},
        // => @media (max-width: 640px) { ... }

        'less_xl': {'max': '1280px'},
        // => @media (max-width: 640px) { ... }

        'less_2xl': {'max': '1536px'},
        // => @media (max-width: 640px) { ... }
      },
      colors: {
        'primary': '#fb6f92',
        'secondary': '#ffafcc',
        'accent': '#007BFF',
        'light': '#F0F1F5',
        'normal': '#79848B',
        'grey': '#F8F8FA',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'header': "url('../../public/header.webp')",
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    // ...
  ],
}

module.exports = tailwindConfig
