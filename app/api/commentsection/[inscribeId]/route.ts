// Retrieves all comments for a given post
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";


const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
	const id = req.nextUrl.pathname.replace("/api/commentsection/", "");
	const trending = await prisma.comment.findMany({
        where: {
            inscribeId: id,
        }
	});
	return new Response(JSON.stringify(trending), { status: 200 });
};