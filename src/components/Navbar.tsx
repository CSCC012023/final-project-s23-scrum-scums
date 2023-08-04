import Link from "next/link";
import React from "react";
import { Icons } from "@src/components/Icons";
import { buttonVariants } from "./ui/Button";
import { getAuthSession } from "@src/lib/auth";
import { UserAccountNav } from "./UserAccountNav";
import { cn } from "@src/lib/utils";
import Searchbar from "./Searchbar";

const Navbar = async () => {
	const session = await getAuthSession();

	return (
		<nav className="fixed top-0 inset-x-0 bg-secondary border-b border-zinc-400 h-fit z-10 py-1">
			<div className="container max-w-6xl h-full mx-auto flex items-center justify-between gap-2 font-serif">
				<Link href="/" className="flex gap-2 items-center flex-1">
					<Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" />
					<p className="hidden text-zinc-700 text-xl font-medium md:block align-text-bottom">
						Obelisk
					</p>
				</Link>
				<div className="flex flex-row items-center justify-center">
					<Link
						className={cn(
							buttonVariants({ variant: "ghost" }),
							"hover:bg-gray-100 transition-all"
						)}
						href="/post"
					>
						<Icons.post className="h-8 w-8 sm:h-4 sm:w-4" />
					</Link>
					{session ? (
						<UserAccountNav user={session.user} />
					) : (
						<Link href="/login" className={buttonVariants()}>
							Login
						</Link>
					)}
				</div>
			</div>
			<Searchbar />
		</nav>
	);
};

export default Navbar;
