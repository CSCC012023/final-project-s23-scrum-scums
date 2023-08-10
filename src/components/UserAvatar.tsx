import { User } from "@prisma/client";
import { AvatarProps } from "@radix-ui/react-avatar";
import React, { FC } from "react";
import { Icons } from "@src/components/Icons";
import { Avatar, AvatarFallback } from "@src/components/ui/Avatar";
import ProfileImage from "./ProfileImage";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "name">
}
const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
	return (
		<Avatar {...props}>
			{user && user.image ? (
				<div className='relative aspect-square h-full w-full'>
					{/* <Image
						fill
						src={user.image}
						sizes="100%"
						alt='profile picture'
						referrerPolicy='no-referrer'
					/> */}
					<ProfileImage userId={user.id}/>
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