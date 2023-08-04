// Retrieve a the top recommended post for a user
import prisma from "@src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const url = new URL(req.nextUrl);
    const recommended = url.searchParams.getAll("recommended[]");

    console.log(recommended);
    const test = await prisma.postLike.groupBy({
        by: ['postId'],
        _count: {
            userId: true
        },
        orderBy: {
            _count: {
                userId: 'desc'
            }
        }
    });
    console.log(test);
    const topRecommended = await prisma.postLike.groupBy({
        take: 1,
        by: ['postId'],
        where: {
            postId: {
                in: recommended.map(Number)
            }
        },
        _count: {
            userId: true
        },
        orderBy: {
            _count: {
                userId: 'desc'
            }
        }
    });
    console.log(topRecommended)
    const topRecommendedPost = await prisma.post.findFirst({
        where: {
            id: topRecommended[0].postId
        },
        include: {
            author: true,
            categories: true,
            likes: true
        }
    });

    return NextResponse.json(topRecommendedPost);
};