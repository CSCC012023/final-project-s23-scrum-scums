import { cn } from "@src/lib/utils";
import { FC } from "react";
import React from "react";
import { Button, ButtonProps } from "../ui/Button";

interface FollowButtonProps extends ButtonProps {
	userId: string;
	disabled?: boolean;
}

const FollowButton: FC<FollowButtonProps> = ({
	userId,
	disabled,
	...props
}) => {
	return (
		<Button
			className={cn`flex items-center text-secondary h-fit bg-green-500 rounded-full  ${props.className}`}
			onClick={() => console.log("follow")}
			disabled={disabled}
			variant={"ghost"}
		>
			<span className="flex flex-row items-center text-xs justify-center">
				Follow
			</span>
		</Button>
	);
};

export default FollowButton;
