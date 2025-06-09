import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
const config: Config = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/common/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens:{
        sm:"320px",
      },
      colors: {
        blue: "#1350E5",
        semi_blue: "#E8ECF4",
        light_dark: "#1C1E1C",
        gray: "#676D75",
        "blue-light": "rgba(19, 80, 229, 0.1)",
        dark: "#0B1423",
        "semi-dark": "#0F1C32",
        grayDark: "#666666",
        stroke: "#E8ECF4",
        semi_light: "#F7F8F9",
        navy_blue: "#0E1B30",
        navy_light: "#141D2F",
        light: "rgba(19, 80, 229, 0.1)",
        "semi-gray": "#25252566",
      },
        backgroundImage: {
        'join-community-bg-gradient': 'linear-gradient(270deg, #0F1C32 0%, #0C182B 100%)',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".border-gradient": {
          border: "1px solid",
          borderImageSource:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(102, 102, 102, 0.05))",
          borderImageSlice: "1",
        },
         '.table-glass-border': {
          borderImageSlice: '1',
          backdropFilter: 'blur(12px)', // Glassmorphism blur
        },
      });
    }),
  ],
};
export default config;
