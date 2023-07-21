"use client";


import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import InfiniteScroll from "react-infinite-scroll-component";

import Typewriter from "typewriter-effect";
import PostCard from "@src/components/PostCard";
import { PostProps } from "@src/types";
import Tag from "@src/components/Tag";

interface Response {
	posts: PostProps[];
	end?: boolean;
	lastCursor: number;
}

const Home = () => {

	const [posts, setPosts] = useState<PostProps[]>([]);
	const [lastCursor, setLastCursor] = useState<number | null>(null);
	const [hasMore, setHasMore] = useState(true);
	const { data: session } = useSession();

	const fetchPosts = async () => {
		try {
			const data = await axios.get("/api/trending", {
				params: {
					lastCursor: lastCursor,
				}
			});
			const typed = parseInt(data.data.lastCursor);
			const res: Response = data.data;
			res.lastCursor = typed;
			if (res.end) {
				setHasMore(false);
			}
			setLastCursor(res.lastCursor);
			setPosts([...posts, ...res.posts]);

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
			mediaUrl={null}
			likes={[]}		
		/>
	));

	return (
		<div className="w-full h-3/5 ">
			<div className="pl-6 w-1/2">
				<h1 className="text-6xl font-bold font-serif my-4 ">
					{session?.user?.username ?
						"Welcome, " + session?.user.username + "." :
						"Read on."
					}
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
				<div className="flex flex-row justify-evenly mt-12">

					<InfiniteScroll
						dataLength={posts.length}
						next={fetchPosts}
						hasMore={hasMore}
						loader={ <h1 className="font-bold text-center my-12">loading...</h1>}
						endMessage={
							<p className="font-bold text-center my-12">No more posts. Go touch some grass ...</p>
						}
						className="self-center"
					>
						<div
							className="gap-8 grid-cols-1 md:grid-cols-2 grid-flow-row grid"
						>
							{postEls}
						</div>
					</InfiniteScroll>

					<div className="sticky top-1/2 flex flex-col items-center justify-center h-full mt-10">
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
			</div>
		</div>
	);
};

export default Home;