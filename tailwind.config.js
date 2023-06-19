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
			sans: [
				"var(--font-nunito-sans)",
				..._fontFamily.sans
			],
			robotoslab: ["Roboto Slab", "sans-serif"]
		},
		transitionProperty: {
			height: "height",
			width: "width"
		}
	}
};
export const plugins = [require("@tailwindcss/typography"), require("daisyui")];
export const daisyui = {
	themes: ["fantasy", "night"]
};
