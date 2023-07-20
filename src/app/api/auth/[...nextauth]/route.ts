import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@src/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

interface ObeliskToken {
	// the user name
	name: string;
	// the user email
	email: string;
	// the user profile image url
	picture?: string;
	// the user id
	sub: string;
	// the user access token
	accessToken: string;
	// the user access token expiration date
	exp: number;
	// the user access token issue date
	iat: number;
	// the user access token unique id
	jti: string;
}

export const authConfig: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			allowDangerousEmailAccountLinking: true,
		}),
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
			allowDangerousEmailAccountLinking: true,
		}),
		CredentialsProvider({
			name: "Email",
			credentials: {
				email: { label: "Email", type: "email", placeholder: "Email" },
				name: { label: "Name", type: "text", placeholder: "Name" },
				password: {
					label: "Password",
					type: "password",
					placeholder: "Password"
				}
			},
			async authorize(credentials) {
				const user = await prisma.user.findUnique({
					where: {
						email: credentials?.email
					}
				});

				if (!user) {
					console.log("No user found");
					return null;
				}
				const match = await bcrypt.compare(
					credentials?.password,
					user.password
				);
				if (!match) {
					console.log("Password doesn't match");
					return null;
				}

				console.log("Logged in as ", credentials?.name);
				return user;
			}
		})
	],
	session: {
		strategy: "jwt"
	},
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				token.accessToken = account.access_token;
			}
			// console.log("token", token);
			return token;
		},
		// Name, imageURL, username, id
		async session({ session, token }) {
			const tok = token as unknown as ObeliskToken;
			session.user.id = tok.sub;
			session.user.name = tok.name;
			// console.log("session", session);
			return session;
		}
	}
};

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
