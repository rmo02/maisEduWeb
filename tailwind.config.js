/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        azul_mais_escuro: {
          DEFAULT: "hsl(236, 100%, 27%)",
          foreground: "hsl(236, 100%, 27%)",
        },
        azul_azul_select: {
          DEFAULT: "hsl(225, 89%, 93%)",
          foreground: "hsl(225, 89%, 93%)",
        },
        azul_escuro: {
          DEFAULT: "hsl(236, 100%, 39%)",
          foreground: "hsl(236, 100%, 39%)",
        },
        azul: {
          DEFAULT: "hsl(236, 100%, 49%)",
          foreground: "hsl(236, 100%, 49%)",
        },
        azul_mais_claro: {
          DEFAULT: "hsl(236, 100%, 57%)",
          foreground: "hsl(236, 100%, 57%)",
        },
        azul_claro: {
          DEFAULT: "hsl(236, 100%, 63%)",
          foreground: "hsl(236, 100%, 63%)",
        },
        azul_celeste: {
          DEFAULT: "hsl(226, 79%, 53%)",
          foreground: "hsl(226, 79%, 53%)",
        },
        azul_mais_claro_2: {
          DEFAULT: "hsl(226, 51%, 68%)",
          foreground: "hsl(226, 51%, 68%)",
        },
        azul_claro_2: {
          DEFAULT: "hsl(226, 67%, 76%)",
          foreground: "hsl(226, 67%, 76%)",
        },
        azul_muito_claro: {
          DEFAULT: "hsl(226, 33%, 90%)",
          foreground: "hsl(226, 33%, 90%)",
        },
        azul_muito_muito_claro: {
          DEFAULT: "hsl(226, 47%, 97%)",
          foreground: "hsl(226, 47%, 97%)",
        },
        azul_verde: {
          DEFAULT: "hsl(180, 100%, 36%)",
          foreground: "hsl(180, 100%, 36%)",
        },
        amarelo: {
          DEFAULT: "hsl(51, 84%, 57%)",
          foreground: "hsl(51, 84%, 57%)",
        },
        cinza_escuro: {
          DEFAULT: "hsl(210, 15%, 25%)",
          foreground: "hsl(210, 15%, 25%)",
        },
        azul_muito_muito_claro_2: {
          DEFAULT: "hsl(216, 100%, 97%)",
          foreground: "hsl(216, 100%, 97%)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: 'Quicksand, sans-serif'
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
