// Retrieves list of trending posts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (res: Response) => {
	// const { username, password, email } = await req.json();
	// console.log("username: " + username, "password: " + password, "email: " + email);
	const trending = await prisma.inscribe.findMany({
		include: {
			author: true,
		},
	});
	return new Response(JSON.stringify(trending), { status: 200 });
};