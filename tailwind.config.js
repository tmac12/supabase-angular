/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        google: {
          'text-gray': '#3c4043',
          'button-blue': '#1a73e8',
          'button-blue-hover': '#5195ee',
          'button-dark': '#202124',
          'button-dark-hover': '#555658',
          'button-border-light': '#dadce0',
          'logo-blue': '#4285f4',
          'logo-green': '#34a853',
          'logo-yellow': '#fbbc05',
          'logo-red': '#ea4335',
        },
      },
    },
  },
  plugins: [require("daisyui")],
  // config docs: https://daisyui.com/docs/config/
  daisyui: {
    themes: [
      'light', 
      'dark',
    
     {
       'cupcake':{
          ...require("daisyui/src/theming/themes")["cupcake"],
          mytheme: {
              
            "primary": "#2563eb",
                    
            "secondary": "#ff9200",
                    
            "accent": "#607e00",
                    
            "neutral": "#0b0e0a",
                    
            "base-100": "#111827",
                    
            "info": "#00adc4",
                    
            "success": "#719600",
                    
            "warning": "#ff9e00",
                    
            "error": "#cb0f48",
          "--rounded-btn": "0rem"
        }
     }
    }
    
    
    ],
  },
}

