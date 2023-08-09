"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Searchbar = () => {
	const searches = useSearchParams();
	const [search, setSearch] = useState<string | null>(
		searches ? searches?.get("q") : ""
	);
	const router = useRouter();

	const onSearch = (event: React.FormEvent) => {
		event.preventDefault();

		if (typeof search !== "string") {
			return;
		}
		const encodedSearchQuery = encodeURI(search || "");
		router.push(`/search?q=${encodedSearchQuery}`);
	};

	return (
		<div className="form-control w-full h-full px-4 font-sans flex flex-row items-center justify-center">
			<form onSubmit={onSearch} className="w-3/4">
				<input
					type="text"
					placeholder="Search 🔎"
					className="w-full h-full border-1 rounded-full border-secondary px-2"
					onChange={e => setSearch(e.target.value)}
					value={search || ""}
				/>
			</form>
		</div>
	);
};

export default Searchbar;
