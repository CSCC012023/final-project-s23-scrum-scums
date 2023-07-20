import { Post, User } from "@prisma/client";
import prisma from "@src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	try {
		const query = req.nextUrl.searchParams.get("q");
		if (!query) {
			return NextResponse.json({
				posts: []
			});
		}

		const posts: Array<Post & { author: User }> =
			await prisma.post.findMany({
				where: {
					OR: [
						{
							content: {
								contains: query,
								mode: "insensitive"
							}
						},
						{
							title: {
								contains: query,
								mode: "insensitive"
							}
						},
						{
							categories: {
								some: {
									name: {
										contains: query,
										mode: "insensitive"
									}
								}
							}
						}
					]
				},
				include: {
					author: true
				}
			});

		await prisma.searchQuery.create({
			data: {
				query
			}
		});

		return NextResponse.json({
			posts
		});
	} catch (error: any) {
		console.log(error);
		return NextResponse.error();
	}
};
