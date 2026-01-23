/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#111111",
        secondary: "#6B7280",
        border: "#E5E7EB",
        accent: "#92302E",
        background: "#FFFFFF",
      },
      fontFamily: {
        sans: [
          "Pretendard", 
          "-apple-system", 
          "BlinkMacSystemFont", 
          "system-ui", 
          "Roboto", 
          "Helvetica Neue", 
          "Segoe UI", 
          "Apple SD Gothic Neo", 
          "Noto Sans KR", 
          "Malgun Gothic", 
          "sans-serif"
        ],
        serif: ["Noto Serif KR", "Nanum Myeongjo", "serif"],
        brush: ["Nanum Brush Script", "cursive"],
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1040px",
        },
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
      },
    },
  },
  plugins: [],
}