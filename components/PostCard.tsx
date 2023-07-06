import ReactMarkdown  from "react-markdown";
import React from "react";
import { useRouter } from "next/navigation";
import { FaReply, FaArrowDown, FaArrowUp } from "react-icons/fa";
import IconBtn from "@components/Buttons";
import remarkGfm from "remark-gfm";
import Tag from "@components/Tag";
// import Image from "next/image";

interface User {
	id:        string,
	email:     string,
	username:  string,
	password:  string,
	followers: number
}

export interface PostProps {
	id:        	string,
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
	author,
	createdAt,
	categories
}) => {
	const router = useRouter();

	const handleClick = () => {
		router.push(`/inscribe/${id}`);
	};


	const trending = Math.random() > 0.5;

	return (
		// <section className="rounded-md break-inside-avoid font-serif flex flex-col w-full h-full justify-between bg-slate-100">
		// 	<div className="header flex bg-gray-200 flex-col items-start gap-2 p-2">
		// 		<div className="text-bold"> <ReactMarkdown remarkPlugins={[remarkGfm]} children={title}/> </div>
		// 		<div className="text-sm">{ author?.username }</div>
		// 		<div className="text-xs">{ createdAt.toLocaleString() }</div>
		// 	</div>
		// 	{/* <Image src={} alt={author?.username} /> */}
		// 	<div className="font-robotoslab mt-4 font-normal p-2"> <ReactMarkdown remarkPlugins={[remarkGfm]} children={content}/> </div>
		// 	<div className="flex flex-auto flex-wrap flex-row p-2 gap-2 justify-between">
		// 		<IconBtn Icon={FaArrowUp} aria-label="Like" isActive={true} color="blue"></IconBtn>
		// 		<IconBtn Icon={FaArrowDown} aria-label="Dislike" isActive={true} color="danger"></IconBtn>
		// 		<IconBtn onClick={handleClick} Icon={FaReply} aria-label="Comment" isActive={true} color="green"></IconBtn>
		// 	</div>
		// </section>
		<div className="card w-96 h-[32rem] bg-base-100 shadow-xl break-inside-avoid prose
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
				<ReactMarkdown remarkPlugins={[remarkGfm]} children={content}/>
				<div className="card-actions justify-end">
					{ categories.map((category, index) => <Tag key={category.id} name={category.name}/>) }
				</div>
			</div>
		</div>
	);
};

export default PostCard;