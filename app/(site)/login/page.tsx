"use client";

import React from "react";
// import "@styles/globals.css";
import axios from "axios";
import { useState } from "react";
import { GithubSignInButton, GoogleSignInButton } from "@components/LoginSSOButtons";
import RegisterModal from "@components/Modals/RegisterModal";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("submitting", username, password, email);
		const { data } = await axios.post("/api/signup", { username, password, email });
		setUsername("");
		setPassword("");
		setEmail("");
	};



	return (
		<div>
			login
		</div>
	);

	// return (
	// 	<div>
	// 		<p className="text-2xl font-bold flex flex-col items-center">Sign In</p>
	// 		<div className="flex flex-col items-center justify-center">
	// 			<div className="flex flex-col items-center space-y-4 pb-4 pt-8 max-w-md mx-auto">
	// 				<GoogleSignInButton />
	// 				<GithubSignInButton />
	// 			</div>
	// 		</div>

	// 		{/* credits: https://stackoverflow.com/a/70203834 */}
	// 		<div className="relative py-4">
	// 			<div className="absolute inset-0 flex items-center">
	// 				<div className="w-full border-b border-gray-300"></div>
	// 			</div>
	// 			<div className="relative flex justify-center">
	// 				<span className="bg-white px-4 text-sm text-gray-500">Or</span>
	// 			</div>
	// 		</div>

	// 		<form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
	// 			<label className="text-lg text-left px-2">Username</label>
	// 			<input
	// 				className="border-2 border-black rounded-lg"
	// 				type="text"
	// 				name="username"
	// 				value={username}
	// 				onChange={(e) => setUsername(e.target.value)}
	// 				required
	// 			/>
	// 			<label className="text-lg text-left px-2">E-mail</label>
	// 			<input
	// 				className="border-2 border-black rounded-lg"
	// 				type="text"
	// 				name="email"
	// 				value={email}
	// 				onChange={(e) => setEmail(e.target.value)}
	// 				required
	// 			/>
	// 			<label className="text-lg text-left px-2">Password</label>
	// 			<input
	// 				className="border-2 border-black rounded-lg"
	// 				type="password"
	// 				name="password"
	// 				value={password}
	// 				onChange={(e) => setPassword(e.target.value)}
	// 				required
	// 			/>
	// 			<button type="submit" className="border-2 border-black rounded-lg">Submit</button>
	// 		</form>
	// 	</div>
	// );
};

export default Signup;