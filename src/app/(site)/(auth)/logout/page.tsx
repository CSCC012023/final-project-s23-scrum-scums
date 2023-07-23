"use client";

import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "@src/components/Button";

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
		<div className="flex flex-col items-center justify-center h-full w-full">
			<p className="mb-4 text-xl font-bold text-center">Are you sure you want to logout?</p>
			<div
				className="flex flex-row gap-4 items-center justify-center"
			>
				<Button
					onClick={() => router.back()}
					secondary
					label="Go Back"
				/>
				<Button
					onClick={() => signOut({ callbackUrl: "/" })}
					label="Sign out"
				/>
			</div>
		</div>
	);
};
