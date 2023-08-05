"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

import useRegisterModal from "@src/hooks/useRegisterModal";
import ProfileImage from "./ProfileImage";

const Navbar = () => {
	const searches = useSearchParams();
	const [search, setSearch] = useState<string | null>(searches ? searches?.get("q") : "");
	const router = useRouter();
	const { data: session, status } = useSession();
	const registerModal = useRegisterModal();

	const onSearch = (event: React.FormEvent) => {
		event.preventDefault();

		if (typeof search !== "string") {
			return;
		}
		const encodedSearchQuery = encodeURI(search || "");
		router.push(`/search?q=${encodedSearchQuery}`);
	};

	return (
		<nav className="navbar bg-base-100 sticky py-1 z-50">
			<div className="flex-1 font-serif">
				<Link className="btn btn-ghost normal-case text-4xl" href="/">Obelisk</Link>
			</div>
			<div className="flex-none gap-2">
				<Link className="btn btn-accent btn-outline" href="/recommended">
					Recommended
				</Link>
				<Link className="btn btn-ghost btn-circle" href="/post">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-secondary" viewBox="0 0 512 512" stroke="currentColor"><g>
						<g>
							<path d="M489.068,22.913c-26.642-26.644-72.224-30.155-128.35-9.888c-51.569,18.618-108.577,55.861-160.523,104.868l-3.24,3.056
			l-19.639,65.066l-34.289-6.73l-6.311,8.073C105.59,227.17,84.865,280.55,76.779,341.726c-4.407,33.348-3.995,60.425-3.393,73.261
			L0,488.372l23.609,23.609l74.042-74.041c14.759-0.658,51.24-3.335,96.12-14.214c53.476-12.961,129.377-40.567,187.284-98.474
			c10.237-10.236,20.219-20.92,29.665-31.757l6.794-7.794l-13.597-32.89l61.56-33.347l2.349-3.922
			C517.993,131.79,525.934,59.779,489.068,22.913z M441.492,194.486l-79.919,43.292l17.148,41.477
			c-6.88,7.621-14.009,15.123-21.274,22.387c-52.215,52.214-121.657,77.455-170.716,89.435c-19.355,4.727-37.162,7.822-52.067,9.849
			L288.26,247.332l-23.609-23.609L106.866,381.508c1.874-42.013,11.409-110.654,50.117-165.46l43.565,8.552l25.791-85.446
			c47.792-44.433,99.406-78.004,145.719-94.725c42.636-15.393,76.68-14.631,93.402,2.093
			C489.562,70.626,480.109,128.423,441.492,194.486z"/>
						</g>
					</g>
					</svg>
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
							<label tabIndex={0} className="btn btn-ghost btn-circle avatar mt-1.5">
								<div className="relative w-full h-full rounded-full p-0.5">
									{session?.user?.image !== null ?
										// <Image src={session.user.image }  fill alt="profile" className="rounded-full" referrerPolicy="no-referrer" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/> :
										<ProfileImage	/> :
										<span className="avatar text-sm"> {session.user.name} </span>
									}
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
			</div>
		</nav>
	);
};


export default Navbar;