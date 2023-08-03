"use client";
import React from "react";
import { FC } from "react";
import Typewriter from "typewriter-effect";

const Typer: FC = () => {
	return (
		<span className="text-secondary-foreground inline-block ml-2">
			<Typewriter
				options={{
					strings: [
						"programming.",
						"design.",
						"politics.",
						"music.",
						"movies.",
						"books."
					],
					autoStart: true,
					loop: true
				}}
			/>
		</span>
	);
};

export default Typer;
