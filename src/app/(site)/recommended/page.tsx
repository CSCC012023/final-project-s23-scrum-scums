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
    const { data: session } = useSession();
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
        // // User has no likes
        // if (session && !users.includes(session.user.id))
        //     userlikes.push(Array(num_posts).fill(0));

        var arr: string[] = [];
        for (var user of userlikes) {
            arr.push(user.toString());
        }
        getRecommendedPosts(arr, num_posts, users);
    };

    
    const getRecommendedPosts = async (userlikes: string[], num_posts: number, users: string[]) => {
        const userId = users.indexOf("clkbzs1r20002ttxk3shygx9j")
        const params = {
            recommended: userlikes,
            user_id: userId,
            numPosts: num_posts
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
            {loading ? <h1 className="font-bold text-center">loading...</h1> :
            <div className="grid grid-cols-2 grid-flow-row gap-6">
                {postEls}
            </div> }
        </div>
    );
}

export default Recommended;