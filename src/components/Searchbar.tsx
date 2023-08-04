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
		<div className="form-control">
			<form onSubmit={onSearch}>
				<input
					type="text"
					placeholder="Search"
					className="input input-bordered input-accent w-24 md:w-auto"
					onChange={e => setSearch(e.target.value)}
					value={search || ""}
				/>
			</form>
		</div>
	);
};

export default Searchbar;
