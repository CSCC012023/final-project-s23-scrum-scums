"use client";

import { FC } from "react";
import React from "react";
import { CommentTree as CommentTreeType } from "@src/types";
import { ViewGridIcon } from "@radix-ui/react-icons";
import Comment from "./Comment";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger
} from "./ui/Collapsible";
import Authored from "./Authored";
import { useSession } from "next-auth/react";

interface CommentTreeProps extends CommentTreeType {
	session?: ReturnType<typeof useSession>["data"];
	update: ReturnType<typeof useSession>["update"];
}

const CommentTree: FC<CommentTreeProps> = ({
	id,
	author,
	content,
	createdAt,
	postId,
	updatedAt,
	parentId,
	replies,
	likes,
	session,
	update
}) => {
	const [isOpen, setIsOpen] = React.useState(true);
	return (
		<Collapsible
			open={isOpen}
			onOpenChange={setIsOpen}
			className="flex flex-col items-center w-full rounded-md
			max-w-2xl transition-all duration-500 ease-in-out
			relative bg-zinc-50
			"
		>
			<div className="flex flex-row items-stretch w-full">
				<CollapsibleTrigger
					asChild
					className="hover:cursor-pointer hover:bg-blue-500"
				>
					<div className="w-fit flex flex-col">
						<ViewGridIcon
							className="h-2 w-1 stroke-gray-400
					align-middle"
						/>
						<div className="rounded-full bg-gray-400 w-1 flex-grow transition-all hover:bg-blue-500 duration-150 min-h-4"></div>
					</div>
				</CollapsibleTrigger>
				<div className="flex-grow w-full min-w-full">
					<CollapsibleContent className="flex flex-col items-center justify-between">
						<Comment
							id={id}
							author={author}
							content={content}
							createdAt={createdAt}
							authorId={author.id}
							postId={postId}
							// userId={session?.user?.id}
							updatedAt={updatedAt}
							parentId={parentId}
							likes={likes.length}
							session={session}
							update={update}
						/>
						<div
							className="flex flex-col items-center max-w-2xl px-4 w-full
					bg-zinc-50 transition-all duration-500 ease-in-out relative"
						>
							{replies.map((child, index) => (
								<CommentTree
									id={child.id}
									author={child.author}
									content={child.content}
									createdAt={child.createdAt}
									authorId={child.authorId}
									postId={child.postId}
									// userId={session?.user?.id}
									updatedAt={child.updatedAt}
									parentId={child.parentId}
									key={index}
									replies={child.replies}
									likes={child.likes}
									session={session}
									update={update}
								/>
							))}
						</div>
					</CollapsibleContent>
					{!isOpen && (
						<Authored
							createdAt={createdAt}
							user={author}
							className="ml-4"
						/>
					)}
				</div>
			</div>
		</Collapsible>
	);
};

export default CommentTree;
