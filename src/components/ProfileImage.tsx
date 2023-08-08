import useSWR from "swr";
import axios from "axios";
import React from "react";
import Image from "next/legacy/image";

const fetchSessionImage = async (url: string, userId: any)=>{
	const res = await axios.get(url, { params: { userId } });
	if (res.status !== 200) {
		throw new Error("Failed to load");
	}
	return res.data.message;
}

export default function ProfileImage({userId}) {
	// console.log("userids is " + userId);
	// const userId	= "clkugs4dw0002tts4uoc0kfq5";
	// const userId=null;
	// console.log("userid is " + userId);
	const { data, error } = useSWR(["/api/profileimage", userId], ([url, userId]) => fetchSessionImage(url, userId), { refreshInterval: 1 });
	
	if (error) return <p>An error has occurred.</p>;
	if (!data) return <p></p>;
	
	return (
		<div className="relative w-full h-full rounded-full overflow-hidden mx-auto">
			<Image
				src={data ? data : "/assets/icons/random_avatars/panda.png"}
				alt="User avatar"
				layout="fill"
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				objectFit="cover"
				objectPosition="center"
				priority={true}
			/>
		</div>
	);
}
