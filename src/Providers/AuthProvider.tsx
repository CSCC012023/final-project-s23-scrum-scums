"use client";
// we have to do this to make sure its run on the client side
// otherwise it will be run on the server side and cause an error

import { SessionProvider } from "next-auth/react";
import React from "react";

type Props = {
	children: React.ReactNode;
  };

export default function AuthProvider({ children }: Props) {
	return <SessionProvider>{children}</SessionProvider>;
}