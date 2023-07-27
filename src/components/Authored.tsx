import { FC } from "react";
import React from "react";
import { cn, formatTimeToNow } from "@src/lib/utils";
import { User } from "@prisma/client";
import UserAvatar from "@src/components/UserAvatar";
import UserCard from "@src/components/UserCard";

interface AuthoredProps extends React.HTMLAttributes<HTMLDivElement> {
	user: Pick<
		User,
		"username" | "image" | "name" | "id" | "createdAt" | "bio"
	>;
	createdAt: Date;
}

const Authored: FC<AuthoredProps> = ({ user, createdAt, ...props }) => {
	return (
		<div
			className={cn`${props.className} flex flex-row items-center text-sm`}
		>
			<UserAvatar user={user} className="h-5 w-5" />
			<UserCard user={user} />{" "}
			<span className="text-muted-foreground">
				{formatTimeToNow(new Date(createdAt))}
			</span>
		</div>
	);
};

export default Authored;
