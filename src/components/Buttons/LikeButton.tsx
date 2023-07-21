"use client";

import Button from "./Button";

import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Like } from "@src/types";

interface LikeButtonProps {
	label: number // of likes
	type: "post" | "comment"
    id: number
    isLiked: boolean
	disabled?: boolean
	userId?: string
}

interface Response {
	likes: Like[]
}
const LikeButton:React.FC<LikeButtonProps> = ({
	label,
	type,
	id,
	isLiked,
	disabled,
	userId
}) => {
	
	const [numLikes, setNumLikes] = useState(label)
	const [liked, setLiked] = useState(isLiked)

	console.log("liked", liked);

	function like() {
		if (!userId) return toast.error("You must be logged in to like this");

		if (liked) {
			setNumLikes(numLikes - 1)
			setLiked(false)
		} else {
			setNumLikes(numLikes + 1)
			setLiked(true)
		}
		axios.post(`/api/${type}/${id}/like`, {
			userId
		})
			.then(res => {
				const data: Response = res.data;
				setLiked(data.likes.some((like) => like.userId === userId));
				setNumLikes(data.likes.length);
			})
			.catch(err => {
				toast.error(err.message);
				console.log(err);
				// throw new Error(err.data);
			});
	}

    return (
        <Button
			label={label === 0 ? "Like" : String(numLikes)}
			icon={isLiked ? AiFillLike : AiOutlineLike}
			onClick={() => like()}
			small
			outline={!liked}
			disabled={disabled}
		/>
    )
}

export default LikeButton