import prisma from "@lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
interface Request {
	json: () => Promise<{
		email: string;
		name: string;
		password: string;
	}>;
}


export const POST = async (req: Request) => {
	const data = await req.json();

	// check if email is already used
	const existingUser = await prisma.user.findUnique({
		where: {
			email: data.email
		}
	});
	if (existingUser) {
		return NextResponse.json({
			error: "Email already in use"
		});
	}


	const hashedPassword = await bcrypt.hash(data.password, 12);

	const newUser = await prisma.user.create({
		data: {
			email: data.email,
			name: data.name,
			password: hashedPassword
		},
	});
	return NextResponse.json(newUser);
};