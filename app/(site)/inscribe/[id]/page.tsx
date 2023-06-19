"use client";

import Comment from "@components/Comment";
import { CommentProps } from "@components/Comment";
import Inscription from "@components/Inscription";
import { InscriptionProps } from "@components/Inscription";
import React, { useState, useEffect } from "react";
import {usePathname } from "next/navigation";
import axios from "axios";

const Comments = () => {
	const [posts, setPost] = useState<InscriptionProps[]>([]);
	const [comments, setComment] = useState<CommentProps[]>([]);
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(true);
	// Find a better way to get dynamic route ids
	const inscribeId = usePathname().replace("/inscribe/", "");
	const fetchPost = async () => {
		try {
			const { data } =  await axios.get(`/api/getinscribe/${inscribeId}`);
			setPost(data);
		} catch (err) {
			console.log(err);
		}
	};
	const fetchComment = async () => {
		try {
			const { data } =  await axios.get(`/api/commentsection/${inscribeId}`);
			setComment(data);
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchPost();
		fetchComment();
	}, []);

	const postEls = posts.map((post) => (
		<Inscription
			key={post.id}
			id={post.id}
			title={post.title}
			content={post.content}
			authorId={post.authorId}
			author={post.author}
			createdAt={post.createdAt}
		/>
	));

	const commentEls = comments.map((comment) => (
		<Comment
			key={comment.id}
			id={comment.id}
			content={comment.content}
			author={comment.author}
			createdAt={comment.createdAt}
		/>
	));

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("submitting", content, inscribeId);
		await axios.post("/api/comment", { content, inscribeId });
		setContent("");
		fetchComment();
	};

	return (
		<div className="h-full w-full">
			{loading ? <h1>loading...</h1> :
				<div>
					<div className="prose">
						{postEls}
					</div>
					<form onSubmit={handleSubmit} className="flex flex-col">
						<textarea
							className="border-2 border-black"
							name="comment"
							autoComplete="off"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							required
						/>
						<button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/6">Submit</button>
					</form>
					<div>
						{commentEls}
					</div>
				</div>
			}
		</div>
	);
};

export default Comments;