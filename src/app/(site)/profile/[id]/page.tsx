"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import PostCard from "@src/components/PostCard";
import { PostData } from "@src/types";
import toast from "react-hot-toast";
import Editable from "@src/components/Editable";
import { Comment, PostLike } from "@prisma/client";
import Image from "next/image";

interface User {
	id: string;
	name: string;
	image?: string;
	password?: string;
	// postLikes: PostLike[]
	username?: string;
	bio?: string;
	createdAt: Date;
	posts: PostProps[];
	comments: Comment & { post: PostProps }[];
	postLikes: PostLike & { post: PostProps }[];
	_count: {
		followedBy: number;
	};
}

const Profile = ({ params }: { params: { id: string } }) => {
	const { id } = params;

	const [user, setUser] = useState<User>({
		id: "",
		name: "",
		createdAt: new Date(),
		posts: [],
		// @ts-ignore
		comments: [],
		// @ts-ignore
		postLikes: [],
		_count: {
			followedBy: 0
		}
	});

	const nameSubmit = async (text: string) => {
		if (text != "" && user.name != text) {
			setUser({ ...user, name: text });
		}
		await axios
			.patch(`/api/user/${id}`, {
				name: text
			})
			.then(response => {
				if (response.status === 200) {
					toast.success("Username updated");
				}
			})
			.catch(err => {
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
		await axios
			.patch(`/api/user/${id}`, {
				bio: text
			})
			.then(response => {
				if (response.status === 200) {
					toast.success("Bio updated");
				}
			})
			.catch(err => {
				console.log("patch: ", err);
				toast.error(`Something went wrong (${err.response.status})`);
			});
	};

	const getUserData = async () => {
		await axios
			.get(`/api/user/${id}`)
			.then(response => {
				const fixedDate = new Date(response.data.createdAt);
				const res: User = response.data;
				res.createdAt = fixedDate;
				console.log("res", res);
				if (!res.id) {
					toast.error("User not found");
					return;
				}

				setUser(res);
			})
			.catch(err => {
				console.log("err", err);
				toast.error(`Something went wrong (${err})`);
			});
	};

	const posts = user.posts.map((post, index) => {
		return (
			<PostCard
				key={index}
				id={post.id}
				title={post.title}
				content={post.content}
				authorId={post.authorId}
				author={post.author}
				createdAt={post.createdAt}
				categories={post.categories}
				mediaUrl={null}
				likes={[]}
			/>
		);
	});
	const posts_commented_on = user.comments.map((comment, index) => {
		return (
			<PostCard
				key={index}
				id={comment.post.id}
				title={comment.post.title}
				content={comment.post.content}
				authorId={comment.post.authorId}
				author={comment.post.author}
				createdAt={comment.post.createdAt}
				categories={comment.post.categories}
				mediaUrl={null}
				likes={[]}
			/>
		);
	});

	const posts_liked = user.postLikes.map((postLike, index) => {
		return (
			<PostCard
				key={index}
				id={postLike.post.id}
				title={postLike.post.title}
				content={postLike.post.content}
				authorId={postLike.post.authorId}
				author={postLike.post.author}
				createdAt={postLike.post.createdAt}
				categories={postLike.post.categories}
				mediaUrl={null}
				likes={[]}
			/>
		);
	});

	useEffect(() => {
		getUserData();
	}, []);

	return (
		<>
			<div className="drawer drawer-open">
				<input
					id="my-drawer"
					type="checkbox"
					className="drawer-toggle"
				/>
				<div className="drawer-content flex flex-col items-center justify-center [&>div]:my-4">
					{/* Page content here */}
					{posts}
				</div>
				<div className="drawer-side">
					<label
						htmlFor="my-drawer"
						className="drawer-overlay"
					></label>
					<ul className="menu p-4 w-80 h-full bg-base-200 text-base-content font-serif">
						{/* Sidebar content here */}
						{user && (
							<div className="w-full h-full">
								<div className="avatar h-20 w-20 self-center">
									{
										<Image
											src="/assets/icons/random_avatars/panda.png"
											fill
											alt="User avatar"
										/>
									}
								</div>
								<div className="font-semibold text-center w-full font-sans text-lg">
									{
										<Editable
											content={
												user.name
													? user.name
													: "How should we call you?"
											}
											submit={nameSubmit}
										/>
									}
								</div>
								<div className="seperator"></div>
								<div className="text-neutral-700 text-center">
									{user._count && user._count.followedBy}{" "}
									follower
									{user._count.followedBy > 0 ? "s" : ""}
								</div>
								<div className="w-full h-full mt-10">
									<b>My Bio:</b>
									{
										<Editable
											content={
												user.bio
													? user.bio
													: "Write something about yourself..."
											}
											submit={bioSubmit}
										/>
									}
								</div>
							</div>
						)}
					</ul>
				</div>
			</div>
		</>
	);
};

export default Profile;
