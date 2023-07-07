/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")();
module.exports = removeImports({});
const nextConfig = {
	images: {
		protocol:"https",
		hostname: "avatars.githubusercontent.com",
		port: "",
		pathname: "**",
	},
};

module.exports = nextConfig;
