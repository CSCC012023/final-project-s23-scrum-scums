import prisma from "@src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	const tag = req.nextUrl.searchParams.get("tag");
	if (!tag) {
		return NextResponse.json([]);
	}

	const cats = await prisma.category.findMany({
		where: {
			name: {
				startsWith: tag
			}
		},
		take: 5
	});
	return NextResponse.json(cats);
};
