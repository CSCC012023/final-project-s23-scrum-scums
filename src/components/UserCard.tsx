import { User } from "@prisma/client";
import { FC } from "react";
import React from "react";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger
} from "@src/components/ui/HoverCard";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { buttonVariants } from "./ui/Button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { HoverCardProps } from "@radix-ui/react-hover-card";
import { cn } from "@src/lib/utils";
import FollowButton from "./Buttons/FollowButton";
import { useSession } from "next-auth/react";

interface UserCardProps extends HoverCardProps {
	user: Pick<
		User,
		"id" | "image" | "name" | "bio" | "username" | "createdAt"
	>;
	// who the user follows:
	following?: User[];
	update: ReturnType<typeof useSession>["update"];
	viewerId?: string;
}

const UserCard: FC<UserCardProps> = ({
	user,
	following,
	update,
	viewerId,
	...props
}) => {
	return (
		<HoverCard {...props}>
			<HoverCardTrigger asChild>
				<Link
					className={cn`${buttonVariants({
						variant: "link"
					})}, no-underline hover:underline`}
					href={`profile/${user?.id}`}
				>
					{user?.username}
				</Link>
			</HoverCardTrigger>
			<HoverCardContent className="w-80 flex flex-row items-center">
				<div className="flex justify-between space-x-4 items-center">
					<UserAvatar user={user} />
					<div className="space-y-1">
						<span className="flex flex-row items-center">
							<h4 className="text font-semibold text-muted-foreground m-0 mr-4">
								@{user?.username}
							</h4>
							<FollowButton
								className="justify-self-end"
								userToFollowId={user?.id}
								update={update}
								following={following}
								userId={viewerId}
							/>
						</span>
						<p className="text-sm m-0">{user?.bio}</p>
						<div className="flex items-center pt-2 m-0">
							<CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
							<span className="text-xs text-muted-foreground">
								Joined{" "}
								{new Date(user?.createdAt).toLocaleDateString()}
							</span>
						</div>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
};

export default UserCard;
