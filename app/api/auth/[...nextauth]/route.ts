import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@lib/prisma";

export const authConfig: NextAuthOptions = {
	// @ts-expect-error - adapter randomly can't accept undefined even though that's its
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
		}),
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string
		})
	],
	callbacks: {
		async session ({ session, user }) {
			if (session.user) {
				session.user.id = user.id;
			}
			return session;
		}
	},
};

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };