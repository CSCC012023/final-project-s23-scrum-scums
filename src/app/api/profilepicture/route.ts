// Retrieves all comments for a given post
import { NextRequest, NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client";


// reference to the user's profile picture
export const GET = async (req: NextRequest,{ params }: { params: { user_id: string } }) => {
	const { user_id } = params;
	const prisma = new PrismaClient();
	
	const user_data = await prisma.user.findUnique({
		where: {
			id: user_id
		},
		select: {
			image: true,
		}
	});
	console.log(user_data);
	console.log("hello");
	return NextResponse.json(user_data);
};

// update to	the user's profile picture
// export const PATCH = async (req: NextRequest, { params }: { params: { user_id: string } }) => {
// 	const { user_id } = params;
// 	const reqJson = await req.json();
// 	console.log(reqJson);
// 	const key = Object.keys(reqJson)[0];

// 	const user_data = (key === "bio")
// 		? await prisma.user.update({
// 			where: {
// 				id: user_id
// 			},
// 			data: {
// 				bio: reqJson.bio
// 			}
// 		})
// 		: await prisma.user.update({
// 			where: {
// 				id: user_id
// 			},
// 			data: {
// 				name: reqJson.name
// 			}
// 		});
// 	return NextResponse.json(user_data);
// };