"use client";

import React from "react";
import Link from "next/link";
// import "@styles/globals.css";
import axios from "axios";
import { useState } from "react";
import { GithubSignInButton, GoogleSignInButton } from "@components/signin";
import { CredentialsForm } from "./credentialsForm";
// import { data } from "autoprefixer";

const Login = () => {
	// const [username, setUsername] = useState("");
	// const [password, setPassword] = useState("");
	// const [email, setEmail] = useState("");

	// const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();
	// 	console.log("submitting", email, password);
	// 	try {
			
	// 		setEmail("");
	// 		setPassword("");
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	return (
		<div>
			<p className="text-2xl font-bold flex flex-col items-center">Login</p>
			<div className="flex flex-col space-y-4 pb-4 pt-8">
				<GoogleSignInButton />
				<GithubSignInButton	/>
			</div>

			{/* credits: https://stackoverflow.com/a/70203834 */}
			<div className="relative py-4">
				<div className="absolute inset-0 flex items-center">
					<div className="w-full border-b border-gray-300"></div>
				</div>
				<div className="relative flex justify-center">
					<span className="bg-white px-4 text-sm text-gray-500">Or</span>
				</div>
			</div>
			<CredentialsForm />
		</div>
	);
};

export default Login;