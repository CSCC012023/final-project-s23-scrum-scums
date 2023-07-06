import { fontFamily as _fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export const content = [
	"./pages/**/*.{js,ts,jsx,tsx,mdx}",
	"./components/**/*.{js,ts,jsx,tsx,mdx}",
	"./app/**/*.{js,ts,jsx,tsx,mdx}"
];
export const theme = {
	extend: {
		fontFamily: {
			serif: [
				"var(--font-warnock-pro)",
				..._fontFamily.serif
			],
			sans: [
				"var(--font-nunito-sans)",
				..._fontFamily.sans
			],
		},
		transitionProperty: {
			height: "height",
			width: "width"
		},
		keyframes: {
			"slide-up": {
				"0%": {
					transform: "translateY(100%)"
				},
				"100%": {
					transform: "translateY(0)"
				}
			}
		}
	}
};
export const plugins = [require("@tailwindcss/typography"), require("daisyui")];
export const daisyui = {
	themes: ["fantasy", "dark"],
	// darkTheme: "forest"
};
