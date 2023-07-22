"use client";

import React from "react";
// import "@styles/globals.css";
import axios from "axios";
import Editor from "@src/components/Editor";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const EditPost = () => {
	const [post_title, setTitle] = useState("");
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
		const title = post_title;
		const content = text;
		const cats: string[] = [];
		const authorID = session?.user?.id;
		const result = await axios.post("/api/post", { title, content, cats, authorID });
		router.push(`/post/${result.data.id}`);
	};


	return (
		<div className="w-full h-full -z-50">
			<textarea className="w-1/2 h-12 max-h-72 p-2 border-2 border-gray-300 rounded-md resize-none"
				value={post_title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Title">
			</textarea>
			<Editor  type="inscription" text={text} onTextChange={setText}/>
			<form onSubmit={handleSubmit} className="flex flex-col items-center justify-center mt-4">
				<button type="submit" className="btn btn-primary">Submit</button>
			</form>
		</div>
	);
};

export default EditPost;
