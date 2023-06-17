import prisma  from "@lib/prisma";

// 	 id        String   @id @default(uuid())
//   title     String
//   content   String
//   author    User     @relation(fields: [authorId], references: [id])
//   authorId  String
//   createdAt DateTime @default(now())
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