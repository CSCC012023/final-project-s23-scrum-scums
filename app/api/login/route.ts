import prisma  from "@lib/prisma";
import { NextRequest } from "next/server";
// import { stringify } from "querystring";


export const GET = async (req: NextRequest) => {
	// const { email, password } = await req.json();
	const email = req.nextUrl.searchParams.get("email");
	const password = req.nextUrl.searchParams.get("password");
	console.log("email: " + email, "password: " + password);
	let user = null;
	if (email != null) {
		user = await prisma.user.findUnique({
			where: {
				email: email
			}
		});
	}
	console.log(JSON.stringify(null));
	return new Response(JSON.stringify(user), { status: 200 });
};