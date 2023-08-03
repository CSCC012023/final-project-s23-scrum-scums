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
import UserAvatar from "./UserAvatar";
import UserCard from "./UserCard";
import CommentButton from "./Buttons/CommentButton";
import { Share2Icon } from "@radix-ui/react-icons";
import FollowButton from "./Buttons/FollowButton";
import { useToast } from "@src/hooks/use-toast";

interface PostSectionProps {
	id: number;
}

async function fetchPost(id: number): Promise<PostData> {
	const res = await axios.get(`/api/post/${id}`);
	res.data.createdAt = new Date(res.data.createdAt);
	return res.data;
}

const PostSection: FC<PostSectionProps> = async ({ id }) => {
	const [post, setPost] = useState<PostData | null>(null);
	const { toast } = useToast();
	const { data: session, update } = useSession();

	useEffect(() => {
		fetchPost(id)
			.then(post => {
				setPost(post);
			})
			.catch(err => {
				console.log("error fetching post", err);
				toast({
					title: "Failed to get post",
					description: "Please try again later",
					variant: "destructive"
				});
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
							<UserCard user={post?.author} update={update} />
							<FollowButton
								userToFollowId={post?.author.id}
								disabled={!session}
								update={update}
							/>
						</span>
					)}
					<span className="text-muted-foreground text-sm w-full justify-self-end h-full text-end">
						{post?.createdAt.toLocaleDateString(undefined, {
							month: "long",
							day: "numeric",
							year: "numeric"
						})}
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
								update={update}
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
