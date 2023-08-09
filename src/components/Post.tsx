"use client";

import React from "react";
import MarkdownRenderer from "./MarkdownRenderer";
import Tag from "@src/components/Tag";
import Link from "next/link";
import { useRef } from "react";
import { Separator } from "@src/components/ui/Separator";
import LikeButton from "@src/components/Buttons/LikeButton";
import { Category, PostLike, User } from "@prisma/client";
import Authored from "./Authored";
import CommentButton from "./Buttons/CommentButton";
import { useSession } from "next-auth/react";
import ShareButton from "./Buttons/ShareButton";

interface PostProps {
	postId: number;
	content: string;
	title: string;
	createdAt: Date;
	author: User;
	categories: Category[];
	likes: PostLike[];
	_count: {
		comments: number;
	};
	session?: ReturnType<typeof useSession>["data"];
	update: ReturnType<typeof useSession>["update"];
	viewerId: string | undefined;
}

const Post: React.FC<PostProps> = ({
	postId,
	content,
	title,
	createdAt,
	author,
	categories,
	likes,
	_count,
	session,
	update,
	viewerId
}) => {
	const pRef = useRef<HTMLParagraphElement>(null);

	return (
		// base container
		<div
			className="shadow-lg w-full
		hover:cursor-pointer rounded-md
		transition-all duration-500 ease-in-out container
		hover:shadow-2xl"
		>
			<div className="px-4 py-2 flex flex-col justify-between">
				<div className="max-h-40 mt-1 text-xs w-full text-slate-500">
					{/* header */}
					<Authored
						user={author}
						createdAt={new Date(createdAt)}
						following={session?.user?.follows.following}
						update={update}
						viewerId={viewerId}
					/>
				</div>
				<Link href={`post/${postId}`} className="no-underline prose">
					{/* content */}
					<h1 className="text-lg font-semibold py-2 leading-6 text-gray-900 mb-0">
						{title}
					</h1>
					<div
						className="relative text-sm max-h-40 w-full overflow-y-clip flex-1"
						ref={pRef}
					>
						<MarkdownRenderer content={content} />
						{pRef.current?.clientHeight === 160 ? (
							// blur bottom if content is too long
							<div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
						) : null}
					</div>
				</Link>
				<div className="flex flex-row flex-wrap">
					{categories.map((category, index) => (
						<Tag key={index} name={category.name} />
					))}
				</div>
				{/* like comment count etc footer */}
				<div className="flex flex-row justify-evenly items-center mt-2 text-xs text-center w-full">
					<CommentButton label={_count.comments.toString()} />
					<Separator orientation="vertical" />
					<LikeButton
						label={likes.length}
						kind="post"
						postId={postId}
						isLiked={
							session?.user?.likes.postLikes.some(
								like => like.postId === postId
							) || false
						}
						disabled={!session}
						userId={session?.user?.id}
						update={update}
					/>
					<Separator orientation="vertical" />
					<ShareButton
						href={`${window.location.origin}/post/${postId}`}
					/>
				</div>
			</div>
		</div>
	);
};

export default Post;
