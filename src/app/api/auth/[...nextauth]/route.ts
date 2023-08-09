import NextAuth from "next-auth";
import { authConfig } from "@src/lib/auth";
// check the lib folder for the auth config
const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
