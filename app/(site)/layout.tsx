import "@styles/globals.css";
import { Nunito_Sans } from "next/font/google";
import localFont from "next/font/local";
import Provider from "@/components/Provider";

const nunitoSans = Nunito_Sans({
	subsets: ["latin-ext"],
	display: "swap",
	variable: "--font-nunito-sans",
});

const warnockPro = localFont({
	src: [
		{
			path: "../../public/warnock-pro/WarnockPro-Light.otf",
			weight: "300",
			style: "normal",
		},
		{
			path: "../../public/warnock-pro/WarnockPro-LightIt.otf",
			weight: "300",
			style: "italic",
		},
		{
			path: "../../public/warnock-pro/WarnockPro-Regular.otf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../public/warnock-pro/WarnockPro-Semibold.otf",
			weight: "600",
			style: "normal",
		},
		{
			path: "../../public/warnock-pro/WarnockPro-SemiboldIt.otf",
			weight: "600",
			style: "italic",
		},
		{
			path: "../../public/warnock-pro/WarnockPro-Bold.otf",
			weight: "700",
			style: "normal",
		}
	],
	variable: "--font-warnock-pro",
});

import Navbar from "@components/Navbar";
import React from "react";

export const metadata = {
	title: "Obelisk",
	description: "Examine the Obelisk"
};


const RootLayout = ({children}: { children: React.ReactNode }) => {
	return (
		<html lang="en" data-theme="fantasy" className={`${nunitoSans.variable} ${warnockPro.variable}`}>
			<Provider>
				<body className="bg-base-100">
					<Navbar />
					<main className="w-full h-full">
						{children}
					</main>
				</body>
			</Provider>
		</html>
	);
};

export default RootLayout;