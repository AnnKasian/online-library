/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx,ts,tsx}', './*.css', './*.html'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        // card: {
        //   DEFAULT: 'hsl(var(--card))',
        //   foreground: 'hsl(var(--card-foreground))',
        // },
        // popover: {
        //   DEFAULT: 'hsl(var(--popover))',
        //   foreground: 'hsl(var(--popover-foreground))',
        // },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          hover: 'hsl(var(--accent-hover))',
        },
        // destructive: {
        //   DEFAULT: 'hsl(var(--destructive))',
        //   foreground: 'hsl(var(--destructive-foreground))', /*red or smth*/
        // },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        // ring: 'hsl(var(--ring))',
        // chart: {
        //   '1': 'hsl(var(--chart-1))',
        //   '2': 'hsl(var(--chart-2))',
        //   '3': 'hsl(var(--chart-3))',
        //   '4': 'hsl(var(--chart-4))',
        //   '5': 'hsl(var(--chart-5))',
        // },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
