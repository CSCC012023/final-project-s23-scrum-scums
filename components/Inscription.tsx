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
		<section className="rounded-md bg-gray-200 flex flex-col w-1/4 h-1/4 justify-between">Inscription
			<div className="header flex flex-col items-start gap-2">
				<div className="h-2 place-self-center"> { title } </div>
				<div className="text-sm">{ author.username }</div>
				<div className="text-xs">{ createdAt.toLocaleString() }</div>
			</div>
			{/* <Image src={} alt="user photo" /> */}
			<div className="font-sans"> { content } </div>
		</section>
	);
};

export default Inscription;