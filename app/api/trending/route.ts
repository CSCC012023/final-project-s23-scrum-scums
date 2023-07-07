// Retrieves list of trending posts
import prisma  from "@lib/prisma";


export const GET = async () => {
	const trending = await prisma.post.findMany({
		include: {
			author: true,
			categories: true,
			likes: true,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
	return new Response(JSON.stringify(trending), { status: 200 });
};