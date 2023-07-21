import { NextRequest, NextResponse } from "next/server";
import prisma from "@src/lib/prisma";

interface body {
	[userId: string]: string;
}
export const POST = async (req: NextRequest, 
	{ params }: { params: { id: string } }) => {
	const id = parseInt(params.id);
	const data: body = await req.json();
	const userId = data.userId;
	const liked = data.isLiked;
	console.log("liked", liked)
	console.log("userid", userId);
	console.log("id", id);

	const likes = liked
		? await prisma.post.update({	
		where: { 
			id: id 
		},
		data: {
			likes: {
				create: {
					userId: userId
				}
			},
		},
		select: {
			likes: true
		}
	})
	: await prisma.postLike.delete({
		where: {
			userId_postId: {
				userId: userId,
				postId: id
			}
		}
	});

	// console.log("likes", likes);	
	return NextResponse.json(likes);
}