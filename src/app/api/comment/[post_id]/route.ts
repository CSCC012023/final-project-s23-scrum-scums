// Retrieves all comments for a given post
import { NextRequest } from "next/server";
import prisma from "@src/lib/prisma";

export const GET = async (
	req: NextRequest,
	{ params }: { params: { post_id: string } }
) => {
	const { post_id } = params;
	const comments = await prisma.comment.findMany({
		include: {
			author: true
		},
		where: {
			postId: parseInt(post_id)
		}
	});
	return new Response(JSON.stringify(comments), { status: 200 });
};
