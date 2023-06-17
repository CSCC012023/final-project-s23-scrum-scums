import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authConfig: NextAuthOptions = {
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
			name: "Credentials",
			async authorize(credentials) {		
				const { data: user } =  await axios.get("/api/login", {
					params: {
						email: credentials?.email,
					}
				});
				if (user && user.password == credentials?.password) {
					console.log("signed in");
					const { password, ...userWithoutPassword } = user;
					return userWithoutPassword;
				}
				console.log("sign in failed");
				return null;
			},
			credentials: {
				email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
				password: { label: "Password", type: "password" },
			},
		}),
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
	// 			sameSite: "strict", // This can be lax or strict, you might want to change this to "strict" for more security
	// 			path: "/",
	// 			secure: process.env.NODE_ENV === "production", // Ensures the cookie is only sent over HTTPS
	// 		},
	// 	},
	// },
};