import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      curent: "currentColor",
      black: colors.black,
      white: colors.white,
      slate: colors.slate,
      yellow: colors.yellow,
      blue: colors.blue,
    },
    extend: {},
  },
  plugins: [],
};
export default config;
