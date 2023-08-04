// Get all recommended posts for a given user
import prisma from "@src/lib/prisma";
import pgvector from 'pgvector/utils';
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const url = new URL(req.nextUrl);
    const recommended = url.searchParams.getAll("recommended[]");
    const user_id = Number(url.searchParams.get("user_id"));

    let recommendedMatrix: number[][] = [];
    for (let i = 0; i < recommended.length; i++) {
        let split = recommended[i].split(",").map((x) => parseInt(x));
        recommendedMatrix.push(split);
    }
    
    // All posts user has liked
    let user_recommend: number[] = [];
    for (let i = 0; i < recommendedMatrix[user_id].length; i++) {
        if (recommendedMatrix[user_id][i] == 1) {
            user_recommend.push(i + 1);
        }
    }

    // Create vector database
    await prisma.$executeRaw`TRUNCATE TABLE "Recommendation";`
    for (let i = 0; i < recommendedMatrix.length; i++) {
        const embedding = pgvector.toSql(recommendedMatrix[i]);
        await prisma.$executeRaw`INSERT INTO "Recommendation" (id, embedding) VALUES (${i}, ${embedding}::vector);`;
    }
    const r_embedding = pgvector.toSql(recommendedMatrix[user_id]);
    const result: any = await prisma.$queryRaw`SELECT embedding::text FROM "Recommendation" WHERE id != ${user_id} ORDER BY embedding <-> ${r_embedding}::vector LIMIT 5;`;

    // Get recommended posts
    let userLikes: number[] = [];           
    for (let i = 0; i < result.length; i++) {
        let count = 1;
        const userLike: number[] = [];
        result[i] = result[i].embedding
            .replace(/[\[\]']+/g,'')
            .split(",")
            .map((x: any) => {
                if(Number(x) == 1)
                {
                    userLike.push(count);
                }
                count++;
            });
        userLikes = userLikes.concat(userLike)
    }
    const uniqueUserLikes = userLikes.filter((v, i, a) => a.indexOf(v) === i); // Set of all recommended posts
    const recommendedPosts = await prisma.post.findMany({
        where:{
            id: {
                in: uniqueUserLikes
            },
            NOT: {
                id: {
                    in: user_recommend
                }
            }
        },
        include: {
            author: true,
            categories: true,
            likes: true
        }
    });
    return NextResponse.json(recommendedPosts);
};