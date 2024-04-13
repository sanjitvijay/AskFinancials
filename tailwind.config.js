/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: ["light", "dark", 
      {
        customtheme: {}
      }
    ]
  }
}
