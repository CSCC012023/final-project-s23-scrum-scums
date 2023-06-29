// Query a specific inscribe for comments
import prisma from "@lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
	req: NextRequest,
	{ params }: { params: { id: string } }
) => {
	const { id } = params;
	const trending = await prisma.inscribe.findUnique({
		where: {
			id: id,
		},
		include: {
			author: true,
		},
	});
	return NextResponse.json(trending);
};