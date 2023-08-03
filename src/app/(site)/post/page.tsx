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
	const [post_title, setTitle] = useState("");
	const [text, setText] = useState("Start writing here...");
	const router = useRouter();
	const { data: session } = useSession();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const title = post_title;
		const content = text;
		const cats: string[] = [];
		const authorId = session?.user.id;
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
			<textarea
				className="w-1/2 h-12 max-h-72 p-2 border-2 border-gray-300 rounded-md resize-none"
				value={post_title}
				onChange={e => setTitle(e.target.value)}
				placeholder="Title"
			></textarea>
			<Editor type="post" text={text} onTextChange={setText} />
			<CategoryInput disabled={session ? false : true} />
			<form
				onSubmit={handleSubmit}
				className="flex flex-col items-center justify-center mt-4"
			>
				<Button type="submit">Submit</Button>
			</form>
		</div>
	);
};

export default EditPost;

/*
client component submit post
[ title ]

<child> as prop

[ tags]
[ button ]


page:
<SubmitPost>
	<Editor>
</SubmitPost>


*/
