"use client";

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Post from "@src/components/Post";
import { PostData } from "@src/types";
import PostSkeleton from "./PostSkeleton";
import { useSession } from "next-auth/react";
import getRecommended from "@src/utils/recommended";
import { set } from "date-fns";
import InfiniteScroll from "react-infinite-scroll-component";

interface Response {
	posts: PostData[];
	end?: boolean;
	lastCursor: number;
}

const RecommendedFeed = () => {
	const [posts, setPosts] = useState<PostData[]>([]);
	const [loadingTop, setLoadingTop] = useState(true);
	const [topRecommended, setTopRecommended] = useState<PostData>({} as PostData);
	const [lastCursor, setLastCursor] = useState<number | null>(null);
	const [hasMore, setHasMore] = useState(true);
	const { data: session, update } = useSession();

	const fetchPosts = async () => {
		try {
			const data = await axios.get("/api/trending", {
				params: {
					lastCursor: lastCursor
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
			setTopRecommended(posts[0]);
			setLoadingTop(false);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const loader = (
		<div className="flex flex-col space-y-4 w-full mt-4">
			<PostSkeleton />
			<PostSkeleton />
			<PostSkeleton />
			<PostSkeleton />
		</div>
	);

	return (
		<>	
            <div className="pl-6 w-full">
					<InfiniteScroll
						dataLength={posts.length}
						next={fetchPosts}
						hasMore={hasMore}
						loader={loader}
						endMessage={
							<p className="font-bold text-center my-12">
								No more posts. Go touch some grass ...
							</p>
						}
						className="self-center w-full h-full container flex flex-col justify-center items-center"
						>
						<div className="flex flex-col space-y-4 w-full items-center">
							{posts.map((post, index) => (
								<Post
								key={index}
								postId={post.id}
								content={post.content}
								title={post.title}
								createdAt={post.createdAt}
								author={post.author}
								categories={post.categories}
								likes={post.likes}
								_count={post._count}
								session={session}
								update={update}
								viewerId={session?.user?.id}
								/>
								))}
						</div>
					</InfiniteScroll>
				</div>			
			</>
	);
};

export default RecommendedFeed;
