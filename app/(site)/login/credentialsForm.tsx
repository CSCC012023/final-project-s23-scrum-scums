"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import React from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import axios from "axios";

interface CredentialsFormProps {
    csrfToken?: string;
}

export function CredentialsForm(props: CredentialsFormProps) {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
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
			console.log(data);
			if (data) {
				console.log("signed in");
				router.push("/feed");
			}
		} catch (err) {
			console.log(err);
			setError("Incorrect email or password");
		}
		setEmail("");
		setPassword("");
        
		// const data = {email: email, password: password};
		// console.log(data);
        
		// const signInRes = await signIn("credentials", {
		// 	email: data["email"],
		// 	password: data["password"],
		// 	redirect: false,
		// });
        
		// if (signInRes && !signInRes.error) {
		// 	router.push("/feed");
		// } else {
		// 	console.log("Error: ", signInRes);
		// 	setError("Incorrect email or password");
		// }
        
	};

	return (
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
			{error && (
				<span className="m-2 text-lg px-2 text-red">
					{error}
				</span>
			)}
			<button type="submit" className="flex mt-3 p-1 border-2 border-black rounded-lg " >Login</button>
			<p><br></br>Don&apos;t have an account? </p>
			<Link href="/signup" className="underline">
					Sign up
			</Link>
		</form>
	);
}