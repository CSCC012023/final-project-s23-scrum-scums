import React from "react";
import RecommendedFeed from "@src/components/RecommendedFeed";

const Recommended = () => {
    return (
		<div className="w-full flex flex-col justify-end items-center container mt-2">
			<h1 className="text-6xl font-bold font-serif my-4 ">
				Recommended
			</h1>
			<div className="w-3/5 h-fit h-4/5">
				<RecommendedFeed />
			</div>
		</div>
    );
}

export default Recommended;