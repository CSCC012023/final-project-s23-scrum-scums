import { NextRequest, NextResponse} from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { getAuthSession } from "@src/lib/auth";

export async function GET(request: NextRequest) {
	try	{
		// const session = await getServerSession();
		const session = await getAuthSession();
		const userId = request.nextUrl.searchParams.get("userId");

		// if (!session) {
		// 	return new Response(JSON.stringify({ message: "Unauthorized" }), {
		// 		status: 401
		// 	});
		// }

		const prisma = new PrismaClient();

		let query;
		// profile page
		if	(userId !== null) {
			query = await prisma.user.findUnique({
				where: {
					id: userId,
				},
				select: {
					image: true,
				}
			});
		}
		// navbar
		else{
			query = await prisma.user.findUnique({
				where: {
					email: session.user.email
				},
				select: {
					image: true,
				}
			});}

		// const user = userId !== null ? idQuery : emailQuery;
		const user = query;

		// api post man testing
		let imageUrl;
		if (user == null){
			// return new Response(JSON.stringify({ message: "Unauthorized Email" }), {status: 401});
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
		const session = await getAuthSession();
		console.log(session);
		const request = await req.json();

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