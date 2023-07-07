import NextAuth from "next-auth/next";

declare module "next-auth" {
	/*
   	* Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   	*/
	interface Session {
		user: {
			username: string;
			image: string?;
			id: string;
		};
	}
}