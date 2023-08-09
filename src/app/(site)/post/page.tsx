"use client";

import React from "react";
import axios from "axios";
import Editor from "@src/components/Editor";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import TitleInput from "@src/components/Inputs/TitleInput";
import CategoryInput from "@src/components/Inputs/CategoryInput";
import { Button } from "@src/components/ui/Button";

const EditPost = () => {
	const [postTitle, setTitle] = useState("");
	const [text, setText] = useState("Start writing here...");
	const [categories, setCategories] = useState<string[]>([]);
	const router = useRouter();
	const { data: session } = useSession();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const title = postTitle;
		const content = text;
		const cats = categories;
		console.log("session", session);
		const authorId = session?.user.id;
		console.log(title, content, cats, authorId);
		const result = await axios.post("/api/post", {
			title,
			content,
			cats,
			authorId
		});
		router.push(`/post/${result.data.id}`);
	};

	return (
		<div className="w-full h-full -z-50">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col items-center justify-center mt-4 w-full h-full"
			>
				<TitleInput
					label="Title"
					required
					onChange={e => setTitle(e.target.value)}
					value={postTitle}
					className="w-full mb-2 h-fit"
				/>
				<Editor
					type="post"
					text={text}
					onTextChange={setText}
					className="w-full h-4/5"
				/>
				<CategoryInput
					setCats={(cats: string[]) => setCategories(cats)}
				/>
				<Button type="submit" className="mt-2">
					Submit
				</Button>
			</form>
		</div>
	);
};

export default EditPost;
