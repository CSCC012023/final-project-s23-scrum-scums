"use client";

import Comment from "@components/Comment";
import { CommentProps } from "@components/Comment";
import { InscriptionProps } from "@components/InscriptionCard";
import React, { useState, useEffect } from "react";
import axios from "axios";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

const Post = ({ params }: { params: { id: string } }) => {
	const [post, setPost] = useState<InscriptionProps | null>(null);
	const [comments, setComment] = useState<CommentProps[]>([]);
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(true);
	const id = params.id;
	// Find a better way to get dynamic route ids
	const fetchPost = async () => {
		try {
			const { data } =  await axios.get(`/api/inscribe/${id}`);
			data.createdAt = new Date(data.createdAt);
			setPost(data);
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
	};
	const fetchComment = async () => {
		try {
			const { data } =  await axios.get(`/api/comment/${id}`);
			setComment(data);

		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchPost();
		fetchComment();
	}, []);



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
		console.log("submitting", content, id);
		await axios.post("/api/comment", { content, id });
		setContent("");
		fetchComment();
	};

	return (
		<div className="h-full w-full">
			{loading ? <h1 className="font-bold text-center">loading...</h1> :
				<div className="flex flex-col items-center justify-center">
					<figure className="w-full object-cover flex-col flex justify-center" ><img src="https://picsum.photos/1000/460" alt="post image" /></figure>
					<section className="content w-3/5 pt-4">
						<p className="text-neutral-400 text-left text-sm">{post?.createdAt?.toLocaleDateString()}</p>
						<div className="prose">
							<ReactMarkdown remarkPlugins={[remarkGfm]} children={post.content}/>
						</div>
						<p className="text-right italic mr-4">By {post?.author.username}</p>
					</section>
					<div className="divider"></div>
					<section className="comment-box w-3/5">
						<form onSubmit={handleSubmit} className="flex flex-col w-full">
							<textarea
								className="textarea textarea-secondary py-4 w-full"
								name="comment"
								autoComplete="off"
								value={content}
								onChange={(e) => setContent(e.target.value)}
								required
							/>
							<button type="submit" className="btn btn-primary mt-2">Submit Comment</button>
						</form>
						<div>
							{commentEls}
						</div>
					</section>
				</div>
			}
		</div>
	);
};

export default Post;