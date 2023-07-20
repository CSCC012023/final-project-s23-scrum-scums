"use client";
import axios from "axios";
import React, { useState, useRef } from "react";
import { useEffect } from "react";
import PostCard from "@src/components/PostCard";
import { PostProps } from "@src/components/PostCard";
import toast from "react-hot-toast";
import Editable from "@src/components/Editable";

interface User {
	id: string
    name: string
    image?: string
    username?: string
	bio?: string
	createdAt: Date
    posts: PostProps[]
    comments: Comment[]
    // postLikes: PostLike[]
    _count: {
		followedBy: number
	}
}

const Profile = ({ params }: { params: { id: string } }) => {
	const { id } = params;

	const [user, setUser] = useState<User>({
		id: "",
		name: "",
		createdAt: new Date(),
		posts: [],
		comments: [],
		_count: {
			followedBy: 0
		},
	});

	const nameSubmit = async (text: string) => {
		if (text != "" && user.name != text) {
			setUser({ ...user, name: text });
		}
		await axios.patch(`/api/profile/${id}`, {
			name: text
		})
		.then((response) => {
			if (response.status === 200) {
				toast.success("Username updated");
			}
		})
		.catch((err) => {
			console.log("patch: ", err);
			toast.error(`Something went wrong (${err.response.status})`);
		});
	};

	const bioSubmit = async (text: string) => {
		// This is a temporary fix
		// See route.ts in profile for more info
		if (user.bio != text) {
			setUser({ ...user, bio: text });
		}
		await axios.patch(`/api/profile/${id}`, {
			bio: text
		})
		.then((response) => {
			if (response.status === 200) {
				toast.success("Bio updated");
			}
		})
		.catch((err) => {
			console.log("patch: ", err);
			toast.error(`Something went wrong (${err.response.status})`);
		});
	};


	let posts: React.JSX.Element[] = [];

	const getUserData = async () => {
		await axios.get(`/api/profile/${id}`)
			.then((response) => {
				const res: User = response.data;
				if (!res.id) {
					toast.error("User not found");
					return;
				}

				setUser(res);
				posts = user.posts.map((post, index) => {
					return <PostCard
						key={index}
						id={post.id}
						title={post.title}
						content={post.content}
						authorId={post.authorId}
						author={post.author}
						createdAt={post.createdAt}
						categories={post.categories}
					/>;
				});
			})
			.catch((err) => {
				console.log("err", err);
				toast.error(`Something went wrong (${err})`);
			});
	};

	useEffect(() => {
		getUserData();
	}, []);

	return (
		<>
			<div className="drawer drawer-open">
				<input id="my-drawer" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content flex flex-col items-center justify-center">
					{/* Page content here */}
					{ posts
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
							<div className="font-semibold text-center w-full font-sans">
								{<Editable
									content={user.name ? user.name : "How should we call you?"}
									submit={nameSubmit}
								/>}
							</div>
							<div className="seperator"></div>
							<div className="text-neutral-700">
								{user._count && user._count.followedBy} followers
							</div>
							<div className="w-full h-full">
								{<Editable
									content={user.bio ? user.bio : "Add a bio..."}
									submit={bioSubmit}
								/>}
							</div>
						</div>
						}
					</ul>
				</div>
			</div>
		</>
	);
};

export default Profile;