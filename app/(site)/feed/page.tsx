"use client";

import Inscription from "@components/Inscription";
import { InscriptionProps } from "@components/Inscription";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Feed = async () => {
	const [posts, setPosts] = useState<InscriptionProps[]>([]);
	const [postss, setPostss] = useState(4);

	const fetchPosts = async () => {
		const { data } =  await axios.get("/api/trending");
		console.log('here');
		console.log(data);
		setPosts(data);
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	// useEffect(() => {
	// 	console.log("post change it");
	// 	console.log(posts);
	// }, [posts]);

	return (
		<div>
			<h1>
				Feed Page
			</h1>
			<div className="m-16">
				{posts.map((post) => (
					<Inscription
						key={post.id}
						id={post.id}
						title={post.title}
						content={post.content}
						authorId={post.authorId}
						author={post.author}
						createdAt={post.createdAt}
					/>
					// <p key={post.id}>{post.id}</p>
				))}
			</div>
		</div>
	);
};

export default Feed;
