// Retrieves all comments for a given post
import { NextRequest, NextResponse} from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";



// reference to the user's profile picture
export async function GET(request: NextRequest) {
	try	{
		const session = await getServerSession();

		if (!session) {
			return new Response(JSON.stringify({ message: "Unauthorized" }), {
				status: 401
			});
		}

		const prisma = new PrismaClient();
		const user = await prisma.user.findUnique({
			where: {
				email: session.user.email
			},
			select: {
				image: true,
			}
		});

		let imageUrl;
		if (user == null){
			return new Response(JSON.stringify({ message: "Unauthorized Email" }), {status: 401});
		}
		else if (user.image == null) {
			imageUrl = "/assets/icons/random_avatars/panda.png";
		}
		else {
			imageUrl = user.image;
		}

		return	NextResponse.json({message: imageUrl}, {status: 200});
	}
	catch (e) {
		return	NextResponse.json({message: "error", e});
	}
}

export	async function PATCH(req: NextRequest) {
	try	{
		const session = await getServerSession();
		const request = await req.json();
		console.log("hello");
		console.log(request);
		console.log(request.imageUrl);

		if (!session) {
			return new Response(JSON.stringify({ message: "Unauthorized" }), {status: 401});
		}
		
		const prisma = new PrismaClient();
		const	user = await prisma.user.update({
			where: {
				email: session.user.email
			},
			data: {
				image: request.imageUrl,
			}
		});
		return	NextResponse.json({message: user.image}, {status: 200});
	}
	catch (e) {
		return	NextResponse.json({message: "error", e});
	}
}