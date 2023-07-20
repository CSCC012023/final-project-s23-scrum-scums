import prisma from "@src/lib/prisma";
import { getServerSession } from "next-auth/next";

interface Request {
	json: () => Promise<{
		postId: string;
		parentId?: string;
		content: string;
		categories: string[];
	}>;
}

export const POST = async (req: Request) => {
	const data = await req.json();
	const session = await getServerSession();
	if (!session) {
		return new Response(JSON.stringify({ message: "Unauthorized" }), {
			status: 401
		});
	}
	const authorId = session.user.id;
	const comment = await prisma.comment.create({
		data: {
			postId: data.postId,
			content: data.content,
			parentId: data.parentId,
			authorId: authorId,
			createdAt: new Date()
			// likes: 0,
		}
	});
	return new Response(JSON.stringify(comment), { status: 201 });
};
