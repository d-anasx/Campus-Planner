/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',   // blue-600
        secondary: '#f59e0b', // amber-500
        neutral: '#111827',
      },
      fontFamily: {
        main: ['Poppins', 'sans-serif'],
      },
    },
  },

  // 🌍 Add global styles using the new CSS nesting syntax
  css: {
    'html, body': {
      fontFamily: 'Poppins, sans-serif',
      backgroundColor: '#f9fafb',
      color: '#111827',
      margin: 0,
      padding: 0,
    },
    h1: {
      fontSize: '2rem',
      fontWeight: '700',
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: '600',
    },
    '.btn': {
      backgroundColor: '#2563eb',
      color: '#fff',
      fontWeight: '600',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      transition: 'background-color 0.3s',
      '&:hover': {
        backgroundColor: '#1d4ed8',
      },
    },
    '.card': {
      backgroundColor: '#fff',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
  },
}
