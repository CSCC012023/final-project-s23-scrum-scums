"use client";

import React from "react";
import { useRouter } from "next/navigation"; 
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
		<section className="rounded-md  flex flex-col w-full h-full justify-between p-4">
			<div className="header flex bg-gray-200 flex-col items-start gap-2 p-2">
				<div className="h-2"> { title } </div>
				<div className="text-sm">{ author?.username }</div>
				<div className="text-xs">{ createdAt.toLocaleString() }</div>
			</div>
			{/* <Image src={} alt="user photo" /> */}
			<div className="font-sans mt-4"> { content } </div>
			<div className="flex justify-between">
				{/* Change buttons to icons */}
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Like
				</button>
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Dislike
				</button>
				<button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Comment
				</button>
			</div>
		</section>
	);
};

export default Inscription;