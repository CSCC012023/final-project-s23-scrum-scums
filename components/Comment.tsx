import React from "react";
import { FaArrowUp, FaArrowDown, FaReply } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import IconBtn from "@components/Button";

interface User {
	id:        string,
	email:     string,
	username:  string,
	password:  string,
	followers: number
}

export interface CommentProps {
    id: string,
    content: string,
    author: User,
    createdAt: Date
}

function getTimeDifference(date: Date): string {
	const now = new Date();
	const prev = new Date(date);
	const diff = now.getTime() - prev.getTime();

	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (days > 0) return `${days} days ago`;
	if (hours > 0) return `${hours} hours ago`;
	if (minutes > 0) return `${minutes} minutes ago`;
	if (seconds > 0) return `${seconds} seconds ago`;
	return "just now";
}

const Comment: React.FC<CommentProps> = ({ content, author, createdAt }) => {
	return(
		<div className="p-4">
			<div className="flex flex-row justify-between flex-wrap">
				<div className="basis-full flex flex-row justify-between border-b-2 border-gray-600">
					<div className="text-sm">{author?.username}</div>
					<div className="text-xs">{getTimeDifference(createdAt)}</div>
				</div>
				<ReactMarkdown className="prose lg: prose-base" >{content}</ReactMarkdown>
			</div>
			<div className="flex flex-wrap">
				<IconBtn className="mr-1" Icon={FaArrowUp} aria-label="Like" isActive={true} color="blue">6</IconBtn>
				<IconBtn className="mr-4" Icon={FaArrowDown} aria-label="Dislike" isActive={true} color="danger"> </IconBtn>
				<IconBtn Icon={FaReply} aria-label="Comment" isActive={true} color="green"> </IconBtn>
			</div>

		</div>
	);
};

export default Comment;