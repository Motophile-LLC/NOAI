/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "var(--bg-primary)",
          alt: "var(--bg-secondary)",
        },
        surface: {
          DEFAULT: "var(--surface-base)",
          hover: "var(--surface-hover)",
          border: "var(--surface-border)",
          borderHover: "var(--surface-border-hover)",
        },
        noai: {
          cyan: "#38bdf8",
          purple: "#a855f7",
          violet: "#6366f1",
          pink: "#ec4899",
        }
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #38bdf8 0%, #a855f7 50%, #ec4899 100%)',
        'gradient-surface': 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'glow-sm': '0 0 20px -5px rgba(168, 85, 247, 0.15)',
        'glow-md': '0 0 35px -5px rgba(168, 85, 247, 0.25)',
      }
    },
  },
  plugins: [],
}
