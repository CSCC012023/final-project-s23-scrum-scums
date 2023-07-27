import React from "react";
import { Comment as CommentType, User } from "@prisma/client";
import Authored from "./Authored";
import MarkdownRenderer from "./MarkdownRenderer";
import CommentButton from "./Buttons/CommentButton";
import LikeButton from "./Buttons/LikeButton";
import { Share2Icon } from "@radix-ui/react-icons";

interface CommentProps extends CommentType {
	author: Pick<
		User,
		"username" | "image" | "name" | "id" | "createdAt" | "bio"
	>;
	userId?: string; // the id of the user viewing the comment
}

const Comment: React.FC<CommentProps> = ({
	author,
	content,
	createdAt,
	postId,
	userId
}) => {
	return (
		<div
			className="flex flex-col container items-stretch justify-between
			h-fit p-4
		"
		>
			<Authored user={author} createdAt={new Date(createdAt)} />
			<MarkdownRenderer content={content} />
			<div
				className="flex flex-row items-center text-xs text-center
			mt-2 space-x-4
			"
			>
				<CommentButton className="h-4 w-4" />
				<LikeButton
					className="h-4 w-4"
					kind="comment"
					isLiked={false}
					postId={postId}
					label={2}
					userId={userId}
				/>
				<Share2Icon className="h-5 w-5" />
			</div>
		</div>
	);
};

export default Comment;
