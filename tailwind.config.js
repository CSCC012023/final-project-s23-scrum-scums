/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		extend: {
			fontFamily: {
				robotoslab: ["Roboto Slab", "sans-serif"],
				inter: ["Inter", "sans-serif"]
			},

			colors: {
				primary: "#D6DBDC",
				secondary: "#e1ddcf",

			},

			transitionProperty: {
				'height': 'height',
				'width': 'width',
			}
		}
	},
	plugins: [
		require("@tailwindcss/typography"),
	]
};
