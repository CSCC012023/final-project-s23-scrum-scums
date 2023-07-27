// Retrieves all comments for a given post along with the comments' replies and replies' replies and the replies' replies' replies and ...
// prisma doesn't support recursive queries, so we'll have to do this manually
import { NextRequest } from "next/server";
import prisma from "@src/lib/prisma";
import { CommentTree } from "@src/types/";

export const GET = async (
	req: NextRequest,
	{ params }: { params: { post_id: string } }
) => {
	const postId = Number(params.post_id);

	/*
	 * Get all comments and replies (henceforth reply) for a given post
	 * First name the Common Table Expression all_replies.
	 * We want to select all columns of the reply and the user who authored it that we need.
	 * So we join this data for everyone who's done a top level reply to the post (parent_id is null).
	 * That's the base case of the recursive query.
	 * For each reply we check if it's parent is in the all_replies CTE.
	 * If it is, we add it to the CTE.
	 * We keep doing this and return a json array of all the replies
	 */

	const sqlResponse: any[] = await prisma.$queryRaw`
	with recursive all_replies as (
		select "Comment".id, "postId", "parentId", "Comment"."updatedAt",
		"content", "Comment"."createdAt" as "commentCreatedAt", "User"."name",
		"User"."image", "User"."username", "User"."bio",
		"User"."createdAt", "User".id as "userId"
		from "Comment"
		left join "User" on "User".id = "Comment"."authorId"
		and "Comment"."postId" = ${postId}
		where "Comment"."postId" = ${postId} and "Comment"."parentId" is null
		union all
		select reply.id, reply."postId", reply."parentId", reply."updatedAt",
		reply."content", reply."createdAt" as "commentCreatedAt", "User"."name",
		"User"."image", "User"."username", "User"."bio",
		"User"."createdAt", "User".id as "userId"
		from "Comment" as reply
		inner join all_replies on all_replies.id = reply."parentId"
		left join "User" on "User".id = reply."authorId"
	)
	select json_agg(all_replies order by all_replies."commentCreatedAt" desc) from all_replies;
	`;

	// note the comments are sorted by createdAt desc
	// so we literally cant iterate over them and have a reply whose parent isn't after it.
	// we'll always see all the children by the time we get to the parent
	// this way we build the response in reverse where we finish each bottom most reply
	// and put it in the children array of its parent and so on

	const listReplies = sqlResponse[0].json_agg;
	const childrenTable: { [key: string]: CommentTree[] } = {};

	const topLevels: CommentTree[] = [];
	for (const reply of listReplies) {
		const {
			id,
			postId,
			parentId,
			content,
			createdAt,
			commentCreatedAt,
			updatedAt,
			name,
			image,
			username,
			bio,
			userId
		} = reply;
		const replyObj: CommentTree = {
			author: {
				id: userId,
				name,
				image,
				username,
				bio,
				createdAt
			},
			id,
			postId,
			parentId,
			content,
			createdAt: commentCreatedAt,
			updatedAt,
			authorId: userId,
			replies: childrenTable[id] || []
		};
		if (parentId) {
			if (childrenTable[parentId]) {
				childrenTable[parentId].push(replyObj);
			} else {
				childrenTable[parentId] = [replyObj];
			}
		} else {
			topLevels.push(replyObj);
		}
	}
	return new Response(JSON.stringify(topLevels), { status: 200 });
};
