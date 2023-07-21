// Retrieves all comments for a given post
import { NextRequest, NextResponse } from "next/server";
import prisma from "@src/lib/prisma";

export const GET = async (
	req: NextRequest,
	{ params }: { params: { user_id: string } }
) => {
	const { user_id } = params;
	const user_data = await prisma.user.findUnique({
		where: {
			id: user_id
		},
		include: {
			comments: {
				include: {
					post: {
						include: {
							categories: true,
							likes: true
						}
					}
				},
				orderBy: {
					createdAt: "desc"
				}
			},
			posts: {
				orderBy: {
					createdAt: "desc"
				},
				include: {
					categories: true,
					likes: true
				}
			},
			postLikes: {
				include: {
					post: {
						include: {
							categories: true,
							likes: true
						}
					}
				}
			},
			_count: {
				select: {
					followedBy: true
				}
			}
		}
	});

	return NextResponse.json(user_data);
};
