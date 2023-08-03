import "@styles/globals.css";
import { Nunito_Sans } from "next/font/google";
import localFont from "next/font/local";
import React from "react";

import AuthProvider from "@src/Providers/AuthProvider";
import ToasterProvider from "@src/Providers/ToasterProvider";
import { Toaster } from "@src/components/ui/Toaster";
import Navbar from "@src/components/Navbar";
import { cn } from "@src/lib/utils";

const nunitoSans = Nunito_Sans({
	subsets: ["latin-ext"],
	display: "swap",
	variable: "--font-nunito-sans"
});

const warnockPro = localFont({
	src: [
		{
			path: "../../../public/warnock-pro/WarnockPro-Light.otf",
			weight: "300",
			style: "normal"
		},
		{
			path: "../../../public/warnock-pro/WarnockPro-LightIt.otf",
			weight: "300",
			style: "italic"
		},
		{
			path: "../../../public/warnock-pro/WarnockPro-Regular.otf",
			weight: "400",
			style: "normal"
		},
		{
			path: "../../../public/warnock-pro/WarnockPro-Semibold.otf",
			weight: "600",
			style: "normal"
		},
		{
			path: "../../../public/warnock-pro/WarnockPro-SemiboldIt.otf",
			weight: "600",
			style: "italic"
		},
		{
			path: "../../../public/warnock-pro/WarnockPro-Bold.otf",
			weight: "700",
			style: "normal"
		}
	],
	variable: "--font-warnock-pro"
});

export const metadata = {
	title: "Obelisk",
	description: "Get on the internet's pulse."
};

const RootLayout = ({
	children,
	authModal
}: {
	children: React.ReactNode;
	authModal: React.ReactNode;
}) => {
	return (
		<AuthProvider>
			<html
				lang="en"
				className={cn(
					"antialiased text-primary-foreground",
					nunitoSans.variable,
					warnockPro.variable
				)}
			>
				<body>
					<Navbar />
					<main className="w-full h-full mt-12" id="main">
						<ToasterProvider />
						<Toaster />
						{authModal}
						<div className="container max-w-8xl mx-auto h-full">
							{children}
						</div>
					</main>
				</body>
			</html>
		</AuthProvider>
	);
};

export default RootLayout;
