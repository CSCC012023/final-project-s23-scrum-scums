"use client";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

// define a type for component props
interface AuthProviderProps {
	children: ReactNode;
	props: any;
}

const AuthProvider = ({ children, props: { session } }: AuthProviderProps) => {
	return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
