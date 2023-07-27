// Retrieve a list of all user likes on posts
import prisma from "@src/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
	const likes = await prisma.postLike.findMany();
	return NextResponse.json(likes);
};
