import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import prisma from "@lib/prisma";

const authConfig: NextAuthOptions = {
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
	session: {
		// Use JWT instead of database sessions
		strategy: "jwt",
	},
	// cookies: {
	// 	sessionToken: {
	// 		name: "next-auth.session-token",
	// 		options: {
	// 			httpOnly: true,
	// 			sameSite: "strict", // This can be lax or strict, you might want to change this to 'strict' for more security
	// 			path: "/",
	// 			secure: process.env.NODE_ENV === "production", // Ensures the cookie is only sent over HTTPS
	// 		},
	// 	},
	// },
};

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };