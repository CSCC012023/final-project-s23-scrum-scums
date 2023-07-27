"use client";

import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import React from "react";
import { Button, ButtonProps } from "@src/components/ui/Button";
import { CommentLike, PostLike } from "@prisma/client";
import { cn } from "@src/lib/utils";

interface LikeButtonProps extends ButtonProps {
	label: number // of likes
	kind: "post" | "comment"
    postId: number
    isLiked: boolean
	disabled?: boolean
	userId?: string
}

interface Response {
	likes: PostLike[] | CommentLike[]
}

const LikeButton:React.FC<LikeButtonProps> = ({
	label,
	kind,
	postId,
	isLiked,
	disabled,
	userId,
	...props
}) => {

	const [numLikes, setNumLikes] = useState(label);
	const [liked, setLiked] = useState(isLiked);

	function like() {
		if (!userId) return toast.error("You must be logged in to like this");

		if (liked) {
			setNumLikes(numLikes - 1);
			setLiked(false);
		} else {
			setNumLikes(numLikes + 1);
			setLiked(true);
		}
		axios.post(`/api/${kind}/${postId}/like`, {
			userId,
			isLiked: !liked
		})
			.then(res => {
				const data: Response = res.data;
				liked ? {} : setLiked(data.likes.some((like) => like.userId === userId));
				liked ? {} : setNumLikes(data.likes.length);
			})
			.catch(err => {
				toast.error(err.message);
				console.log(err);
				// throw new Error(err.data);
			});
	}

	return (
		<Button
			className={cn("flex gap-1 items-center", liked ? "text-red-500" : "text-gray-500")}
			{...props}
			onClick={() => like()}
			disabled={disabled}
			variant={"link"}
		>
			<span className="flex flex-row items-center justify-center">
				{liked ? <HeartFilledIcon className="mr-2 h-5 w-5 text-rose-500" /> : <HeartIcon className="mr-2 h-5 w-5"/>}
				{label === 0 ? "Like" : String(numLikes)}
			</span>
		</Button>
	);
};

export default LikeButton;