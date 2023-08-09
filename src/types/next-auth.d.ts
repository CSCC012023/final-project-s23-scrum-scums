import NextAuth from "next-auth/next";
import { PostLike, CommentLike, User } from "@prisma/client";

declare module "next-auth" {
	/*
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			id: string;
			name: string;
			email: string;
			username?: string;
			image?: string;
			createdAt: Date;
			likes: {
				postLikes: PostLike[];
				commentLikes: CommentLike[];
			};
			follows: {
				following: User[];
				followers: User[];
			};
		};
	}
}
