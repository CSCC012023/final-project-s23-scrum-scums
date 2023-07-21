// Retrieve number of users that have liked a post
import prisma from "@src/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
    const num_users = await prisma.postLike.findMany({
        distinct: ['userId'],
        select: {
            userId: true
        }
    });
    return NextResponse.json(num_users.length);
};