import type { Post, User, PostLike, Comment } from "@prisma/client";

export type PostData = Post & {
	author: User;
	categories: Category[];
	likes: PostLike[];
	_count: {
		comments: number;
	};
};

/// the response from the api follows this schema
export interface CommentTree extends Comment {
	author: Pick<
		User,
		"username" | "image" | "name" | "id" | "createdAt" | "bio"
	>;
	replies: CommentTree[];
	likes: CommentLike[];
}
