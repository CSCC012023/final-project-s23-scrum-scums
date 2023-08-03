import React from "react";
import GeneralFeed from "@src/components/GeneralFeed";
import Typer from "@src/components/Typer";
import Tag from "@src/components/Tag";
import { Separator } from "@src/components/ui/Separator";

const Home = () => {
	return (
		<>
			<div className="w-full">
				<div className="pl-6 w-1/2">
					<h1 className="text-6xl font-bold font-serif my-4 ">
						Welcome to Obelisk
						<br />
						Read on.
					</h1>

					<h2 className="text-3xl font-bold text-left">
						What&#39;s the Internet&#39;s views on
						<Typer />
					</h2>
				</div>
				<Separator />
			</div>

			<div className="h-full w-full ">
				<div className="flex flex-row justify-evenly mt-12">
					<div className="w-3/5">
						<GeneralFeed />
					</div>

					<div className="sticky top-1/2 flex flex-col items-center justify-center h-full mt-10">
						<div className="flex flex-col justify-center items-center">
							<h1 className="text-center pb-1">
								Discover more about topics you love
							</h1>
							<div className="flex flex-row flex-wrap justify-center gap-2 w-3/5">
								<Tag name={"Finance"} />
								<Tag name={"Programming"} />
								<Tag name={"Politics"} />
								<Tag name={"Film"} />
								<Tag name={"Philosophy"} />
								<Tag name={"Art"} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
