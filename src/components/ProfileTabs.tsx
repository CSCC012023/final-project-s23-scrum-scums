"use client";
import { PostData } from "@src/types";
import { Comment, PostLike } from "@prisma/client";
import React from "react";
import { FC } from "react";
import { useSession } from "next-auth/react";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from "@src/components/ui/tabs";
import Post from "@src/components/Post";
interface ProfileTabsProps {
	posts: PostData[];
	comments: Comment & { post: PostData }[];
	postLikes: PostLike & { post: PostData }[];
}

const ProfileTabs: FC<ProfileTabsProps> = ({ posts, comments, postLikes }) => {
	const { data: session, update } = useSession();

	return (
		<div className="w-full h-full container flex flex-col items-center justify-center">
			<Tabs defaultValue="posts">
				<TabsList>
					<TabsTrigger value="posts">Posts</TabsTrigger>
					<TabsTrigger value="comments">Comments</TabsTrigger>
					<TabsTrigger value="likes">Likes</TabsTrigger>
				</TabsList>
				<TabsContent value="posts">
					{posts.map((post, index) => {
						return (
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
						);
					})}
				</TabsContent>
				<TabsContent value="comments">
					{comments.map((comment, index) => {
						return (
							<Post
								key={index}
								postId={comment.post.id}
								content={comment.post.content}
								title={comment.post.title}
								createdAt={comment.post.createdAt}
								author={comment.post.author}
								categories={comment.post.categories}
								likes={comment.post.likes}
								_count={comment.post._count}
								session={session}
								update={update}
								viewerId={session?.user?.id}
							/>
						);
					})}
				</TabsContent>
				<TabsContent value="likes">
					{postLikes.map((like, index) => {
						return (
							<Post
								key={index}
								postId={like.post.id}
								content={like.post.content}
								title={like.post.title}
								createdAt={like.post.createdAt}
								author={like.post.author}
								categories={like.post.categories}
								likes={like.post.likes}
								_count={like.post._count}
								session={session}
								update={update}
								viewerId={session?.user?.id}
							/>
						);
					})}
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default ProfileTabs;
