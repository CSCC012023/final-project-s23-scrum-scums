import { FC } from "react";
import React from "react";
import { cn, formatTimeToNow } from "@src/lib/utils";
import { User } from "@prisma/client";
import UserAvatar from "@src/components/UserAvatar";
import UserCard from "@src/components/UserCard";
import { useSession } from "next-auth/react";

interface AuthoredProps extends React.HTMLAttributes<HTMLDivElement> {
	user: Pick<
		User,
		"username" | "image" | "name" | "id" | "createdAt" | "bio"
	>;
	createdAt: Date;
	originalDate?: boolean;
	following?: User[];
	update: ReturnType<typeof useSession>["update"];
	viewerId?: string;
}

const Authored: FC<AuthoredProps> = ({
	user,
	createdAt,
	originalDate,
	following,
	update,
	viewerId,
	...props
}) => {
	const canonicalDate = new Date(createdAt).toLocaleDateString(undefined, {
		month: "long",
		day: "numeric",
		year: "numeric"
	});
	return (
		<div
			className={cn`${props.className} flex flex-row items-center text-sm`}
		>
			<UserAvatar user={user} className="h-5 w-5" />
			<UserCard
				user={user}
				following={following}
				update={update}
				viewerId={viewerId}
			/>{" "}
			<span className="text-muted-foreground">
				{originalDate
					? canonicalDate
					: formatTimeToNow(new Date(createdAt))}
			</span>
		</div>
	);
};

export default Authored;
