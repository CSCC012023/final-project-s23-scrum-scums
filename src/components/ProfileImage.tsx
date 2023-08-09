import useSWR from "swr";
import axios from "axios";
import React from "react";
import Image from "next/legacy/image";
import { Icons } from "./Icons";
import { AvatarFallback } from "@radix-ui/react-avatar";

const fetchSessionImage = async (url: string, userId: any) => {
	const res = await axios.get(url, { params: { userId } });
	if (res.status !== 200) {
		throw new Error("Failed to load");
	}
	return res.data.message;
};

export interface ProfileImageProps {
	userId: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ userId }) => {
	// console.log("userids is " + userId);
	// const userId	= "clkugs4dw0002tts4uoc0kfq5";
	// const userId=null;
	// console.log("userid is " + userId);
	const { data, error } = useSWR(
		["/api/profileimage", userId],
		([url, userId]) => fetchSessionImage(url, userId),
		{ refreshInterval: 1 }
	);

	const fallback = (
		<Icons.user className="h-4 w-4 flex items-center justify-center" />
	);

	if (error) return fallback;
	if (!data) return fallback;

	return (
		<div className="relative w-full h-full rounded-full overflow-hidden mx-auto">
			<Image
				src={data ? data : fallback}
				alt="User avatar"
				layout="fill"
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				objectFit="cover"
				objectPosition="center"
				priority={true}
			/>
		</div>
	);
};

export default ProfileImage;
