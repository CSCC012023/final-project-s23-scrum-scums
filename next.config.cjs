/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		protocol:"https",
		hostname: "avatars.githubusercontent.com",
		port: "",
		pathname: "**",
	},
};

module.exports = nextConfig;
