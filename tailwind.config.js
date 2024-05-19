/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        'customCol': '259px minmax(0, 1fr)',
        'hiddenCol': '65px minmax(0, 1fr)',
        'productCol': '259px 259px 259px 259px',
        'detailProductCol': '110px 450px 450px'
      },
      colors:{
        'primary': '#4fa607',
        'second': '#FF0000',
        'accent': '#e9ecef',
        'icon': '#1e1e27',
        'content': '#f5f5fa'
      }
    },
  },
  plugins: [],
  darkMode: "class"
}

