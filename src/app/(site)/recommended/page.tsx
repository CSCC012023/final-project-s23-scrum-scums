"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { PostProps } from "@src/types";
import PostCard from "@src/components/PostCard";
import getRecommended from "@src/utils/recommended";
import TopRecommendedPost from "@src/components/TopRecommended";

interface PostLikeProps {
    postId: number,
    userId: string
}

const Recommended = () => {
    const user_id = useSession().data?.user?.id as string;
    const [posts, setPosts] = useState<PostProps[]>([]);
    const [topRecommendedPost, setTopRecommended] = useState<PostProps>({} as PostProps);
    const [loading, setLoading] = useState(true);
    const [likedAll, setLikedAll] = useState(false);
    
    const getRecommendedPosts = async (recommened_posts: PostProps[]) => {
        if (recommened_posts.length === 0) {
            setLikedAll(true);
            setPosts(recommened_posts);
        }
        else {
            setPosts(recommened_posts);
        }
    };

    const getTopRecommended = async (recommened_posts: PostProps[]) => {
        const arr = recommened_posts.map((post: PostProps) => post.id);
        const result = await axios.get("/api/topRecommended", { params: { recommended: arr } });
		const recommendedPostData: PostProps = result.data;
        console.log("getTOp" ,recommendedPostData  );
		setTopRecommended(recommendedPostData);
	};

    useEffect(() => {
        console.log("user_id", user_id);
        const loadRecommended = async () => {
            const recommened_posts: PostProps[] = await getRecommended(user_id);
            await getTopRecommended(recommened_posts);
            await getRecommendedPosts(recommened_posts);
            setLoading(false);
        };

        loadRecommended();
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
            likes={post.likes}
            mediaUrl={post.mediaUrl}
        />
    ));

    return (
        <div>
            <div className="pl-6 w-1/2">
				<h1 className="text-6xl font-bold font-serif my-4 ">
					Recommended
				</h1>
			</div>
            <div className="flex flex-row justify-evenly mt-12">
            {loading ? <div></div> :
                <TopRecommendedPost
                    id={topRecommendedPost?.id}
                    title={topRecommendedPost?.title}
                    content={topRecommendedPost?.content}
                    authorId={topRecommendedPost?.authorId}
                    author={topRecommendedPost?.author}
                    createdAt={topRecommendedPost?.createdAt}
                    categories={topRecommendedPost?.categories}
                    mediaUrl={topRecommendedPost?.mediaUrl}
                    likes={topRecommendedPost?.likes}
                />
            }
            </div>
			<div className="divider">
            </div>
            <div className="h-full w-full"> 
                {loading ? <h1 className="font-bold text-center">loading...</h1> :
                likedAll ? <h1 className="font-bold text-center">You have liked all the posts!</h1> :
                <div>
                    <h1 className="text-6xl font-bold font-serif my-4 ">
                        You may also like:
                    </h1>
                    <div className="grid grid-cols-2 grid-flow-row gap-6">
                        {postEls}
                    </div>
                </div>
                }
            </div>
        </div>
    );
}

export default Recommended;