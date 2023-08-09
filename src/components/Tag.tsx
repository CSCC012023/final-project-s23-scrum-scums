import Link from "next/link";
import React from "react";
import { badgeVariants } from "@src/components/ui/Badge";
import { cn } from "@src/lib/utils";

// a tag to attach to posts with the category of the post and a link to the category page
interface TagProps extends React.HTMLAttributes<HTMLAnchorElement> {
	name: string;
	fixed?: boolean;
}

const Tag: React.FC<TagProps> = ({ name, fixed, ...props }) => {
	const tag = fixed ? (
		<span
			className={cn(
				badgeVariants({ variant: "default" }),
				"text-sm w-fit no-underline m-1",
				`${props.className}`
			)}
		>
			{name}
		</span>
	) : (
		<Link
			className={cn(
				badgeVariants({ variant: "default" }),
				"text-sm w-fit no-underline m-1",
				`${props.className}`
			)}
			href={`/search?q=${name}`}
		>
			{name}
		</Link>
	);

	return tag;
};

export default Tag;
