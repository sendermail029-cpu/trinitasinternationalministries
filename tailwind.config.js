/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        gold: "#D4AF37",
        navy: "#0B1C2D"
      },
      boxShadow: {
        premium: "0 16px 45px rgba(11, 28, 45, 0.35)"
      },
      backgroundImage: {
        'hero-worship': "linear-gradient(rgba(11, 28, 45, 0.82), rgba(11, 28, 45, 0.92)), url('https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1800&q=80')"
      }
    }
  },
  plugins: []
};
