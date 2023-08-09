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
	userId: string | undefined; // the id of the user who is following
	userToFollowId: string; // the id of the user to follow
	disabled?: boolean;
	update: ReturnType<typeof useSession>["update"];
	following?: User[];
}

const FollowButton: FC<FollowButtonProps> = ({
	userId,
	userToFollowId,
	disabled,
	update,
	following,
	...props
}) => {
	const { toast } = useToast();

	const follow = async (
		userToFollowId: string,
		userId: string | undefined,
		update: FollowButtonProps["update"]
	) => {
		try {
			if (!userId) {
				toast({
					title: "You must be logged in to follow a user",
					variant: "destructive"
				});
				return;
			}
			const res = await axios.post(`/api/user/follow/${userToFollowId}`, {
				userId
			});
			console.log("res", res);
			update();
		} catch (error) {
			toast({
				title: "Failed to follow user",
				description: "Please try again later",
				variant: "destructive"
			});
		}
	};

	const button = (
		<Button
			className={cn`flex items-center text-secondary h-fit bg-accent rounded-full  ${props.className}`}
			onClick={() => follow(userToFollowId, userId, update)}
			disabled={disabled}
			variant={"ghost"}
		>
			<span className="flex flex-row items-center text-xs justify-center text-secondary-foreground">
				Follow
			</span>
		</Button>
	);

	const followed = following?.some(follow => follow.id === userToFollowId);
	const followingMessage = (
		<span
			className={cn`flex items-center text-accent h-fit rounded-md text-xs ${props.className}`}
		>
			Following
		</span>
	);

	return <>{followed ? followingMessage : button}</>;
};

export default FollowButton;
