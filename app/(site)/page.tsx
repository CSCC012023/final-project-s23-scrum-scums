"use client";


import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import Typewriter from "typewriter-effect";
import InscriptionCard from "@components/InscriptionCard";
import Tag from "@components/Tag";


const Home = () => {

	const [posts, setPosts] = useState<InscriptionProps[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchPosts = async () => {
		try {
			const { data } =  await axios.get("/api/trending");
			setPosts(data);
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const postEls = posts.map((post) => (
		<InscriptionCard
			key={post.id}
			id={post.id}
			title={post.title}
			content={post.content}
			authorId={post.authorId}
			author={post.author}
			createdAt={post.createdAt}
		/>
	));

	return (
		<div className="w-full h-3/5 ">
			<div className="pl-6 w-1/2">
				<h1 className="text-8xl font-bold font-serif my-4">
				Read on.
				</h1>
				<h2 className="text-3xl font-bold text-left">What&#39;s the Internet&#39;s views on
					<span className="text-primary inline-block ml-2"><Typewriter
						options={{
							strings: ["programming.", "design.", "politics.", "music.", "movies.", "books."],
							autoStart: true,
							loop: true,
						}}
					/>
					</span>
				</h2>
			</div>
			<div className="divider">
			</div>

			<div className="h-full w-full ">
				{loading ? <h1 className="font-bold text-center">loading...</h1> :
					<div className="flex flex-row items-center justify-evenly mt-12">
						<div className="grid grid-cols-2 grid-flow-row grid gap-6">
							{postEls}
						</div>
						<div className="sticky top-1/2 flex flex-col items-center justify-center h-full">
							<div className="flex flex-col justify-center items-center">
								<h1 className="text-center pb-1">Discover more about topics you love</h1>
								<div className="flex flex-row flex-wrap justify-center gap-2 w-3/5">
									<Tag name={"Finance"}/>
									<Tag name={"Programming"}/>
									<Tag name={"Politics"}/>
									<Tag name={"Film"}/>
									<Tag name={"Philosophy"}/>
									<Tag name={"Art"}/>
								</div>
							</div>
						</div>
					</div>
				}
			</div>

		</div>
	);
};

export default Home;