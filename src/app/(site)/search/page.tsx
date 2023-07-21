/* eslint-disable react/jsx-key */
"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Post, User } from "@prisma/client";

type Response = {
	posts: Post & {"author": User}[];
};

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

	const res: Response = data;

	if (!encodedSearchQuery) {
		router.push("/");
	}

	if(!res?.posts) {
		return null;
	}
	if (res.posts.length === 0) {
		return (
			<div>
				No results found
			</div>

		);
	}
	return (
		<div>
			{res.posts.map((post) => (
				<div className="hover:bg-slate-900 p-3 gap-4 my-4 rounded-xl border-[2px] border-zinc-600">
					{post.title}
					<div className="flex flex-row flex-wrap gap-6 w-3/5">
						{post.content}
						<div>
							By {post.author.username}
						</div>
					</div>
				</div>
			))}
		</div>
	);

};

export default SearchPage;