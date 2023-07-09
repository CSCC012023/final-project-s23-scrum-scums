"use client";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

// define a type for component props
interface ProviderProps {
	children: ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
	return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;