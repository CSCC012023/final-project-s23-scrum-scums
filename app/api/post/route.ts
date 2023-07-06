import prisma  from "@lib/prisma";
import { getServerSession } from "next-auth/next"
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
	}>;
}
export const POST = async (req: Request) => {
	const {title, content, cats} = await req.json();
	const session = await getServerSession();
	if (!session) {
		return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
	}
	const authorId = session.user.id;

	const post = await prisma.post.create({
		data: {
			title: title,
			content: content,
			authorId: authorId,
			createdAt: new Date(),
			categories: {
				connect: cats.map((category) => ({ name: category })),
			},
			// likes: 0,
		},
	});

	return new Response(JSON.stringify(post), { status: 201 });
};