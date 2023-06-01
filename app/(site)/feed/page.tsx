"use client";

import Inscription from "@components/Inscription";
import { InscriptionProps } from "@components/Inscription";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Feed = async () => {
	const [posts, setPosts] = useState<InscriptionProps[]>([]);

/*
 			<div className="m-16">
				{posts.map((post) => (
					<Inscription
						key={post.id}
						

					/>
				)}
			</div>
	
 */
	const fetchPosts = async () => {
		console.log('here')
		const { data } =  await axios.get("/api/trending");
		console.log(data)
		setPosts(data);
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<div>
			<h1>
				Feed Page
			</h1>
		</div>
	);
};

export default Feed;
