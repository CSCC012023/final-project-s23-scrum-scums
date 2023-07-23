"use client";

import Comment from "@src/components/Comment";
import { CommentProps } from "@src/components/Comment";
import { PostProps } from "@src/types";
import LikeButton from "@src/components/Buttons/LikeButton";

import React, { useState, useEffect } from "react";
import axios from "axios";
import remarkGfm from "remark-gfm";
import { useSession } from "next-auth/react";
import ReactMarkdown from "react-markdown";
import Tag from "@src/components/Tag";

const Post = ({ params }: { params: { id: string } }) => {
	const [post, setPost] = useState<PostProps | null>(null);
	const [comments, setComment] = useState<CommentProps[]>([]);
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(true);
	const id = parseInt(params.id);

	const { data: session } = useSession();


	const fetchPost = async () => {
		try {
			const { data } =  await axios.get(`/api/post/${id}`);
			data.createdAt = new Date(data.createdAt);
			setPost(data);
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
	};
	// todo: return comments directly from post and do one api request
	const fetchComment = async () => {
		try {
			const { data } =  await axios.get(`/api/comment/${id}`);
			const dateFixed = data.map((comment: CommentProps) => {
				comment.createdAt = new Date(comment.createdAt);
				return comment;
			});
			setComment(dateFixed);

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
					{/* <figure className="w-full object-cover flex-col flex justify-center" ><img src="https://picsum.photos/1000/460" alt="post image" /></figure> */}
					<section className="content w-2/3 pt-4 flex flex-col items-center">
						<div className="prose">
							<p className="text-neutral-400 text-sm w-full">{post?.createdAt?.toLocaleDateString()}</p>
							<ReactMarkdown remarkPlugins={[remarkGfm]}>
								{"## " + post?.title + "\n\n" + post?.content}
							</ReactMarkdown>
							<p className="text-right italic mr-4">By {post?.author.username}</p>
							{ post && 
							<LikeButton
								label={post.likes.length}
								type="post"
								id={id}
								isLiked={post.likes.some((like) => like.userId === session?.user?.id)}
								disabled={!session}
								userId={session?.user?.id}
							/>
							}
						</div>
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