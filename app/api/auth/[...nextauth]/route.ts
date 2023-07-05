import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import prisma from "@lib/prisma";
import {	PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const authConfig: NextAuthOptions = {
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
	session: {
		// Use JWT instead of database sessions
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, user }) {
			return {...token, ...user};	
		},
		async session({ session, token, user}){
			session.user = token as any;
			return session;
		},
	}
};

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };