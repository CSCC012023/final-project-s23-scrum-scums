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
				connect: cats.map(category => ({ name: category }))
			},
			author: {
				connect: { id: authorId }
			}
			// likes: 0,
		}
	});
	return new Response(JSON.stringify(post), { status: 201 });
};
