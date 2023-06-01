"use client";

import React from "react";
// import "@styles/globals.css";
import axios from "axios";
import { useState } from "react";

const Inscribe = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("submitting", username, password, email);
		const { data } = await axios.post("/api/inscribe", { username, password, email });
		setUsername("");
		setPassword("");
		setEmail("");
	};

	return (
		<div>
			<form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
				<label className="text-3xl font-bold text-left px-2">Username</label>
				<input
					className="border-2 border-black rounded-lg"
					type="text"
					name="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<label className="text-3xl font-bold text-left px-2">E-mail</label>
				<input
					className="border-2 border-black rounded-lg"
					type="text"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<label className="text-3xl font-bold text-left px-2">Password</label>
				<input
					className="border-2 border-black rounded-lg"
					type="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button type="submit" className="border-2 border-black rounded-lg" >Submit</button>
			</form>
		</div>
	);
};

export default Inscribe;