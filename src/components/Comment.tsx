import React from "react";
import ReactMarkdown from "react-markdown";
import formatTimeToNow from "@src/lib/utils/timeAgo";

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
			<div className="flex flex-row justify-between flex-wrap">
				<div className="basis-full flex flex-row justify-between border-b-2 border-gray-600">
					<div className="text-sm">{author?.username}</div>
					<div className="text-xs">{formatTimeToNow(createdAt)}</div>
				</div>
				<ReactMarkdown className="prose lg: prose-base" >{content}</ReactMarkdown>
			</div>
			<div className="flex flex-wrap">
				{/* reply and like */}
			</div>

		</div>
	);
};

export default Comment;