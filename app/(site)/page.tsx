"use client";


import React from "react";
import Typewriter from "typewriter-effect";

const Home = () => {

	return (
		<div className="w-full h-3/5 ">
			<div className="pl-6 w-1/2">
				<h1 className="text-8xl font-bold font-serif my-4">
				Read on.
				</h1>
				<h2 className="text-3xl font-bold text-left">What&#39;s the Internet&#39;s views on
					<span className="text-primary inline-block ml-2"><Typewriter
						options={{
							strings: ["programming.", "design.", "politics.", "music.", "movies.", "books."],
							autoStart: true,
							loop: true,
						}}
					/>
					</span>
				</h2>
			</div>
			<div className="divider"></div>

		</div>
	);
};

export default Home;