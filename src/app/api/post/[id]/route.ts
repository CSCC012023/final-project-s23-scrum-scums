// Query a specific inscribe for comments
import prisma from "@src/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (
	req: Request,
	{ params }: { params: { id: string } }
) => {
	const id = params.id;
	const trending = await prisma.post.findUnique({
		where: {
			id: parseInt(id)
		},
		include: {
			author: true
		}
	});
	return NextResponse.json(trending);
};
