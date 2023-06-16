"use client";

import React from "react";
import Link from "next/link";
// import "@styles/globals.css";
import axios from "axios";
import { useState } from "react";
import { GithubSignInButton, GoogleSignInButton } from "@components/signin";
// import { data } from "autoprefixer";

const Login = () => {
	// const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("submitting", email, password);
		try {
			const { data } =  await axios.get("/api/login", {
				params: {
					email: email,
					password: password
				}
			});
			// console.log(data);
			if (data == null) {
				console.log("User not found");
			}
			else {
				if (data.password != password) {
					console.log("wrong password");
				}
				else {
					console.log("signed in");
				}
			}
			setEmail("");
			setPassword("");
		} catch (err) {
			console.log(err);
		}
	};

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
			<form onSubmit={handleLogin} className="flex flex-col items-center justify-center">
				<label className="text-lg text-left px-2">Email</label>
				<input
					className="border-2 border-black rounded-lg"
					type="text"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<label className="text-lg text-left px-2">Password</label>
				<input
					className="border-2 border-black rounded-lg"
					type="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button type="submit" className="flex mt-3 p-1 border-2 border-black rounded-lg " >Login</button>
				<p><br></br>Don&apos;t have an account? </p>
				<Link href="/signup" className="underline">
					Sign up
				</Link>
			</form>
		</div>
	);
};

export default Login;