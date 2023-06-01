import Inscription from "@components/Inscription";
import React from "react";
import axios from "axios";


const Feed = async () => {
	const { data } =  await axios.get("/api/trending");
	console.log(data);

	return (
		<div>
            Feed: {data}
		</div>
	);
};

export default Feed;