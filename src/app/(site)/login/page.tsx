"use client";

import React from "react";
import { useEffect } from "react";
import useRegisterModal from "@src/hooks/useRegisterModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const Signup = () => {
	const registerModal = useRegisterModal();

	const router = useRouter();
	const { data: _session, status } = useSession();
	if (status === "authenticated") {
		router.push("/");
	}

	useEffect(() => {
		registerModal.onOpen();
	}, []);

	return (
		<div>
		</div>
	);
};

export default Signup;