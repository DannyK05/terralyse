import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "terra-black": "var(--background)",
        "terra-white": "#ffffff",
        "terra-accent": "var(--light-brown)",
        terra: "var(--dark-brown)",
        "terra-accent-bg": "var(--accent)",
      },
    },
  },
  plugins: [],
};
export default config;
