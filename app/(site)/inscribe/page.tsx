"use client";

import React from "react";
// import "@styles/globals.css";
import axios from "axios";
import Editor from "@components/Editor";
import { useState } from "react";

const Inscribe = () => {

	const [text, setText] = useState("Start writing here...");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("posting");
		const title = text.includes("\n") ? text.split("\n")[0] : text;
		const content = text;
		const authorId = "46e1ce09-78e7-4d1b-ba49-8479de96ea76";
		await axios.post("/api/inscribe", { title, content, authorId });
		setText("Start writing here...");
	};


	return (
		<div className="w-full h-full ">
			<Editor type="inscription" text={text} onTextChange={setText}/>
			<form onSubmit={handleSubmit} className="flex flex-col items-center justify-center mt-4">
				<button type="submit" className="border-2 border-black rounded-lg p-2 bg-green-300 font-robotoslab">Submit</button>
			</form>
		</div>
	);
};

export default Inscribe;
