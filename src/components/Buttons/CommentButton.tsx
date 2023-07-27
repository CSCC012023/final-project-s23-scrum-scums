import { FC } from "react";
import React from "react";
import { Button, ButtonProps } from "@src/components/ui/Button";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { cn } from "@src/lib/utils";


interface CommentButtonProps extends ButtonProps {
	label?: string;
	disabled?: boolean;
}

const CommentButton: FC<CommentButtonProps> = ({
	label,
	disabled,
	...props
}) => {
	return (
		<Button
			className={cn("flex items-center text-gray-500")}
			{...props}
			onClick={() => console.log("comment")}
			disabled={disabled}
			variant={"link"}
		>
			<span className="flex flex-row items-center justify-center">
				<ChatBubbleIcon className="mr-2 h-5 w-5"/>
				{label ?? ""}
			</span>
		</Button>
	);
};

export default CommentButton;