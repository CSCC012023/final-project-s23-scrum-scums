import { NextRequest, NextResponse } from "next/server";
import prisma from "@src/lib/prisma";

export const GET = async (
	req: NextRequest,
	{ params }: { params: { id: string } }
) => {
	const { id } = params;
	const friends = await prisma.user.findUnique({
		where: {
			id
		},
		include: {
			followedBy: true,
			following: true
		}
	});
	return NextResponse.json(friends);
};

interface Body {
	/// the id of the person following the id in the path
	userId: string;
}

export const POST = async (
	req: NextRequest,
	{ params }: { params: { id: string } }
) => {
	const { id } = params;
	if (!req.body) return NextResponse.json({ error: "no body" });
	const { userId }: Body = await req.json();
	const user = await prisma.user.update({
		where: {
			id: userId
		},
		data: {
			following: {
				connect: {
					id
				}
			}
		}
	});
	return NextResponse.json(user);
};
