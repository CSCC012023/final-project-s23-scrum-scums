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

const Comment: React.FC<CommentProps> = ({ content, author, createdAt }) => {
	return(
		<div className="p-4">
			<div className="flex flex-row justify-between bg-gray-200 flex-wrap">
				<div className="basis-full flex flex-row justify-between border-b-2 border-gray-600">
					<div className="text-sm">{author?.username}</div>
					<div className="text-xs">{createdAt.toLocaleString()}</div>

				</div>
				<ReactMarkdown className="prose lg: prose-base" >{content}</ReactMarkdown>
			</div>
			<div className="flex bg-gray-200 flex-wrap">
				<IconBtn className="mr-1" Icon={FaArrowUp} aria-label="Like" isActive={true} color="blue">6</IconBtn>
				<IconBtn className="mr-4" Icon={FaArrowDown} aria-label="Dislike" isActive={true} color="danger"> </IconBtn>
				<IconBtn Icon={FaReply} aria-label="Comment" isActive={true} color="green"> </IconBtn>
			</div>

		</div>
	);
};

export default Comment;