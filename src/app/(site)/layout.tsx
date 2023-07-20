import "@styles/globals.css";
import { Nunito_Sans } from "next/font/google";
import localFont from "next/font/local";
import React from "react";

import AuthProvider from "@src/Providers/AuthProvider";
import ToasterProvider from "@src/Providers/ToasterProvider";
import RegisterModal from "@src/components/Modals/RegisterModal";
import LoginModal from "@src/components/Modals/LoginModal";
import Navbar from "@src/components/Navbar";


const nunitoSans = Nunito_Sans({
	subsets: ["latin-ext"],
	display: "swap",
	variable: "--font-nunito-sans",
});

const warnockPro = localFont({
	src: [
		{
			path: "../../../public/warnock-pro/WarnockPro-Light.otf",
			weight: "300",
			style: "normal",
		},
		{
			path: "../../../public/warnock-pro/WarnockPro-LightIt.otf",
			weight: "300",
			style: "italic",
		},
		{
			path: "../../../public/warnock-pro/WarnockPro-Regular.otf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../../public/warnock-pro/WarnockPro-Semibold.otf",
			weight: "600",
			style: "normal",
		},
		{
			path: "../../../public/warnock-pro/WarnockPro-SemiboldIt.otf",
			weight: "600",
			style: "italic",
		},
		{
			path: "../../../public/warnock-pro/WarnockPro-Bold.otf",
			weight: "700",
			style: "normal",
		}
	],
	variable: "--font-warnock-pro",
});


export const metadata = {
	title: "Obelisk",
	description: "Get on the internet's pulse"
};


const RootLayout = ({children}: { children: React.ReactNode }) => {
	return (
		<AuthProvider>
			<html lang="en" className={`${nunitoSans.variable} ${warnockPro.variable}`}>
				<body className="bg-base-100 min-h-screen antialiased">
					<Navbar />
					<main className="w-full h-full" id="main">
						<ToasterProvider/>
						<RegisterModal/>
						<LoginModal/>
						{children}
					</main>
				</body>
			</html>
		</AuthProvider>
	);
};

export default RootLayout;