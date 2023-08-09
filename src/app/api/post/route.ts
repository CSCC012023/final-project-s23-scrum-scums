import prisma from "@src/lib/prisma";

interface Request {
	json: () => Promise<{
		title: string;
		content: string;
		cats: string[];
		authorId: string;
	}>;
}

export const POST = async (req: Request) => {
	const { title, content, cats, authorId } = await req.json();

	const post = await prisma.post.create({
		data: {
			title: title,
			content: content,
			createdAt: new Date(),
			categories: {
				connectOrCreate: cats.map(category => ({
					where: { name: category },
					create: { name: category }
				}))
			},
			author: {
				connect: { id: authorId }
			}
			// likes: 0,
		}
	});
	return new Response(JSON.stringify(post), { status: 201 });
};

export const GET = async () => {
	const post = await prisma.post.findMany({
		include: {
			author: true,
			categories: true,
			likes: true
		}
	});
	return new Response(JSON.stringify(post), { status: 200 });
};
