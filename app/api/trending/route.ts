// Retrieves list of trending posts
import prisma  from "@lib/prisma";


export const GET = async (res: Response) => {
	// const { username, password, email } = await req.json();
	// console.log("username: " + username, "password: " + password, "email: " + email);
	const trending = await prisma.inscribe.findMany({
		include: {
			author: true,
		},
	});
	console.log(trending[0]);
	return new Response(JSON.stringify(trending), { status: 200 });
};