import { useRouter } from "next/navigation";
import React from "react";

// a tag to attach to posts with the category of the post and a link to the category page
interface TagProps {
	name: string,
}


const Tag: React.FC<TagProps> = ({
	name
}) => {
	const router = useRouter();
	function onClick() {
		router.push(`search/${name.toLowerCase()}`);
	}


	return (
		<div className="badge badge-outline badge-accent
			hover:badge-info hover:badge-outline hover:cursor-pointer"
		onClick={onClick}
		>
			{name}
		</div>

	);
};

export default Tag;