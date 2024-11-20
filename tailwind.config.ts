import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
      ],
      theme: {
        extend: {
   
          
          colors: {
            background: "var(--background)",
            foreground: "var(--foreground)",
          },
          screens: {
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
            'md-lg': '900px',
            'lg-xl': '1150px',
          },
        
        },
     
      
      },
      plugins: [
        function({ addUtilities }:PluginAPI) {
          const newUtilities = {
            ".text-shadow": {
              textShadow: "0px 2px 3px #A9A9A9"
            },
            ".text-shadow-md": {
              textShadow: "0px 3px 3px #A9A9A9"
            },
            ".text-shadow-lg": {
              textShadow: "0px 5px 3px #A9A9A9"
            },
            ".text-shadow-xl": {
              textShadow: "0px 7px 3px #A9A9A9"
            },
            ".text-shadow-2xl": {
              textShadow: "0px 10px 3px #A9A9A9"
            },
            ".text-shadow-none": {
              textShadow: "none"
            }
          };
    
          addUtilities(newUtilities);
        }
      ],
    };

export default config;

