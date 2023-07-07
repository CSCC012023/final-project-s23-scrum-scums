import { withAuth } from "next-auth/middleware";

// https://github.com/nextauthjs/next-auth/discussions/4078
export default withAuth({
	pages: {
		signIn: "/login",
	},
});

export const config = { matcher: ["/feed", "/post"] };