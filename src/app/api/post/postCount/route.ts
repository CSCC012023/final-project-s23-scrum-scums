// Retrieve the number of posts that have been liked by a user
import prisma from "@src/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
	const num_posts = await prisma.post.aggregate({
		_count: {
			id: true
		}
	});
	return NextResponse.json(num_posts._count.id);
};
