import prisma from "@lib/prisma";

export const POST = async (request: Request) => {
	const { inscribeId, content } = await request.json();
	const authorId = "46e1ce09-78e7-4d1b-ba49-8479de96ea76";
	const comment = await prisma.comment.create({
		data: {
			inscribeId: inscribeId,
			content: content,
			authorId: authorId,
			createdAt: new Date(),
			// likes: 0,
		},
	});
	return new Response(JSON.stringify(comment), { status: 201 });
};