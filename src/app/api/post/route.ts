import prisma from "@src/lib/prisma";

// id        String     @id @default(uuid())
// title     String
// content   String
// createdAt DateTime   @default(now())
// comments  Comment[]
// authorId  String
// author    User       @relation(fields: [authorId], references: [id])
// likes     PostLike[]
// category  Category[]
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
			authorId: authorId,
			createdAt: new Date(),
			categories: {
				connect: cats.map(category => ({ name: category }))
			}
			// likes: 0,
		}
	});
	return new Response(JSON.stringify(post), { status: 201 });
};
