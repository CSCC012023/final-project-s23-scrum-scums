"use client";

import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from "@src/hooks/use-toast";
import React from "react";
import { Button, ButtonProps } from "@src/components/ui/Button";
import { CommentLike, PostLike } from "@prisma/client";
import { cn } from "@src/lib/utils";
import { useSession } from "next-auth/react";

interface LikeButtonProps extends ButtonProps {
	label: number; // of likes
	kind: "post" | "comment";
	postId: number;
	isLiked: boolean;
	disabled?: boolean;
	userId?: string;
	update: ReturnType<typeof useSession>["update"];
}

interface Response {
	likes: PostLike[] | CommentLike[];
}

const LikeButton: React.FC<LikeButtonProps> = ({
	label,
	kind,
	postId,
	isLiked,
	disabled,
	userId,
	update,
	...props
}) => {
	const [numLikes, setNumLikes] = useState(label);
	const [liked, setLiked] = useState(isLiked);
	const { toast } = useToast();

	let display: string = label == 0 ? "Like" : String(numLikes);
	useEffect(() => {
		display = label == 0 ? "Like" : String(numLikes);
	}, [numLikes]);

	function like() {
		if (!userId || disabled) {
			return toast({
				title: "You must be logged in to like this",
				variant: "destructive"
			});
		}

		if (liked) {
			setNumLikes(numLikes - 1);
			setLiked(false);
		} else {
			setNumLikes(numLikes + 1);
			setLiked(true);
		}
		axios
			.post(`/api/${kind}/${postId}/like`, {
				userId,
				isLiked: !liked
			})
			.then(res => {
				const data: Response = res.data;
				console.log("res", data);
				setLiked(data.likes.some(like => like.userId === userId));
				setNumLikes(data.likes.length);
				update();
			})
			.catch(err => {
				toast({
					title: "There was an error liking this",
					description: err.message,
					variant: "destructive"
				});
				console.log(err);
				// throw new Error(err.data);
			});
	}

	return (
		<Button
			className={cn(
				"flex items-center",
				liked ? "text-red-500" : "text-gray-500"
			)}
			{...props}
			onClick={() => like()}
			disabled={disabled}
			variant={"link"}
		>
			<span className="flex flex-row items-center justify-center">
				{liked ? (
					<HeartFilledIcon className="mr-2 h-5 w-5 text-rose-500" />
				) : (
					<HeartIcon className="mr-2 h-5 w-5" />
				)}
				{display}
			</span>
		</Button>
	);
};

export default LikeButton;
