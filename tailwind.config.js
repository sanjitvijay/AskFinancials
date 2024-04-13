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
        customtheme: {
          "primary": "#0CCE6B",
          "secondary": "#FFFFFF",
          "accent": "#F00428",
          "neutral": "#D7D5D7",
          "base-100": "#1F1F1F",
          "info": "#00aeff",
          "success": "#44f600",
          "warning": "#efc100",
          "error": "#ff6c6c",
        }
      }
    ]
  }
}

