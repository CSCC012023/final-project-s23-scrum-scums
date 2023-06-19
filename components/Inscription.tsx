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
	
	return (
		<section className="rounded-md flex flex-col w-full h-full justify-between bg-slate-100">
			<div className="header flex bg-gray-200 flex-col items-start gap-2 p-2">
				<div className="h-2"> { title } </div>
				<div className="text-sm">{ author?.username }</div>
				<div className="text-xs">{ createdAt.toLocaleString() }</div>
			</div>
			{/* <Image src={} alt="user photo" /> */}
			<div className="font-robotoslab mt-4 font-normal p-2"> <ReactMarkdown remarkPlugins={[remarkGfm]} children={content}/> </div>
			<div className="flex flex-auto flex-wrap flex-row p-2 gap-2">
				<IconBtn Icon={FaArrowUp} aria-label="Like" isActive={true} color="blue"></IconBtn>
				<IconBtn Icon={FaArrowDown} aria-label="Dislike" isActive={true} color="danger"></IconBtn>
				<IconBtn onClick={handleClick} Icon={FaReply} aria-label="Comment" isActive={true} color="green"></IconBtn>
			</div>
		</section>
	);
};

export default Inscription;