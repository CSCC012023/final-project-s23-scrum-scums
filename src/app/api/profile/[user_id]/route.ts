// Retrieves all comments for a given post
import { NextRequest, NextResponse} from "next/server";
import prisma from "@src/lib/prisma";

// you need req imported to destructure dynamic params
export const GET = async (
	req: NextRequest,
	{ params }: { params: { user_id: string } }
) => {
	const { user_id } = params;
	const user_data = await prisma.user.findUnique({
		where: {
			id: user_id
		},
		select: {
			id: true,
			name: true,
			image: true,
			username: true,
			bio: true,
			createdAt: true,
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



// patch request to update the users bio
export const PATCH = async (
	req: NextRequest,
	{ params }: { params: { user_id: string } }
) => {
	const { user_id } = params;
	const reqJson = await req.json();
	console.log(reqJson);
	const key = Object.keys(reqJson)[0]

	const user_data = (key === "bio")
	? await prisma.user.update({
		where: {
			id: user_id
		},
		data: {
			bio: reqJson.bio
		}
	})
	: await prisma.user.update({
		where: {
			id: user_id
		},
		data: {
			name: reqJson.name
		}
	})

	return NextResponse.json(user_data);
}