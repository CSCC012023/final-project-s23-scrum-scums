"use client";
import { FC } from "react";
import React from "react";
import { Button, ButtonProps } from "@src/components/ui/Button";
import { cn } from "@src/lib/utils";
import { Share2Icon } from "@radix-ui/react-icons";
import { useToast } from "@src/hooks/use-toast";

interface ShareButtonProps extends ButtonProps {
	href: string;
}

const ShareButton: FC<ShareButtonProps> = ({ href, ...props }) => {
	const { toast } = useToast();

	function copyToClipboard() {
		navigator.clipboard.writeText(href).then(function () {
			toast({
				title: "Copied to clipboard"
			});
		});
	}

	return (
		<Button
			className={cn("flex items-center text-gray-500")}
			{...props}
			onClick={() => copyToClipboard()}
			variant={"link"}
		>
			<span className="flex flex-row items-center justify-center">
				<Share2Icon className="h-5 w-5" />
			</span>
		</Button>
	);
};

export default ShareButton;
