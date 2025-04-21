/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        '18': '4.5rem',
      },
      fontFamily: {
        kufi: ['Noto Kufi Arabic', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#E6F3FF',
          100: '#CCE7FF',
          200: '#99CEFF',
          300: '#66B5FF',
          400: '#339CFF',
          500: '#0072CE', // Main brand color
          600: '#005BA5',
          700: '#00447C',
          800: '#002D52',
          900: '#001629',
        },
        accent: {
          purple: {
            50: '#F5F0F9',
            100: '#EBE1F3',
            200: '#D7C3E7',
            300: '#C3A5DB',
            400: '#AF87CF',
            500: '#7030A0', // Purple for secondary actions
            600: '#5A2680',
            700: '#431D60',
            800: '#2D1340',
            900: '#160A20',
          },
          orange: {
            50: '#FFF2E6',
            100: '#FFE5CC',
            200: '#FFCB99',
            300: '#FFB166',
            400: '#FF9733',
            500: '#E66100', // Orange for warnings/important actions
            600: '#B84D00',
            700: '#8A3A00',
            800: '#5C2600',
            900: '#2E1300',
          },
          yellow: {
            50: '#FFF8E6',
            100: '#FFF1CC',
            200: '#FFE399',
            300: '#FFD566',
            400: '#FFC733',
            500: '#F2A900', // Yellow for notifications/highlights
            600: '#C28700',
            700: '#916400',
            800: '#614300',
            900: '#302100',
          },
          green: {
            50: '#E6F5E6',
            100: '#CCEBCC',
            200: '#99D699',
            300: '#66C266',
            400: '#33AD33',
            500: '#008A00', // Green for success states
            600: '#006E00',
            700: '#005300',
            800: '#003700',
            900: '#001C00',
          },
        },
        // High contrast colors for text and backgrounds
        contrast: {
          high: {
            light: '#FFFFFF',
            dark: '#000000',
          },
          text: {
            primary: '#1A1A1A', // For main text
            secondary: '#4A4A4A', // For secondary text
            disabled: '#757575', // For disabled text
          },
          background: {
            light: '#FFFFFF',
            dark: '#121212',
            elevated: '#1E1E1E',
          },
        },
      },
    },
  },
  plugins: [],
};