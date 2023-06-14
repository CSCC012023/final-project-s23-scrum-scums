import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
    const { inscribeId, content } = await request.json();
    const authorId = "1393486f-78b9-44c2-9282-1af8b75dc88e";
    const comment = await prisma.comment.create({
        data: {
            inscribeId: inscribeId,
            content: content,
            authorId: authorId,
            createdAt: new Date(),
            likes: 0,
        },
    });
    return new Response(JSON.stringify(comment), { status: 201 });
}