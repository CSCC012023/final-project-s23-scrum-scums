"use client";

import CommentSection from "@src/components/CommentSection";
import { PostData } from "@src/types";
import LikeButton from "@src/components/Buttons/LikeButton";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Tag from "@src/components/Tag";
import MarkdownRenderer from "@src/components/MarkdownRenderer";

const Post = ({ params }: { params: { id: string } }) => {
	const [post, setPost] = useState<PostData | null>(null);
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

	useEffect(() => {
		fetchPost();
	}, []);



	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("submitting", content, id);
		await axios.post("/api/comment", { content, id });
		setContent("");
	};

	return (
		<div className="h-full w-full">
			{loading ? <h1 className="font-bold text-center">loading...</h1> :
				<div className="flex flex-col items-center justify-center">
					{/* <figure className="w-full object-cover flex-col flex justify-center" ><img src="https://picsum.photos/1000/460" alt="post image" /></figure> */}
					<section className="content w-2/3 pt-4 flex flex-col items-center">
						<div className="prose">
							<h1 className="mb-0 tracking-tight font-serif">{post?.title}</h1>
							<p className="text-muted-foreground mt-0 text-sm w-full">{post?.createdAt?.toLocaleDateString()}</p>
							<MarkdownRenderer
								content={post?.content}
							/>
							{
								post?.categories.map((category) => (
									<Tag
										key={category.id}
										name={category.name}
									/>
								))
							}
							<p className="text-right italic mr-4">By {post?.author.username}</p>
							{ post &&
							<LikeButton
								label={post.likes.length}
								postId={id}
								kind="post"
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
						<div
							className="flex flex-col items-center w-full
							p-6 bg-secondary rounded-md my-4
							"
						>
							<CommentSection
								postId={id}
								session={session}
							/>
						</div>
					</section>
				</div>
			}
		</div>
	);
};

export default Post;