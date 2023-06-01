"use client";

import Inscription from "@components/Inscription";
import { InscriptionProps } from "@components/Inscription";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Feed = () => {
	const [posts, setPosts] = useState<InscriptionProps[]>([]);

	const fetchPosts = async () => {
		const { data } =  await axios.get("/api/trending");
		setPosts(data);
		console.log(posts);
	};

	useEffect(() => {
		fetchPosts();
	}, []);

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
