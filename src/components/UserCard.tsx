import { User } from "@prisma/client";
import { FC } from "react";
import React from "react";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@src/components/ui/HoverCard";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { buttonVariants } from "./ui/Button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { HoverCardProps } from "@radix-ui/react-hover-card";


interface UserCardProps extends HoverCardProps {
	user: Pick<User, "id" | "image" | "name" | "bio" | "username" | "createdAt">;
}

const UserCard: FC<UserCardProps> = ({user, ...props}) => {
	return (
		<HoverCard {...props}>
			<HoverCardTrigger asChild>
				<Link className={buttonVariants({variant: "link"})} href={`profile/${user.id}`}>@{user.username}</Link>
			</HoverCardTrigger>
			<HoverCardContent className="w-80 flex flex-row items-center">
				<div className="flex justify-between space-x-4 items-center">
					<UserAvatar
						user={user}
					/>
					<div className="space-y-1">
						<h4 className="text font-semibold">{user.username}</h4>
						<p className="text-sm">
							{user.bio}
						</p>
						<div className="flex items-center pt-2">
							<CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
							<span className="text-xs text-muted-foreground">
								Joined {new Date(user.createdAt).toLocaleDateString()}
							</span>
						</div>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
};

export default UserCard;