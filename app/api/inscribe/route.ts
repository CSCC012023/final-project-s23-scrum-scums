import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// 	 id        String   @id @default(uuid())
//   title     String
//   content   String
//   author    User     @relation(fields: [authorId], references: [id])
//   authorId  String
//   createdAt DateTime @default(now())
export const POST = async () => {
	console.log("here");
	const id = Math.random().toString(36).substring(7);
	const title = "title" + Math.random().toString(36).substring(7);
	const content = "content" + Math.random().toString(36).substring(7);
	// const author = {connect: {id: 9,},};
	const authorID = "46e1ce09-78e7-4d1b-ba49-8479de96ea76";
	const inscribe = await prisma.inscribe.create({
		data: {
			id: id,
			title: title,
			content: content,
			authorId: authorID
		},
	});
	return new Response(JSON.stringify(inscribe), { status: 201 });
};