import ReactMarkdown  from "react-markdown";
import React from "react";
import { useRouter } from "next/navigation";
import { FaReply, FaArrowDown, FaArrowUp } from "react-icons/fa";
import IconBtn from "@src/components/Buttons/Button";
import remarkGfm from "remark-gfm";
import Tag from "@src/components/Tag";
import { PostProps, Category, Like } from "@src/types/index"
// import Image from "next/image";



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

	const trending = Math.random() > 0.5;

	return (
		<div className="card w-96 h-[32rem] bg-base-300 shadow-xl break-inside-avoid prose
		hover:cursor-pointer
		transition-all duration-500 ease-in-out
		hover:shadow-2xl" onClick={handleClick}>
			<figure className="w-full mb-0" ><img src="https://picsum.photos/400" alt="post image" /></figure>
			<div className="card-body">
				<h2 className="card-title">
					{ title }
					{
						trending &&
						<div className="badge badge-accent">Trending</div>
					}
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