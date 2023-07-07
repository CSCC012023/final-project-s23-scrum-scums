// Retrieves list of trending posts
import prisma  from "@lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/*
* Takes 1 parameter, page number
* returns pages of posts, 6 per page
*/


export const GET = async (req: NextRequest) => {
	if (req.nextUrl.searchParams.get("page") === null) {
		req.nextUrl.searchParams.append("page", "1");
	}
	const page: number = parseInt(req.nextUrl.searchParams.get("page") as string) ;

	const numberOfPosts = 6;
	function amountToSkip(pageNumber: number) {
		return pageNumber * numberOfPosts;
	}

	const trending = await prisma.post.findMany({
		take: numberOfPosts,
		skip: amountToSkip(page),
		include: {
			author: true,
			categories: true,
			likes: true,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
	// if less than 6 posts return those and add json value of "end"
	if (trending.length < numberOfPosts) {
		const data = {
			posts: trending,
			end: true,
		};
		return NextResponse.json(data);
	}
	return NextResponse.json({ posts: trending });
};