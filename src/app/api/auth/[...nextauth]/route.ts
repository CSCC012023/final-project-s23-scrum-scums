import NextAuth from "next-auth";
import { authConfig } from "@src/lib/auth";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
