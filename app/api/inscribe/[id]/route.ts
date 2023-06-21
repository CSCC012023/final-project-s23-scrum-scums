// Query a specific inscribe for comments
import prisma from "@lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	const id = req.nextUrl.pathname.replace("/api/inscribe/", "");
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