"use client";

import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Logout = () => {
	const router = useRouter();
	const { data: session } = useSession();

	if	(!session){
		useEffect(() => {
			setTimeout(() => {
				router.push("/login"); // replace with your logout URL
			}, 5000);
		}, []);

		return (
			<div className="flex flex-col items-center justify-center h-screen">Did you mean to login? Redirecting you to the login page...</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<p className="mb-4 text-xl font-bold">Are you sure you want to logout?</p>
			<button 
				onClick={() => signOut({ callbackUrl: "http://localhost:3000" })} 
				className="px-4 py-2 text-white bg-blue-500 border border-blue-700 rounded-md">
					Sign out
			</button>
		</div>
	);
};

export default Logout;