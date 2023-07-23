"use client";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

// define a type for component props
interface AuthProviderProps {
	children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
	return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;