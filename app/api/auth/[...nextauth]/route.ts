import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

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
		}),
		CredentialsProvider({
			name: "Email",
			credentials: {
				email: { label: "Email", type: "email", placeholder: "Email" },
				username: { label: "Username", type: "text", placeholder: "Username" },
				password: { label: "Password", type: "password", placeholder: "Password"}
			},
			async authorize(credentials) {
				const res = await axios.post("/api/signup", {
					email: credentials?.email,
					username: credentials?.username,
					password: credentials?.password
				});
				console.log("submitting", credentials?.username, credentials?.password, credentials?.email);

				const user = await res.data.json();

				if (user) {
					console.log("Logged in as ", credentials?.username);
					return user;
				} else {
					console.log("Login failed");
					return null;
				}
			}
		})
	],
	callbacks: {
		async session ({ session, user }) {
			if (session.user) {
				session.user.id = user.id;
			}
			return session;
		},
	},
};

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };