import Link from "next/link";
import React from "react";
import { badgeVariants } from "@src/components/ui/Badge";
import { cn } from "@src/lib/utils";

// a tag to attach to posts with the category of the post and a link to the category page
interface TagProps {
	name: string
}


const Tag: React.FC<TagProps> = ({
	name,
	...props
}) => {

	return (
		<Link className={cn(badgeVariants({ variant: "default" }), "text-sm w-fit no-underline m-1")}
			href={`/search?q=${name}`}
		>
			{name}
		</Link>

	);
};

export default Tag;