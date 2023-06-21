// Retrieves all comments for a given post
import { NextRequest } from "next/server";
import prisma from "@lib/prisma";

export const GET = async (
	req: NextRequest,
	{ params }: { params: { post_id: string } }
) => {
	const { post_id } = params;
	const trending = await prisma.comment.findMany({
		where: {
			inscribeId: post_id,
		}
	});
	return new Response(JSON.stringify(trending), { status: 200 });
};