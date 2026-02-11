/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg-primary)',
        text: 'var(--text-primary)',
        accent: 'var(--accent)',
        card: 'var(--card-bg)',
        border: 'var(--border-color)',
        input: 'var(--input-bg)',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
        cute: ['"DM Serif Display"', 'serif'], // Optional for "Cute" mode headlines
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
      },
      borderRadius: {
        theme: 'var(--radius-theme)',
      },
    },
  },
  plugins: [],
}
