"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";	
import { useSession } from "next-auth/react";
import axios from "axios";


export default function UserProfilePicture() {
	const { data: session, status } = useSession();
	const [data, setData] = useState(null);
	if (status !== "loading" && session) {
			console.log("Fetching data");
			const response = await axios.get("/api/profilepicture", {
				params: {
					userId: session.user.id,
				},
			});
			setData(response.data);
			}
		}

	return	(
		<div className="relative w-32 h-32 rounded-full overflow-hidden">
			{<Image
				src={data ? data : "/assets/icons/random_avatars/panda.png"}
				layout="fill"
				objectFit="cover"
				alt="User avatar"
			/>}
		</div>
	);
}