"use client";

import Inscription from "@components/Inscription";
import { InscriptionProps } from "@components/Inscription";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Feed = async () => {
	const [posts, setPosts] = useState<InscriptionProps[]>([]);


	const fetchPosts = async () => {
		const { data } =  await axios.get("/api/trending");
		setPosts(data);
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<div>
			<h1>
				Feed Page {}
			</h1>
			<div className="m-16">
				{posts.map((post) => (
					<Inscription
						key={post.id}

					/>
				)}
			</div>
		</div>
	);
};

export default Feed;