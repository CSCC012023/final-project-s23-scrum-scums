/* eslint-disable react/jsx-key */
"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Post } from "@prisma/client";

const fetchPosts = async (url: string) => {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error("Failed to fetch posts");
	}

	return response.json();
};

const SearchPage = () => {
	const search = useSearchParams();
	const searchQuery = search ? search?.get("q") : null;
	const router = useRouter();

	const encodedSearchQuery = encodeURI(searchQuery || "");

	const { data } = useSWR(
		`/api/search?q=${encodedSearchQuery}`,
		fetchPosts,
		{ revalidateOnFocus: false }
	);

	if (!encodedSearchQuery) {
		router.push("/");
	}

	if(!data?.posts) {
		return null;
	}
	if (data.posts.length === 0) {
		return (
			<div>
				No results found
			</div>

		);
	}
	return (
		<div>
			{data.posts.map((Post) => (
				<div className="hover:bg-slate-900 p-3 gap-4 my-4 rounded-xl border-[2px] border-zinc-600">
					{Post.title}
					<div className="flex flex-row flex-wrap gap-6 w-3/5">
						{Post.content}
						<div>
							By {Post.author.username}
						</div>
					</div>
				</div>
			))}
		</div>
	);

};

export default SearchPage;