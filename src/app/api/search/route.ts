import { Post, User } from "@prisma/client";
import prisma from "@src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	try {
		let query = req.nextUrl.searchParams.get("q");
		query = query ? query.replace(/ /g, "|") : query;
		if (!query) {
			return NextResponse.json({
				posts: [],
				users: [], 
			});
		}

		const posts: Array<Post & { author: User }> =
			await prisma.post.findMany({
				where: {
					OR: [
						{
							content: {
								search: query,
								mode: "insensitive"
							}
						},
						{
							title: {
								search: query,
								mode: "insensitive"
							}
						},
						{
							categories: {
								some: {
									name: {
										search: query,
										mode: "insensitive"
									}
								}
							}
						},
						{
							author: {
								username: {
									search: query,
									mode: "insensitive"
								}
							}
						}
					]
				},
				include: {
					author: true
				}
			});

		const users: Array<Post & { author: User }> =
			await prisma.post.findMany({
				where: {
					OR: [
						{
							author: {
								username: {
									search: query,
									mode: "insensitive"
								}
							}
						}
					]
				},
				include: {
					author: true
				},
				distinct: ["authorId"],
			});

		await prisma.searchQuery.create({
			data: {
				query
			}
		});

		return NextResponse.json({posts, users});
	} 
	
	catch (error: any) {
		console.log(error);
		return NextResponse.error();
	}
};
