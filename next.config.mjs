/** @type {import('next').NextConfig} */

import removeImports from "next-remove-imports";
/** @type {function(import("next").NextConfig): import("next").NextConfig}} */
const removeImportsFun = removeImports({
	// test: /node_modules([\s\S]*?)\.(tsx|ts|js|mjs|jsx)$/,
	// matchImports: "\\.(less|css|scss|sass|styl)$"
});

export default {
	// webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
	images: {
		domains: [
			"res.cloudinary.com",
			"avatars.githubusercontent.com",
			"lh3.googleusercontent.com",
			"utfs.io"
		]
	},
	reactStrictMode: true
};
