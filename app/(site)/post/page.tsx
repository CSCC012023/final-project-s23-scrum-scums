"use client";

import React from "react";
// import "@styles/globals.css";
import axios from "axios";
import Editor from "@components/Editor";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const EditPost = () => {

	const [text, setText] = useState("Start writing here...");
	const router = useRouter();
	const { data: session } = useSession(
		// {
		// 	required: true,
		// 	onUnauthenticated() {
		// 		redirect("/login?callbackUrl=/inscribe");
		// 	}
		// }
	);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("posting");
		// let title = text.includes("\n") ? text.split("\n")[0] : text;
		let title = text;
		if (text.includes("\n") ){
			title = text.split("\n")[0];
			while(title[0] === "#") {
				title = title.slice(1);
			}
		}
		const content = text;
		const result = await axios.post("/api/post", { title, content });
		router.push(`/post/${result.data.id}`);
	};


	return (
		<div className="w-full h-full ">
			<Editor type="inscription" text={text} onTextChange={setText}/>
			<form onSubmit={handleSubmit} className="flex flex-col items-center justify-center mt-4">
				<button type="submit" className="btn btn-primary">Submit</button>
			</form>
		</div>
	);
};

export default EditPost;
