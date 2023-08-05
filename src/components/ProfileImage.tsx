"use client";

import React, { useEffect, useState } from "react";
import Image from "next/legacy/image";	
import axios from "axios";

export default function ProfileImage() {
	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(true);

	const fetchImage	= async () => {
		try {
			const { data } =  await axios.get("/api/profileimage");
			setData(data.message);
			setLoading(false);
			console.log(data.message);
		}
		catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchImage();
	}, []);

	if (isLoading) return;
	if (!data) return <p>No profile Image</p>;

	return	(
		<div className="relative w-full h-full rounded-full overflow-hidden mx-auto">
			{<Image
				src={data ? data : "/assets/icons/random_avatars/panda.png"}
				alt="User avatar"
				// width="600"
				// height="600"
				layout="fill"
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				objectFit="cover"
				objectPosition="center"
				priority={true} // {false} | {true}
			/>}
		</div>
	);
}