import ReactMarkdown  from "react-markdown";
import React from "react";
import { useRouter } from "next/navigation";
import { FaReply, FaArrowDown, FaArrowUp } from "react-icons/fa";
import IconBtn from "@components/Buttons";
import remarkGfm from "remark-gfm";
// import Image from "next/image";

interface User {
	id:        string,
	email:     string,
	username:  string,
	password:  string,
	followers: number
}

export interface InscriptionProps {
	id:        string,
	title:     string,
	content:   string,
	author:    User,
	authorId:  string,
	createdAt: Date
}

const Inscription = ({
	id,
	title,
	content,
	author,
	authorId,
	createdAt
}: InscriptionProps
) => {
	const router = useRouter();

	const handleClick = () => {
		router.push(`/inscribe/${id}`);
	};

	const getFirstLine = (content: string) => {
		// get the first non-title line
		const lines = content.split("\n");
		return lines[1];
	};

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
		<div className="card w-72 bg-base-100 shadow-xl break-inside-avoid">
			<figure className="w-full" ><img src="https://picsum.photos/400" alt="post image" /></figure>
			<div className="card-body">
				<h2 className="card-title">
					{ title }
					{
						Math.random() > 0.5 &&
						<div className="badge badge-accent">Trending</div>
					}
				</h2>
				<ReactMarkdown remarkPlugins={[remarkGfm]} children={getFirstLine(content)}/>
				<div className="card-actions justify-end">
					<div className="badge badge-outline">Finance</div>
				</div>
			</div>
		</div>
	);
};

export default Inscription;