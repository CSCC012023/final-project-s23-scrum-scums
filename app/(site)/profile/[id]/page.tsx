"use client";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import PostCard from "@components/PostCard";
import { PostProps } from "@components/PostCard";
import toast from "react-hot-toast";

interface User {
    comments: Comment[]
    email: string
    emailVerified: string
    id: string
    image: string
    name: string
    password: string
    // postLikes: PostLike[]
    // posts: Post[]
    username?: string
    _count: {}
}

const Profile = ({ params }: { params: { id: string } }) => {
	const { id } = params;
	
	const [user, setUser] = useState<User>();

	let posts: React.FC<PostProps> = <> </>;

	const getUserData = async () => {
		await axios.get(`/api/profile/${id}`)
			.then((response) => {
				const dateFixed = response.data;
				dateFixed.emailVerified = new Date(response.data.emailVerified);
				setUser(dateFixed);
				posts = user.posts.map((post, index) => {
					<PostCard
						key={index}
						id={post.id}
						title={post.title}
						content={post.content}
						authorId={post.authorId}
						// author={post.author}
						createdAt={post.createdAt}
						// categories={post.categories}
					/>;
				});
				console.log("posts: ", posts);
				console.log("user: ", user);
			})
			.catch((err) => {
				console.log("err", err.response);
				toast.error(`Something went wrong (${err.response.status})`);
			});
	};

	useEffect(() => {
		getUserData();
	}, []);
	
	return (
		<div className="drawer drawer-open">
			<input id="my-drawer" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col items-center justify-center">
				{/* Page content here */}
				{ user ? {posts} 
					:
					<div className="text-cent font-semibold">loading...</div>
				}
			</div> 
			<div className="drawer-side">
				<label htmlFor="my-drawer" className="drawer-overlay"></label> 
				<ul className="menu p-4 w-80 h-full bg-base-200 text-base-content font-serif">
					{/* Sidebar content here */}
					{ user &&
						<div className="w-full h-full">
							<div className="avatar h-20 w-20">
								{}
							</div>
							<div className="font-semibold text-center w-full">
								{user.name && user.name}
							</div>
							<div className="seperator"></div>
							<div className="text-neutral-700">
								{user._count && user._count.followedBy} followers
							</div>
						</div> 
					}
				</ul>
			</div>
		</div>
	);
};

export default Profile;