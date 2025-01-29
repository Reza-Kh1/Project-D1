import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/theme";
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(autocomplete|badge|button|drawer|select|ripple|spinner|form|input|listbox|divider|popover|scroll-shadow|modal).js"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow:{
        "boxDetail":"0px 0px 5px #d2d2d2"
      }
    },
  },
  plugins: [nextui()],
} satisfies Config;
