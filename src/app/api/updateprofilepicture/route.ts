import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

type Data = {
	id: string;
	name: string | null;
	email: string | null;
	emailVerified: Date | null;
	password: string | null;
	image: string | null;
	username: string | null;
	bio: string | null;
	createdAt: Date;
};


export const GET = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const post = await	prisma.user.update({
		where: {
			id: "clkx2g4210000w9zwtazihmgu"
		},
		data: {
			image: "https://utfs.io/f/850aac60-2d2b-464c-b92e-f2dde0281104_mononoke2.jpg"
		}
	});
	JSON.stringify(post);
};