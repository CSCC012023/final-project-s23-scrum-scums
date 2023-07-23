import type { Post, User, PostLike } from "@prisma/client";

export type PostData = Post & {
	author: User;
	categories: Category[];
	likes: PostLike[];
	_count: {
		comments: number;
	};
};
