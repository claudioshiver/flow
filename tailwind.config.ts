import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          light: '#A4B4EC',
          DEFAULT: '#647AE8',
          dark: '#172868',
        },
        error: {
          light: '#FB9689',
          DEFAULT: '#D7322A',
          dark: '#6C1915',
        },
        warning: {
          light: '#EFD583',
          DEFAULT: '#FFC107',
          dark: '#8D6B04',
        },
        success: {
          light: '#7FD698',
          DEFAULT: '#128555',
          dark: '#073522',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
