// Retrieves all comments for a given post
import { NextRequest, NextResponse } from "next/server";
import prisma from "@lib/prisma";

export const GET = async (
	req: NextRequest,
	{ params }: { params: { user_id: string } }
) => {
	const { user_id } = params;
	const user_data = await prisma.user.findUnique({
		where: {
			id: user_id
		},
		include: {
			comments: {
				include: {
					post: true
				},
				orderBy: {
					createdAt: "desc"
				}
			},
			posts: {
				orderBy: {
					createdAt: "desc"
				}
			},
			postLikes: {
				include: {
					post: true
				},
			},
			_count: {
				select: { 
					followedBy: true,
				},
			},
		},
	});

	console.log("up", user_data?.posts);

	return NextResponse.json(user_data);
};