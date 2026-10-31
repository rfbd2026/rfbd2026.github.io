/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./messages/**/*.{json,ts}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FDF9F5",
        ink: "#0B0B0B",
        cobalt: "#0B0B0B",
        lime: "#D6F5B3",
        charcoal: "#1C1C1C",
        muted: "#8A8780",
        white: "#FFFFFF",
        rule: "#E6E1DA",
        mist: "#F1EEEA"
      },
      fontFamily: {
        sans: ["Inter Variable", "Vazirmatn Variable", "sans-serif"],
        display: ["Inter Variable", "Vazirmatn Variable", "sans-serif"],
        persian: ["Vazirmatn Variable", "sans-serif"]
      },
      letterSpacing: {
        editorial: "-0.045em"
      },
      maxWidth: {
        shell: "1440px"
      },
      boxShadow: {
        ink: "0 12px 36px rgba(23, 23, 23, 0.08)"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
