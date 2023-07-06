// Query a specific inscribe for comments
import prisma from "@lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (
	{ params }: { params: { id: string } }
) => {
	const { id } = params;
	const trending = await prisma.post.findUnique({
		where: {
			id: id,
		},
		include: {
			author: true,
		},
	});
	return NextResponse.json(trending);
};