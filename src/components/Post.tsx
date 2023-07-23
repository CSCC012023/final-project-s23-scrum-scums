import ReactMarkdown  from "react-markdown";
import React from "react";
import remarkGfm from "remark-gfm";
import Tag from "@src/components/Tag";
import Link from "next/link";
import UserCard from "@src/components/UserCard";
import { formatTimeToNow } from "@src/lib/utils";
import { useRef } from "react";
import { ChatBubbleIcon, Share2Icon } from "@radix-ui/react-icons";
import { Separator } from "@src/components/ui/Separator";
import  LikeButton  from "@src/components/Buttons/LikeButton";
import { Category, PostLike, User } from "@prisma/client";
import UserAvatar from "./UserAvatar";

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
	}
}

const Post: React.FC<PostProps> = ({
	postId,
	content,
	title,
	createdAt,
	author,
	categories,
	likes,
	_count
}) => {
	const pRef = useRef<HTMLParagraphElement>(null);

	return (
		// base container
		<div className="shadow-xl prose w-full
		hover:cursor-pointer  rounded-md
		transition-all duration-500 ease-in-out container
		hover:shadow-2xl">
			<div
				className="px-4 py-2 flex flex-col justify-between"
			>
				<div className='max-h-40 mt-1 text-xs w-full text-slate-500'>
					{/* header */}
					<div className="flex flex-row items-center">
						<UserAvatar
							user={author}
							className="h-5 w-5 mr-1"
						/>
						<UserCard
							user={author}
						/>
						{" "}
						<span className="text-muted-foreground">{formatTimeToNow(new Date(createdAt))}</span>
					</div>
				</div>
				<Link href={`post/${postId}`} className="no-underline" >
					{/* content */}
					<h1 className='text-lg font-semibold py-2 leading-6 text-gray-900'>
						{title}
					</h1>
					<div
						className="relative text-sm max-h-40 w-full overflow-y-clip flex-1"
						ref={pRef}>
						<ReactMarkdown remarkPlugins={[remarkGfm]}>
							{content}
						</ReactMarkdown>
						{pRef.current?.clientHeight === 160 ? (
						// blur bottom if content is too long
							<div className='absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent'></div>
						) : null}
					</div>
				</Link>
				<div className="flex flex-row flex-wrap">
					{categories.map((category, index) => (
						<Tag
							key={index}
							name={category.name}
						/>
					))}
				</div>
				{/* like comment count etc footer */}
				<div
					className="flex flex-row justify-evenly items-center mt-2 text-xs text-slate-500 text-center"
				>
					<span className="w-fit align-middle overflow-auto flex flex-row items-center justify-center gap-2">
						<ChatBubbleIcon className="h-5 w-5 text-slate-500" />
						{_count.comments}
					</span>
					<Separator orientation="vertical" />
					<LikeButton
						className="h-5 w-fit"
						label={likes.length}
						kind="post"
						postId={postId}
						// ! this is using the posters likes, we'll have to get session to check if the user has liked the post
						isLiked={likes.some((like) => like.userId === author.id)}
						// userId={post.authorId}
					/>
					<Separator orientation="vertical"/>
					<Share2Icon className="h-5 w-5" />
				</div>
			</div>
		</div>
	);
};

export default Post;