"use client";

import Inscription from "@components/Inscription";
import { InscriptionProps } from "@components/Inscription";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Feed = () => {
	const [posts, setPosts] = useState<InscriptionProps[]>([]);
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
		<Inscription
			key={post.id}
			id={post.id}
			title={post.title}
			content={post.content}
			authorId={post.authorId}
			author={post.author}
			createdAt={post.createdAt}
		/>
	));

	// useEffect(() => {
	// 	console.log("post change it");
	// 	console.log(posts);
	// }, [posts]);

	return (
		<div className="h-full w-full ">
			{loading ? <h1>loading...</h1> :
				<div className="flex flex-row items-center justify-center">
					<div className="columns-2 [&>*]:m-4 prose w-1/2 over">
						{postEls}
					</div>
					<div className="w-1/2 flex flex-col items-center justify-center h-full">
						<h1>hello</h1>
					</div>
				</div>
			}
		</div>
	);
};

export default Feed;