/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // Deep Blue
        secondary: "#2563EB", // Royal Blue
        baseGray: "#F9FAFB",
        darkGray: "#0F172A",
      },
      boxShadow: {
        soft: "0 4px 24px rgba(30, 64, 175, 0.08)",
        glow: "0 0 30px rgba(30, 64, 175, 0.15)",
        hoverBlue: "0 0 40px rgba(37, 99, 235, 0.35)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      backdropBlur: {
        xl: "20px",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        softPulse: {
          "0%": { boxShadow: "0 0 0 0 rgba(30, 64, 175, 0.4)" },
          "70%": { boxShadow: "0 0 0 10px rgba(30, 64, 175, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(30, 64, 175, 0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.8s ease-out forwards",
        pulseSoft: "softPulse 4s infinite",
      },
    },
  },
  plugins: [],
};
