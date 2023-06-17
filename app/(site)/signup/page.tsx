"use client";

import React from "react";
import Link from "next/link";
// import "@styles/globals.css";
// import { EmailProvider } from "next-auth/providers/email";
import axios from "axios";
import { useState } from "react";

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
			<p className="text-2xl mb-2 font-bold flex flex-col items-center">Sign Up</p>
			<form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
				<label className="text-lg text-left px-2">Username</label>
				<input
					className="border-2 border-black rounded-lg"
					type="text"
					name="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
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
				<button type="submit" className="flex mt-3 p-1 border-2 border-black rounded-lg " >Sign up</button>
				<p><br></br>Got an account? </p>
				<Link href="/login" className="underline">
					Login
				</Link>
			</form>
		</div>
	);
};

export default Signup;