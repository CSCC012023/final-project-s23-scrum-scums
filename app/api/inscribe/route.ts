import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// 	 id        String   @id @default(uuid())
//   title     String
//   content   String
//   author    User     @relation(fields: [authorId], references: [id])
//   authorId  String
//   createdAt DateTime @default(now())
export const POST = async () => {

	const id = Math.random().toString(64).substring(7);
	const title = "title" + Math.random().toString(64).substring(7);
	const content = "content" + Math.random().toString(64).substring(7);
	const author = "0";
	const authorID = "0" + Math.random().toString(64).substring(7);
	const Inscribe = await prisma.user.create({
		data: {
			id: id,
			title: title,
			content: content,
			author: author,
			authorID: authorID,


		},
	});
	return new Response(JSON.stringify(user), { status: 201 });
};