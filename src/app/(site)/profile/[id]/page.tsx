// "use client";
// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import PostCard from "@src/components/PostCard";
// import { PostData } from "@src/types";
// import Editable from "@src/components/Editable";
// import { Comment, PostLike } from "@prisma/client";
// import UserProfile from "@src/components/UserProfile";

// interface User {
// 	id: string;
// 	name: string;
// 	image?: string;
// 	password?: string;
// 	// postLikes: PostLike[]
// 	username?: string;
// 	bio?: string;
// 	createdAt: Date;
// 	posts: PostProps[];
// 	comments: Comment & { post: PostProps }[];
// 	postLikes: PostLike & { post: PostProps }[];
// 	_count: {
// 		followedBy: number;
// 	};
// }

// const getUserData = async (id: number) => {
// 	await axios.get(`/api/user/${id}`).then(response => {
// 		const fixedDate = new Date(response.data.createdAt);
// 		const res: User = response.data;
// 		res.createdAt = fixedDate;

// 		return res;
// 	});
// };

// const Profile = async ({ params }: { params: { id: string } }) => {
// 	const { id } = params;
// 	const userData = await getUserData(parseInt(id));

// 	const posts = userData.posts.map((post, index) => {
// 		return (
// 			<PostCard
// 				key={index}
// 				id={post.id}
// 				title={post.title}
// 				content={post.content}
// 				authorId={post.authorId}
// 				author={post.author}
// 				createdAt={post.createdAt}
// 				categories={post.categories}
// 				mediaUrl={null}
// 				likes={[]}
// 			/>
// 		);
// 	});
// 	const posts_commented_on = userData.comments.map((comment, index) => {
// 		return (
// 			<PostCard
// 				key={index}
// 				id={comment.post.id}
// 				title={comment.post.title}
// 				content={comment.post.content}
// 				authorId={comment.post.authorId}
// 				author={comment.post.author}
// 				createdAt={comment.post.createdAt}
// 				categories={comment.post.categories}
// 				mediaUrl={null}
// 				likes={[]}
// 			/>
// 		);
// 	});

// 	const posts_liked = userData.postLikes.map((postLike, index) => {
// 		return (
// 			<PostCard
// 				key={index}
// 				id={postLike.post.id}
// 				title={postLike.post.title}
// 				content={postLike.post.content}
// 				authorId={postLike.post.authorId}
// 				author={postLike.post.author}
// 				createdAt={postLike.post.createdAt}
// 				categories={postLike.post.categories}
// 				mediaUrl={null}
// 				likes={[]}
// 			/>
// 		);
// 	});

// 	useEffect(() => {
// 		getUserData(parseInt(id));
// 	}, []);

// 	const user = {
// 		id: userData.id,
// 		name: userData.name,
// 		image: userData.image,
// 		username: userData.username,
// 		createdAt: userData.createdAt
// 	};
// 	const profile = {
// 		user: user,
// 		_count: {
// 			followedBy: userData._count.followedBy
// 		}
// 	};

// 	return (
// 		<>
// 			<div className="flex flex-col w-full h-full container">
// 				<UserProfile profile={profile} />
// 				<div className="flex flex-col items-center justify-center [&>div]:my-4">
// 					{/* Page content here */}
// 					{posts}
// 				</div>
// 			</div>
// 		</>
// 	);
// };

// export default Profile;
