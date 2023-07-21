import type { Post, User } from '@prisma/client';

export type PostProps = Post & {
    author:    	User,
    categories: Category[],
    likes:     	Like[],
}

export interface Category {
    id:   string,
    name: string
}

export interface Like {
    postId: number,
    userId: string,
}