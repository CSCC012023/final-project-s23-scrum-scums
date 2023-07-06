"use client";

import PostCard from "@components/PostCard";
import { PostProps } from "@components/PostCard";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Feed = () => {
	const [posts, setPosts] = useState<PostProps[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchPosts = async () => {
		try {
			const { data } =  await axios.get("/api/trending");
			console.log(data);
			setPosts(data);
			setLoading(false);
			console.log("done loading");
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const postEls = posts.map((post) => (
		<PostCard
			key={post.id}
			id={post.id}
			title={post.title}
			content={post.content}
			authorId={post.authorId}
			author={post.author}
			createdAt={post.createdAt}
			categories={post.categories}
		/>
	));

	return (
		<div className="h-full w-full ">
			{loading ? <h1 className="font-bold text-center">loading...</h1> :
				<div className="flex flex-row items-center justify-evenly">
					<div className="grid grid-cols-2 grid-flow-row gap-6">
						{postEls}
					</div>
					<div className="sticky top-1/2 flex flex-col items-center justify-center h-full">
						<div className="flex flex-col justify-center items-center">
							<h1 className="text-center pb-1">Discover more about topics you love</h1>
							<div className="flex flex-row flex-wrap justify-center gap-2 w-3/5">
								<div className="badge badge-outline hover:badge-info hover:badge-outline hover:cursor-pointer">Finance</div>
								<div className="badge badge-outline hover:badge-info hover:badge-outline hover:cursor-pointer">Programming</div>
								<div className="badge badge-outline hover:badge-info hover:badge-outline hover:cursor-pointer">Politics</div>
								<div className="badge badge-outline hover:badge-info hover:badge-outline hover:cursor-pointer">Science</div>
								<div className="badge badge-outline hover:badge-info hover:badge-outline hover:cursor-pointer">Philosophy</div>
								<div className="badge badge-outline hover:badge-info hover:badge-outline hover:cursor-pointer">Art</div>
							</div>
						</div>
					</div>
				</div>
			}
		</div>
	);
};

export default Feed;