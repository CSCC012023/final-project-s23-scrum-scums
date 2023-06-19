"use client";

import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

export function GoogleSignInButton() {
	const handleClick = () => {
		signIn("google", { callbackUrl: "/feed" });
	};

	return (
		<button
			onClick={handleClick}
			className="flex items-center bg-white hover:bg-gray-100 text-black py-2 px-4 border border-gray-300 rounded-md text-lg">
			<Image src="/assets/icons/google-logo.png" height="30" width="30" alt="Google Icon" className="mr-3" />
			Continue with Google
		</button>
	);
}

export function GithubSignInButton() {
	const handleClick = () => {
		signIn("github", { callbackUrl: "/feed" });
	};

	return (
		<button
			onClick={handleClick}
			className="flex items-center bg-white hover:bg-gray-100 text-black py-2 px-4 border border-gray-300 rounded-md text-lg">
			<Image src="/assets/icons/github-mark.png" height="30" width="30" alt="Github Icon" className="mr-3"/>
			Continue with Github
		</button>
	);
}