// Retrieves all comments for a given post
import { NextRequest } from "next/server";
import prisma from "@lib/prisma";

export const GET = async (req: NextRequest) => {
	const id = req.nextUrl.pathname.replace("/api/comment/", "");
	const trending = await prisma.comment.findMany({
		where: {
			inscribeId: id,
		}
	});
	return new Response(JSON.stringify(trending), { status: 200 });
};