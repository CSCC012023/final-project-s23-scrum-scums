import React from "react";
import GeneralFeed from "@src/components/GeneralFeed";

const Feed = () => {
	return (
		<div className="w-full flex flex-col justify-end items-center container mt-2">
			<div className="w-3/5 h-fit h-4/5">
				<GeneralFeed />
			</div>
		</div>
	);
};

export default Feed;
