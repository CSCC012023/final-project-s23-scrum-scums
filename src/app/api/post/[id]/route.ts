import prisma from "@src/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (
	req: Request,
	{ params }: { params: { id: string } }
) => {
	const id = parseInt(params.id);
	const post = await prisma.post.findUnique({
		where: {
			id: id
		},
		include: {
			author: true,
			categories: true,
			likes: true,
			_count: {
				select: {
					comments: true
				}
			}
		}
	});
	return NextResponse.json(post);
};
