"use client";
import { User } from "@prisma/client";
import { FC, useState } from "react";
import { useToast } from "@src/hooks/use-toast";
import Editable from "./Editable";
import React from "react";
import UserAvatar from "./UserAvatar";
import axios from "axios";
import { Separator } from "./ui/Separator";
import { useSession } from "next-auth/react";

interface UserProfileProps {
	profile: Profile;
}

interface Profile {
	user: Pick<
		User,
		"id" | "name" | "bio" | "createdAt" | "username" | "image"
	>;
	_count: {
		followedBy: number;
	};
}

const UserProfile: FC<UserProfileProps> = ({
	profile: {
		user,
		_count: { followedBy }
	}
}) => {
	const [edUser, setEdUser] = useState<Profile["user"]>(user);
	const [followers, setFollowers] = useState(followedBy);
	const id = user.id;

	const { data: session, update } = useSession();

	const { toast } = useToast();

	const nameSubmit = async (text: string) => {
		if (text != "" && edUser.name != text) {
			setEdUser({ ...user, name: text });
		}
		await axios
			.patch(`/api/user/${id}`, {
				name: text
			})
			.then(response => {
				if (response.status === 200) {
					toast({
						title: "Name updated"
					});
				}
			})
			.catch(err => {
				console.log("patch: ", err);
				toast({
					title: "Something went wrong",
					description: `(${err.response.status})`
				});
			});
	};

	const bioSubmit = async (text: string) => {
		// This is a temporary fix
		// See route.ts in profile for more info
		if (user.bio != text) {
			setEdUser({ ...user, bio: text });
		}
		await axios
			.patch(`/api/user/${id}`, {
				bio: text
			})
			.then(response => {
				if (response.status === 200) {
					toast({
						title: "Bio updated"
					});
				}
			})
			.catch(err => {
				console.log("patch: ", err);
				toast({
					title: "Something went wrong",
					description: `(${err.response.status})`
				});
			});
	};

	const userSame = session?.user?.id === user.id;

	const bio =
		userSame && user.bio ? (
			<Editable content={user.bio} submit={bioSubmit} />
		) : (
			<p>{user.bio}</p>
		);

	return (
		<div className="w-full h-1/3 flex flex-col items-center justify-center">
			<div className="flex flex-row w-full container">
				<UserAvatar user={user} />
				<div className="font-semibold text-center w-full font-sans text-lg">
					{<Editable content={user.username} submit={nameSubmit} />}
				</div>
			</div>
			<Separator />
			<div className="flex flex-row w-full container">
				<div className="text-neutral-700 text-center">
					{followers} follower {followers > 0 ? "s" : ""}{" "}
				</div>
				<div className="w-full h-full mt-10">{bio}</div>
			</div>
		</div>
	);
};

export default UserProfile;
