"use client";

import React from "react";
// import "@styles/globals.css";
import axios from "axios";
import { useState } from "react";

const Inscribe = () => {
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("tweeting");
		await axios.post("/api/inscribe");
	};

	return (
		<div>
			<form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
				<button type="submit" className="border-2 border-black rounded-lg">Submit</button>
			</form>
		</div>
	);
};

export default Inscribe;
