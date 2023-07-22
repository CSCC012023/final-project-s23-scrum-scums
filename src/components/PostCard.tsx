import ReactMarkdown  from "react-markdown";
import React from "react";
import { useRouter } from "next/navigation";
import remarkGfm from "remark-gfm";
import Tag from "@src/components/Tag";
// import Image from "next/image";

interface User {
	id:        string,
	email:     string,
	username:  string,
	password:  string,
	followers: number
}

export interface PostProps {
	id:        	number,
	title:     	string,
	content:   	string,
	author:    	User,
	authorId:  	string,
	createdAt: 	Date,
	categories: Category[]
}

export interface Category {
	id:   string,
	name: string
}

const PostCard: React.FC<PostProps> = ({
	id,
	title,
	content,
	categories
}) => {
	const router = useRouter();

	const handleClick = () => {
		router.push(`/post/${id}`);
	};

	function getFirstLine(str: string) {
		return str.split(".")[0].concat(".");
	}

	return (
		<div className="card w-96 h-[32rem] bg-base-300 shadow-xl break-inside-avoid prose
		hover:cursor-pointer
		transition-all duration-500 ease-in-out
		hover:shadow-2xl" onClick={handleClick}>
			<figure className="w-full mb-0" ><img src="https://picsum.photos/400" alt="post image" /></figure>
			<div className="card-body">
				<h2 className="card-title">
					{ title }
				</h2>
				<ReactMarkdown remarkPlugins={[remarkGfm]}>
					{getFirstLine(content)}
				</ReactMarkdown>

				<div className="card-actions justify-end">
					{ categories.map((category) => <Tag key={category.id} name={category.name}/>) }
				</div>
			</div>
		</div>
	);
};

export default PostCard;