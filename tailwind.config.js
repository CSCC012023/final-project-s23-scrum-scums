import { fontFamily as _fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export const content = [
	"./components/**/*.{js,ts,jsx,tsx,mdx}",
	"./src/**/*.{js,ts,jsx,tsx,mdx}"
];
export const theme = {
	extend: {
		fontFamily: {
			serif: ["var(--font-warnock-pro)", ..._fontFamily.serif],
			sans: ["var(--font-nunito-sans)", ..._fontFamily.sans]
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
	themes: [
		"fantasy",
		{
			dark: {
				...require("daisyui/src/theming/themes")["[data-theme=dark]"],
				primary: "hsl(210, 80%, 65%)",
				"primary-focus": "hsl(215, 100%, 75%)"
			}
		}
	],
	darkTheme: "dark"
};
