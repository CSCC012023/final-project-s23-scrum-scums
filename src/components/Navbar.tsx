// "use client";

import Link from "next/link";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
// import { useState } from "react";
import { Icons } from "@src/components/Icons";
import { buttonVariants } from "./ui/Button";
import { getAuthSession } from "@src/lib/auth";
import { UserAccountNav } from "./UserAccountNav";

const Navbar = async () => {
	// const searches = useSearchParams();
	// const [search, setSearch] = useState<string | null>(searches ? searches?.get("q") : "");
	// const router = useRouter();
	const session = await getAuthSession();

	// const onSearch = (event: React.FormEvent) => {
	// 	event.preventDefault();

	// 	if (typeof search !== "string") {
	// 		return;
	// 	}
	// 	const encodedSearchQuery = encodeURI(search || "");
	// 	router.push(`/search?q=${encodedSearchQuery}`);
	// };

	return (
		<nav className="sticky top-0 inset-x-0 bg-secondary border-b border-zinc-400 h-fit z-10 py-1">
			<div className="container max-w-6xl h-full mx-auto flex items-center justify-between gap-2 font-serif">
				<Link href="/" className="flex gap-2 items-center">
					<Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" />
					<p className="hidden text-zinc-700 text-xl font-medium md:block">Obelisk</p>
				</Link>
				{session ? (
					<UserAccountNav
						user={session.user}
					/>
				) :(
					<Link href='/login' className={buttonVariants()}>Login</Link>
				)}
				{/* <Link className="btn btn-ghost normal-case text-4xl" href="/">Obelisk</Link> */}
			</div>
			{/* <div className="flex-none gap-2">
				<Link className="btn btn-accent btn-outline" href="/recommended">
					Recommended
				</Link>
				<Link className="btn btn-ghost btn-circle" href="/post">
					<Icons.post className="h-8 w-8 sm:h-6 sm:w-6" />
				</Link>
				<div className="form-control">
					<form onSubmit={onSearch}>
						<input type="text" placeholder="Search" className="input input-bordered input-accent w-24 md:w-auto"
							onChange={(e) => setSearch(e.target.value)}
							value={search || ""}
						/>
					</form>
				</div>


				{status==="authenticated" ?
					(
						<div className="dropdown dropdown-end">
							<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
								<div className="w-10 rounded-full">
							({session?.user?.image !== null ? <Image src={session.user.image} fill alt="profile" className="rounded-full" referrerPolicy="no-referrer"/> :
										<span className="avatar text-sm"> {session.user.name} </span>
									})
								</div>
							</label>
							<ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
								<li>
									<Link className="justify-between" href={`/profile/${session.user.id}`}>
									Profile
										<span className="badge">New</span>
									</Link>
								</li>
								<li><Link href="/settings">Settings</Link></li>
								{session ? <li><Link href="/logout">Logout</Link></li> : <li><Link href="/login">Login</Link></li>}
							</ul>
						</div>
					) :
					<div className="btn btn-accent btn-outline" onClick={registerModal.onOpen}>
						Sign Up
					</div>
				}
			</div> */}
		</nav>
	);
};


export default Navbar;