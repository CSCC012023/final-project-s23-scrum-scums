"use client";

import { cn } from "@src/lib/utils";
import { FC } from "react";
import React from "react";
import { Button, ButtonProps } from "../ui/Button";
import axios from "axios";
import { useToast } from "@src/hooks/use-toast";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";

interface FollowButtonProps extends ButtonProps {
	userToFollowId: string; // the id of the user to follow
	disabled?: boolean;
	update: ReturnType<typeof useSession>["update"];
	following?: User[];
}

const follow = async (
	userToFollowId: string,
	userFollowerId: string,
	update: FollowButtonProps["update"]
) => {
	try {
		const res = await axios.post(`/api/user/follow/${userToFollowId}`, {
			userFollowerId
		});
		console.log("res", res);
		update();
	} catch (error) {
		const { toast } = useToast();
		toast({
			title: "Failed to follow user",
			description: "Please try again later",
			variant: "destructive"
		});
		console.log("error", error);
	}
};

const FollowButton: FC<FollowButtonProps> = ({
	userToFollowId,
	disabled,
	update,
	following,
	...props
}) => {
	const button = (
		<Button
			className={cn`flex items-center text-secondary h-fit bg-green-500 rounded-full  ${props.className}`}
			onClick={() => follow(userToFollowId, "userFollowerId", update)}
			disabled={disabled}
			variant={"ghost"}
		>
			<span className="flex flex-row items-center text-xs justify-center">
				Follow
			</span>
		</Button>
	);

	const followed = following?.some(follow => follow.id === userToFollowId);
	const followingMessage = (
		<span
			className={cn`flex items-center text-green-500 h-fit rounded-full text-xs ${props.className}`}
		>
			Following
		</span>
	);

	return <>{followed ? followingMessage : button}</>;
};

export default FollowButton;
