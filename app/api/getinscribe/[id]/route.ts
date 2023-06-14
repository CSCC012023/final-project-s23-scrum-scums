// Query a specific inscribe for comments
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
	const id = req.nextUrl.pathname.replace("/api/getinscribe/", "");
	const trending = await prisma.inscribe.findMany({
		where: {
			id: id,
		}
	});
	return new Response(JSON.stringify(trending), { status: 200 });
};