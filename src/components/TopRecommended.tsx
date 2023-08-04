import React from "react";
import PostCard from "@src/components/PostCard";
import { PostProps } from "@src/types";

const TopRecommendedPost = (post: PostProps) => {
    return (
        <div>
            <div className="pl-6 w-full">
                <h1 className="text-6xl font-bold font-serif my-4 ">
                    Today's Top Post
                </h1>
                <PostCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    content={post.content}
                    authorId={post.authorId}
                    author={post.author}
                    createdAt={post.createdAt}
                    categories={post.categories} 
                    mediaUrl={post.mediaUrl}
                    likes={post.likes}	
                />
            </div>
        </div>
    );
};

export default TopRecommendedPost;