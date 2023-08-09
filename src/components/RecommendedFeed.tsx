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

interface Response {
	posts: PostData[];
	end?: boolean;
	lastCursor: number;
}

const RecommendedFeed = () => {
	const [posts, setPosts] = useState<PostData[]>([]);
	const [topRecommended, setTopRecommended] = useState<PostData>({} as PostData);
	const [loading, setLoading] = useState(true);
	const [loadingTop, setLoadingTop] = useState(true);
	const { data: session, update } = useSession();
	const user_id = session?.user?.id as string;

    const getTopRecommended = async (recommened_posts: PostData[]) => {
        const arr = recommened_posts.map((post: PostData) => post.id);
        const result = await axios.get("/api/topRecommended", { params: { recommended: arr } });
		const recommendedPostData: PostData = result.data;
		return recommendedPostData;
	};

	useEffect(() => {
		const loadRecommended = async () => {
			const recommendedPostData = await getRecommended(user_id);
			const recTopPostData = await getTopRecommended(recommendedPostData);
			setTopRecommended(recTopPostData);
			setLoadingTop(false);
			setPosts(recommendedPostData);
			setLoading(false);
		};

		loadRecommended();
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
                <h1 className="text-6xl font-bold font-serif my-4 ">
                    Today's Top Post
                </h1>
				{loadingTop ? <PostSkeleton /> :
				<div className="flex flex-col space-y-4 w-full items-center">
					<Post
						key={topRecommended.id}
						postId={topRecommended.id}
						content={topRecommended.content}
						title={topRecommended.title}
						createdAt={topRecommended.createdAt}
						author={topRecommended.author}
						categories={topRecommended.categories}
						likes={topRecommended.likes}
						_count={topRecommended._count}
						session={session}
						update={update}
						viewerId={session?.user?.id}
					/>
				</div>
				}
				<h1 className="text-6xl font-bold font-serif my-4 ">
					You may also like:
				</h1>
				{ loading ? loader :
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
				}
			</div>
		</>
	);
};

export default RecommendedFeed;
