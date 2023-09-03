import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0496ff",
        secondary: "#00487c",
        tertiary: "#071E22",
        bg: "#3e6680",
        danger: "#B02E0C",
        good: "#138A36"
      }
    },
  },
  plugins: [],
}
export default config
