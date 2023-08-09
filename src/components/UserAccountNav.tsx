"use client";

import Link from "next/link";
import { User } from "next-auth";
import React from "react";
import { signOut } from "next-auth/react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@src/components/ui/DropdownMenu";
import UserAvatar  from "@src/components/UserAvatar";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "id" | "name" | "image" | "email">
}

export function UserAccountNav({ user }: UserAccountNavProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<UserAvatar
					user={{ name: user?.name || null, image: user?.image || null }}
					className='h-8 w-8'
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='bg-white' align='end'>
				<div className='flex items-center justify-start gap-2 p-2'>
					<div className='flex flex-col space-y-1 leading-none'>
						{user?.name && <p className='font-medium'>{user?.name}</p>}
						{user?.email && (
							<p className='w-18 truncate text-sm text-muted-foreground'>
								{user?.email}
							</p>
						)}
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild className="cursor-pointer">
					<Link href='/feed'>Feed</Link>
				</DropdownMenuItem>

				<DropdownMenuItem asChild className="cursor-pointer">
					<Link href={`/profile/${user?.id}`}>Profile</Link>
				</DropdownMenuItem>

				<DropdownMenuItem asChild className="cursor-pointer">
					<Link href={`/recommended/`}>Recommended</Link>
				</DropdownMenuItem>

				{/* <DropdownMenuItem asChild className="cursor-pointer">
					<Link href='/settings'>Settings</Link>
				</DropdownMenuItem> */}
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className='cursor-pointer'
					onSelect={(event) => {
						event.preventDefault();
						signOut({
							callbackUrl: `${window.location.origin}/login`,
						});
					}}>
          Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}