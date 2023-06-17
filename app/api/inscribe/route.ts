import prisma  from "@lib/prisma";

// 	 id        String   @id @default(uuid())
//   title     String
//   content   String
//   author    User     @relation(fields: [authorId], references: [id])
//   authorId  String
//   createdAt DateTime @default(now())
export const POST = async () => {
	const id = Math.random().toString(36).substring(7);
	const title = "title" + Math.random().toString(36).substring(7);
	const content = "content" + Math.random().toString(36).substring(7);
	// const author = {connect: {id: 9,},};
	const authorID = "46e1ce09-78e7-4d1b-ba49-8479de96ea76";
export const POST = async (req: Request) => {
	const { title, content, authorId } = await req.json();
	console.log(title, content, authorId);
	const inscribe = await prisma.inscribe.create({
		data: {
			title: title,
			content: content,
			authorId: authorId,
		},
	});

	return new Response(JSON.stringify(inscribe), { status: 201 });
};