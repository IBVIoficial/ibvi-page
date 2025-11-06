/** @type {import('tailwindcss').Config} */
module.exports = {
   darkMode: 'class',
   content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
   theme: {
      extend: {
         fontFamily: {
            playfair: ['Playfair Display', 'serif'],
            inter: ['Inter', 'sans-serif'],
         },
         letterSpacing: {
            'playfair-tight': '-0.02em',
         },
         colors: {
            // Brand Colors
            'ibvi-teal': {
               50: '#e0f4f8',
               100: '#80d0e0',
               200: '#33b0c5',
               300: '#0098b4',
               400: '#0085a1',
               500: '#00758f',
               600: '#00677d',
               700: '#005a6b', // Primary brand color
               800: '#004d56',
               900: '#003840',
            },

            // Luxury Gold Colors
            'luxury-gold': {
               DEFAULT: '#caaa6d',
               light: '#d6bc8a',
               dark: '#b89758',
            },

            // Base Colors
            background: '#ffffff',
            foreground: '#171717',

            // Cream/Ivory for light backgrounds
            cream: '#f9f8f6',

            // Dark mode specific
            'dark-bg': 'rgb(14, 19, 22)',
            'dark-surface': '#1f3f47',

            // Semantic color mappings
            primary: '#28515a', // Main brand color (emerald-500 override)
            'primary-hover': '#1f3f47', // Hover state (emerald-600 override)
            'primary-light': '#3a6b75', // Lighter shade (emerald-400 override)
            'primary-dark': '#003840', // Darker shade (emerald-900 override)

            accent: {
               primary: '#005a6b', // ibvi-teal-700
               'primary-hover': '#004d56', // ibvi-teal-800
               secondary: '#00758f', // ibvi-teal-500
               light: '#0098b4', // ibvi-teal-300
               dark: '#003840', // ibvi-teal-900
            },

            // UI semantic colors
            link: '#28515a',
            'link-hover': '#1f3f47',
            divider: '#28515a',
            highlight: '#28515a',
            'stat-value': '#28515a',
            'stat-alt': '#3a6b75',
            'button-primary': '#28515a',
            'button-primary-hover': '#1f3f47',
            'border-primary': '#28515a',

            // Text colors
            text: {
               primary: '#111827', // gray-900
               secondary: '#1f2937', // gray-800
               tertiary: '#374151', // gray-700
               muted: '#6b7280', // gray-500
               light: '#9ca3af', // gray-400
               inverse: '#ffffff', // white
            },

            // Background colors
            surface: {
               primary: '#ffffff', // white
               secondary: '#f9fafb', // gray-50
               tertiary: '#f3f4f6', // gray-100
               muted: '#e5e7eb', // gray-200
               dark: '#1f2937', // gray-800
               darker: '#111827', // gray-900
            },

            // Border colors
            border: {
               default: '#e5e7eb', // gray-200
               light: '#f3f4f6', // gray-100
               medium: '#d1d5db', // gray-300
               dark: '#374151', // gray-700
            },

            // Secondary colors for gradients
            secondary: '#007A8B',

            // Override default Tailwind emerald with IBVI teal shades
            emerald: {
               300: '#4d8590',
               400: '#3a6b75',
               500: '#28515a',
               600: '#1f3f47',
               900: '#003840',
            },
         },
         fontFamily: {
            sans: ['Inter', 'sans-serif'],
            heading: ['Inter', 'sans-serif'],
         },
         borderWidth: {
            3: '3px',
         },
         animation: {
            'fade-in': 'fadeIn 0.5s ease-in-out',
            'fade-in-up': 'fadeInUp 0.8s ease-out',
            'slide-in': 'slideIn 0.5s ease-out',
         },
         keyframes: {
            fadeIn: {
               '0%': {opacity: '0'},
               '100%': {opacity: '1'},
            },
            fadeInUp: {
               '0%': {opacity: '0', transform: 'translateY(30px)'},
               '100%': {opacity: '1', transform: 'translateY(0)'},
            },
            slideIn: {
               '0%': {transform: 'translateX(-100%)'},
               '100%': {transform: 'translateX(0)'},
            },
         },
         boxShadow: {
            xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
         },
      },
   },
   plugins: [require('@tailwindcss/typography')],
};
