import { cn } from "@/src/lib/utils";
import React from "react";

function Skeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("animate-pulse rounded-md bg-primary/10 duration-[4s]", className)}
			{...props}
		/>
	);
}

export { Skeleton };
