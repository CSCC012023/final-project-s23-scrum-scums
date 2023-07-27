import NextAuth from "next-auth/next";
import { PostLike, CommentLike } from "@prisma/client";

declare module "next-auth" {
	/*
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			name: string;
			username: string | undefined;
			image: string | undefined;
			likes: {
				postLikes: PostLike[];
				commentLikes: CommentLike[];
			};
			id: string;
		};
	}
}
