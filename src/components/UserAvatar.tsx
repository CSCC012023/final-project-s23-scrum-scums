import { User } from "@prisma/client";
import { AvatarProps } from "@radix-ui/react-avatar";
import React from "react";
import { Icons } from "@src/components/Icons";
import { Avatar, AvatarFallback } from "@src/components/ui/Avatar";
import Image from "next/image";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "name">
}

const UserAvatar = ({ user, ...props }: UserAvatarProps) => {
	return (
		<Avatar {...props}>
			{user.image ? (
				<div className='relative aspect-square h-full w-full'>
					<Image
						fill
						src={user.image}
						sizes="100%"
						alt='profile picture'
						referrerPolicy='no-referrer'
					/>
				</div>
			) : (
				<AvatarFallback>
					<span className='sr-only'>{user?.name}</span>
					<Icons.user className='h-4 w-4' />
				</AvatarFallback>
			)}
		</Avatar>
	);
};

export default UserAvatar;