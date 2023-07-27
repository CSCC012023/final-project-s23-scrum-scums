"use client";

import axios from "axios";
import { FC, useState, useEffect } from "react";
import React from "react";
import MarkdownRenderer from "@src/components/MarkdownRenderer";
import Tag from "@src/components/Tag";
import LikeButton from "@src/components/Buttons/LikeButton";
import { PostData } from "@src/types";
import { useSession } from "next-auth/react";
import { Separator } from "@src/components/ui/Separator";
import { formatTimeToNow } from "@src/lib/utils";
import UserAvatar from "./UserAvatar";
import UserCard from "./UserCard";
import CommentButton from "./Buttons/CommentButton";
import { Share2Icon } from "@radix-ui/react-icons";

interface PostSectionProps {
	id: number;
}

async function fetchPost(id: number): Promise<PostData> {
	try {
		const res = await axios.get(`/api/post/${id}`);
		res.data.createdAt = new Date(res.data.createdAt);
		return res.data;
	} catch (err) {
		console.log("error fetching post", err);
		throw new Error("Error fetching post");
	}
}

const PostSection: FC<PostSectionProps> = async ({ id }) => {
	const { data: session } = useSession();
	const [post, setPost] = useState<PostData | null>(null);
	useEffect(() => {
		fetchPost(id).then(post => {
			setPost(post);
		});
	}, []);
	return (
		<section className="content w-full pt-4 flex flex-col items-center">
			<div className="prose w-3/5">
				<h1 className="mb-0 tracking-tight font-serif">
					{post?.title}
				</h1>

				<div className="flex flex-row items-center w-full">
					{post && (
						<span className="text-muted-foreground text-sm w-full justify-self-start flex flex-row items-center space-x-2">
							<UserAvatar
								user={post?.author}
								className="h-5 w-5"
							/>
							<UserCard user={post?.author} />{" "}
						</span>
					)}
					<span className="text-muted-foreground text-sm w-full justify-self-end h-full text-end">
						{post && formatTimeToNow(post.createdAt)}
					</span>
				</div>
				<Separator />
				<MarkdownRenderer content={post?.content} />
				{post?.categories.map(category => (
					<Tag key={category.id} name={category.name} />
				))}
				<div className="flex flex-row justify-evenly items-center mt-2 text-xs text-center w-full">
					{post && (
						<>
							<CommentButton
								label={post._count.comments.toString()}
							/>
							<Separator orientation="vertical" />
							<LikeButton
								label={post.likes.length}
								postId={id}
								kind="post"
								isLiked={post.likes.some(
									like => like.userId === session?.user?.id
								)}
								disabled={!session}
								userId={session?.user?.id}
								className="justify-self-start"
							/>
							<Separator orientation="vertical" />
							<Share2Icon className="h-5 w-5" />
						</>
					)}
				</div>
			</div>
		</section>
	);
};

export default PostSection;
