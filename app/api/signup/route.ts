import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
	const { username, password, email } = await req.json();
	console.log("username: " + username, "password: " + password, "email: " + email);
	const user = await prisma.user.create({
		data: {
			username: username,
			email: email,
			password: password,     // TODO: encrypt password
			followers: 0,
		},
	});
	return new Response(JSON.stringify(user), { status: 201 });
};