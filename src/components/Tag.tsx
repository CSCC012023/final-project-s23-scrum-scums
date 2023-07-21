import Link from "next/link";
import React from "react";

// a tag to attach to posts with the category of the post and a link to the category page
interface TagProps {
	name: string,
}


const Tag: React.FC<TagProps> = ({
	name
}) => {

	return (
		<Link className="badge badge-outline badge-accent
			hover:badge-info hover:badge-outline hover:cursor-pointer"
		href={`/search?q=${name}`}
		>
			{name}
		</Link>

	);
};

export default Tag;