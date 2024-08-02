/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "font-sans": "Space Grotesk",
      },
      colors: {
        primary: "#B9FF66",
        dark: "#191A23",
        dark2: "#292A32",
        light: "#F3F3F3",
        gray: "#898989",
      },
      fontSize: {
        h1: "3.75rem",
        "mob-h1": "2.688rem",
        h2: "2.5rem",
        "mob-h2": "2.25rem",
        h3: "1.875rem",
        "mob-h3": "1.625rem",
        h4: "1.25rem",
        "mob-h4": "1.125rem",
        base: "1.125rem",
        "mob-base": "1rem",
      },
    },
  },
  plugins: [
    "postcss-import",
    "tailwindcss/nesting",
    "postcss-nesting",
    "postcss-preset-env",
    {
      features: { "nesting-rules": false },
    },
    "autoprefixer",
  ],
};
