import { Post, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		try {
			const { q: query } = req.query;

			if (typeof query !== "string") {
				throw new Error("Invalid request");
			}

			const posts: Array<Post & { author: User }> = await prisma.post.findMany({
				where: {
					OR: [
						{
							content: {
								contains: query,
								mode: "insensitive",
							},
						},
						{
							title: {
								contains: query,
								mode: "insensitive",
							},
						},
						{
							categories: {
								some: {
									name: {
										contains: query,
										mode: "insensitive",
									},
								},
								
							},
						},
					],
				},
				include: {
					author: true,
				},
			});

			await prisma.searchQuery.create({
				data: {
					query,
				},
			});

			res.status(200).json({ posts });
		} catch (error: any) {
			console.log(error);
			res.status(500).end();
		}
	}
}
