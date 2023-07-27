import { NextRequest, NextResponse } from "next/server";
import prisma from "@src/lib/prisma";

// you need req imported to destructure dynamic params
export const GET = async (
	req: NextRequest,
	{ params }: { params: { id: string } }
) => {
	const { id } = params;
	const user_data = await prisma.user.findUnique({
		where: {
			id: id
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
	{ params }: { params: { id: string } }
) => {
	const { id } = params;
	const reqJson = await req.json();
	console.log(reqJson);
	const key = Object.keys(reqJson)[0];

	let user_data;
	if (key === "bio") {
		user_data = await prisma.user.update({
			where: {
				id: id
			},
			data: {
				bio: reqJson.bio
			}
		});
	} else {
		user_data = await prisma.user.update({
			where: {
				id: id
			},
			data: {
				name: reqJson.name
			}
		});
	}

	return NextResponse.json(user_data);
};
