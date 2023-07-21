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
	console.log("data below");
	console.log(data);

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

	// remove this soon
	const avatarURLs = [
		"/assets/icons/random_avatars/man.png",
		"/assets/icons/random_avatars/panda.png",
		"/assets/icons/random_avatars/rabbit.png",
		"/assets/icons/random_avatars/user.png",
	];

	return (
		<div className="divide-y divide-gray-200 bg-white rounded-md shadow p-4">
			<div className="text-center text-gray-700 py-4">
				<div className="font-bold text-2xl">
					Search: '<span className="text-blue-600">{searchQuery}</span>'
				</div>
				<div className="text-base font-light mt-1">
					({data.posts.length} results)
				</div>
			</div>
			{data.posts.map((Post: Post) => (
				<div className="p-4 hover:bg-gray-100 transition-colors duration-200">
					<div className="flex items-center">
						<img src={avatarURLs[(Post.author.username.charCodeAt(0) - 'a'.charCodeAt(0)) % avatarURLs.length]} alt="author's avatar" className="rounded-full h-12 w-12 mr-4"/>
						<div>
							<div className="text-sm text-gray-700">
								{Post.author.username}
							</div>
							<div className="text-lg font-semibold text-gray-900 mt-1">
								{Post.title}
							</div>
						</div>
					</div>
					<div className="text-sm text-gray-700 mt-2">
						{Post.content}
					</div>
					<div className="text-xs text-gray-500 mt-2">
						Posted on {new Date(Post.createdAt).toLocaleDateString()}
					</div>
				</div>
			))}
		</div>
	);


};

export default SearchPage;