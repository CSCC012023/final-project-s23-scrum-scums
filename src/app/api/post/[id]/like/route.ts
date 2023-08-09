import { NextRequest, NextResponse } from "next/server";
import prisma from "@src/lib/prisma";

interface Body {
	userId: string;
	isLiked: boolean;
}
export const POST = async (
	req: NextRequest,
	{ params }: { params: { id: string } }
) => {
	const id = parseInt(params.id);
	const data: Body = await req.json();
	const userId = data.userId;
	const liked = data.isLiked;
	// console.log("liked", liked)
	// console.log("userid", userId);
	// console.log("id", id);
	let likes;
	if (liked) {
		likes = await prisma.post.update({
			where: {
				id: id
			},
			data: {
				likes: {
					create: {
						userId: userId
					}
				}
			},
			select: {
				likes: true
			}
		});
	} else {
		likes = await prisma.post.update({
			where: {
				id: id
			},
			data: {
				likes: {
					delete: {
						userId_postId: {
							userId: userId,
							postId: id
						}
					}
				}
			},
			select: {
				likes: true
			}
		});
	}

	// console.log("likes", likes);
	return NextResponse.json(likes);
};
