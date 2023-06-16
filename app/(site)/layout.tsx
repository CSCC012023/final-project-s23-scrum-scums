import "@styles/globals.css";
import Navbar from "@components/Navbar";
import React from "react";

export const metadata = {
	title: "Obelisk",
	description: "Scale the Obelisk"
};


const RootLayout = ({children}: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<body>
				<Navbar />
				<main className="flex min-h-screen flex-col items-center justify-between px-24 py-6 app">
					{children}
				</main>
			</body>
		</html>
	);
};

export default RootLayout;