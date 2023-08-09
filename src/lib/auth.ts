import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@src/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { CommentLike, PostLike, User } from "@prisma/client";

interface ObeliskToken {
	// the user's id
	sub: string;
	// the user access token
	accessToken: string;
	// the user access token expiration date
	exp: number;
	// the user access token issue date
	iat: number;
	// the user access token unique id
	jti: string;
	user: {
		id: string;
		name: string;
		email: string;
		username?: string;
		image?: string;
		createdAt: Date;
		likes: {
			postLikes: PostLike[];
			commentLikes: CommentLike[];
		};
		follows: {
			following: User[];
			followers: User[];
		};
	};
}

export const authConfig: NextAuthOptions = {
	// @ts-expect-error idk why this is an error
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			allowDangerousEmailAccountLinking: true
		}),
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
			allowDangerousEmailAccountLinking: true
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
				if (user.password === null) {
					console.log("No password set");
					// todo redirect to register
					return null;
				}
				if (!credentials?.password) {
					console.log("No password provided");
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

				console.log(`Logged in as ${user?.name}`);
				return user;
			}
		})
	],
	session: {
		strategy: "jwt"
	},
	callbacks: {
		async jwt({ token, account, trigger, user }) {
			// console.log("token", token);
			// console.log("account", account);
			// console.log("trigger", trigger);
			// console.log("user", user);

			const userData = await prisma.user.findUnique({
				where: {
					id: token.sub
				},
				include: {
					postLikes: true,
					commentLikes: true,
					following: true,
					followedBy: true
				}
			});
			if (!userData) {
				return token;
			}

			if (!userData.username) {
				await prisma.user.update({
					where: {
						id: userData.id
					},
					data: {
						username: nanoid(10)
					}
				});
			}

			if (account) {
				token.accessToken = account.access_token;
			}
			return {
				sub: token.sub,
				iat: token.iat,
				exp: token.exp,
				jti: token.jti,
				user: {
					id: userData.id,
					name: userData.name,
					email: userData.email,
					username: userData.username,
					image: userData.image,
					createdAt: userData.createdAt,
					likes: {
						postLikes: userData.postLikes,
						commentLikes: userData.commentLikes
					},
					follows: {
						following: userData.following,
						followers: userData.followedBy
					}
				}
			};
		},
		// Name, imageURL, username, id
		async session({ session, token }) {
			const tok = token as unknown as ObeliskToken;
			session.user = tok.user;
			// console.log("session", session);
			return session;
		},
		redirect() {
			return "/";
		}
	},
	pages: {
		signIn: "/login",
		newUser: "/register"
	}
};

export const getAuthSession = () => getServerSession(authConfig);
