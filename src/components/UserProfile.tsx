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
import FollowButton from "./Buttons/FollowButton";

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
					description: `(${err.response.status})`,
					variant: "destructive"
				});
			});
	};

	const bioSubmit = async (text: string) => {
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

	const username = userSame ? (
		<Editable content={user.username as string} submit={nameSubmit} />
	) : (
		<p>{user.username}</p>
	);

	const bio =
		userSame && user.bio ? (
			<Editable content={user.bio} submit={bioSubmit} />
		) : (
			<p>{user.bio}</p>
		);

	return (
		<div className="w-full h-1/3 flex flex-col items-center justify-center font-sans ml-64 mr-64">
			<div className="flex flex-row w-full container">
				<UserAvatar user={user} className="h-full" />
				<div className="font-semibold text-center w-full text-lg flex flex-col items-center justify-center">
					@{username}
					<span className="text-muted-foreground text-sm">
						{user.name}
					</span>
				</div>
				<div className="h-full w-full flex-1 spacer"></div>
				<div className="flex flex-row items-center justify-center container">
					{followers} follower{followers > 0 ? "s" : ""}
				</div>
				<div>
					<FollowButton
						userId={session?.user?.id}
						userToFollowId={user.id}
						following={session?.user?.follows.following}
						update={update}
						onClick={() => setFollowers(followers + 1)}
					/>
				</div>
			</div>
			<Separator />
			<div className="w-full h-full my-2">{bio}</div>
		</div>
	);
};

export default UserProfile;
