"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import React from "react";



const Navbar = () => {

	const [toggleDropdown, setToggleDropdown] = useState(false);

	return (
		<nav
			className="flex justify-between w-full h-16 px-8 bg-secondary font-inter"
		>
			<Link href="/" className="flex h-full gap-4 justify-center items-end">
				<Image
					src={"/assets/icons/icon.png"}
					alt="logo"
					width={35}
					height={35}
					className="mb-2"
				/>
				<span className="flex flex-col h-full justify-end font-bold text-4xl font-robotoslab mb-1">Obelisk</span>
			</Link>

			<div className="p-2 flex flex-row justify-items-center gap-4 items-center text-lg">
				<Link href="/inscribe" className="border-solid rounded-md border-rose-400 flex-1">
					Inscribe
				</Link>
				<Link href="/feed" className="border-solid rounded-md border-rose-400 flex-1">
					Feed
				</Link>
				<Link href="/login" className="border-solid rounded-md border-rose-400 flex-1">
					Login
				</Link>
			</div>
		</nav>
	);
};


export default Navbar;