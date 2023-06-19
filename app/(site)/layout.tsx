import "@styles/globals.css";
import { Nunito_Sans } from "next/font/google"

const nunitoSans = Nunito_Sans({
	subsets: ["latin-ext"],
	display: "swap",
	variable: "--font-nunito-sans",
});

import Navbar from "@components/Navbar";
import React from "react";

export const metadata = {
	title: "Obelisk",
	description: "Examine the Obelisk"
};


const RootLayout = ({children}: { children: React.ReactNode }) => {
	return (
		<html lang="en" data-theme="fantasy" className={`${nunitoSans.variable}`}>
			<body>
				<Navbar />
				<main className="flex min-h-screen flex-col items-center justify-between px-24 py-6 font-sans">
					{children}
				</main>
			</body>
		</html>
	);
};

export default RootLayout;