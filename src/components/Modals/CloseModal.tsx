"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/Button";

const CloseModal = () => {
	const router = useRouter();
	// sends you back to the previous page
	// important because the modal is considered a separate page
	return (
		<Button variant='subtle' className='h-6 w-6 p-0 rounded-md' onClick={() => router.back()}>
			<Cross2Icon aria-label='close modal' className='h-4 w-4' />
		</Button>
	);
};

export default CloseModal;