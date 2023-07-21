"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { PostProps } from "@src/components/PostCard";
import PostCard from "@src/components/PostCard";

interface PostLikeProps {
    postId: number,
    userId: string
}

const Recommended = () => {
    const user_id = useSession().data?.user?.id as string;
    const [posts, setPosts] = useState<PostProps[]>([]);
    const [loading, setLoading] = useState(true);

    const getPostLikes = async () => {
        const result = await axios.get("/api/postlike")
        const num_posts = await axios.get("/api/postlike/postCount")
        const num_users = await axios.get("/api/postlike/userCount")
        makeRecommended(result.data, num_posts.data, num_users.data);
    };

    const makeRecommended = (likes: PostLikeProps[], num_posts: number, num_users: number) => {
        var userlikes = Array.from(Array(num_users), _ => Array(num_posts).fill(0));
        var users: string[] = [];
        for (const like of likes) {
            if (!users.includes(like.userId)) {
                users.push(like.userId);
            }
            userlikes[users.indexOf(like.userId)][like.postId - 1] = 1;
        }

        // User has not liked a post
        if (users.indexOf(user_id) === -1) {
            userlikes.push(Array(num_posts).fill(0));
            users.push(user_id);
        }
        
        var arr: string[] = [];
        for (var user of userlikes) {
            arr.push(user.toString());
        }
        getRecommendedPosts(arr, users);
    };

    
    const getRecommendedPosts = async (userlikes: string[], users: string[]) => {
        const userId = users.indexOf(user_id)
        const params = {
            recommended: userlikes,
            user_id: userId,
        }
        const result = await axios.get("/api/recommended", { params: params });
        setPosts(result.data);
        setLoading(false);
    };

    useEffect(() => {
        getPostLikes();
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
        />
    ));

    return (
        <div>
            <div className="pl-6 w-1/2">
				<h1 className="text-6xl font-bold font-serif my-4 ">
					Recommended
				</h1>
			</div>
			<div className="divider">
			</div>
            {loading ? <h1 className="font-bold text-center">loading...</h1> :
            <div className="grid grid-cols-2 grid-flow-row gap-6">
                {postEls}
            </div> }
        </div>
    );
}

export default Recommended;