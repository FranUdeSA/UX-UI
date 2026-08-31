/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        osde: {
          blue: '#1226AA',        // Pantone Dark Blue C oficial de OSDE
          dark: '#0A1666',        // Azul profundo secundario
          light: '#243BC7',       // Azul vibrante
          surface: '#F4F7FC',     // Fondo suave azulado
          border: '#D8E2F2',      // Bordes institucionales
          subtle: '#E8EFFB',      // Fondos sutiles
        },
        severity: {
          0: '#059669', // Verde (Cumple / Sin problema)
          1: '#2563EB', // Azul (Problema cosmético)
          2: '#D97706', // Ámbar (Problema menor)
          3: '#EA580C', // Naranja intenso (Problema mayor)
          4: '#DC2626', // Rojo (Catástrofe de usabilidad)
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'osde-card': '0 4px 20px -2px rgba(18, 38, 170, 0.07), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'osde-hover': '0 12px 30px -4px rgba(18, 38, 170, 0.14), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
