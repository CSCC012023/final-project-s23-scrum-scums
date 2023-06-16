"use client";

import React from "react";
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
	return (
		<section className="rounded-md  flex flex-col w-full h-full justify-between p-4">
			<div className="header flex bg-gray-200 flex-col items-start gap-2 p-2">
				<div className="h-2"> { title } </div>
				<div className="text-sm">{ author?.username }</div>
				<div className="text-xs">{ createdAt.toLocaleString() }</div>
			</div>
			{/* <Image src={} alt="user photo" /> */}
			<div className="font-sans mt-4"> { content } </div>
		</section>
	);
};

export default Inscription;