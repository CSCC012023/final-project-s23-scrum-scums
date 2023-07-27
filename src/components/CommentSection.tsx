"use client";

import { FC } from "react";
import React from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useEffect, useState } from "react";
import CommentTree from "./CommentTree";
import { CommentTree as CommentTreeType } from "@src/types";

interface CommentSectionProps {
	postId: number;
	session: ReturnType<typeof useSession>["data"];
}

// 1@ts-expect-error react server components are new
const CommentSection: FC<CommentSectionProps> = ({ postId, session }) => {
	const getCommentTree = async (postId: number) => {
		const comments = await axios
			.get(`/api/comment/${postId}`)
			.then(res => res.data)
			.catch(err => {
				console.log(err);
				return [];
			});
		return comments;
	};

	const [commentTree, setCommentTree] = useState<CommentTreeType[]>([]);

	useEffect(() => {
		getCommentTree(postId).then(comments => {
			setCommentTree(comments);
		});
	}, []);

	return (
		<div className="flex flex-col items-center w-full h-full">
			{commentTree.map((comment, index) => (
				<CommentTree
					id={comment.id}
					author={comment.author}
					content={comment.content}
					createdAt={comment.createdAt}
					authorId={comment.authorId}
					postId={comment.postId}
					// userId={session?.user?.id}
					updatedAt={comment.updatedAt}
					parentId={comment.parentId}
					replies={comment.replies}
					key={index}
				/>
			))}
		</div>
	);
};

export default CommentSection;
