import React from "react";
import { Skeleton } from "./ui/Skeleton";
import { badgeVariants } from "./ui/Badge";
import { Separator } from "./ui/Separator";
import { cn } from "@src/lib/utils";

const PostSkeleton = () => {
	return (
		// base container
		<Skeleton className="bg-zinc-300 shadow-xl w-full
		hover:cursor-pointer
		transition-all duration-500 ease-in-out container
		hover:shadow-2xl">
			<div className="px-4 py-2 flex flex-col justify-between space-y-4">
				<div className='max-h-40 mt-1 text-xs w-full text-slate-500 my-2'>
					<div className="flex flex-row items-center">
						<Skeleton className="h-5 w-5 rounded-full mr-4"/>
						<Skeleton className="w-24 my-2 h-6"/>{" "}
						<Skeleton className="w-16 my-2"/>
					</div>
				</div>
				<div className="my-4">
					<Skeleton className="h-12 text-lg font-semibold py-2 leading-6 text-gray-900"/>
					<Skeleton className="relative text-sm h-28 w-full overflow-clip flex-1 my-2"/>
				</div>
				<Skeleton className={cn(badgeVariants(), "w-24 h-6")} />
				<div className="flex justify-evenly items-stretch mt-2">
					<Skeleton className="h-6 w-20 text-slate-500" />
					<Separator orientation="vertical"/>
					<Skeleton className="h-6 w-20 text-slate-500" />
					<Separator orientation="vertical"/>
					<Skeleton className="h-6 w-20 text-slate-500" />
				</div>
			</div>
		</Skeleton>
	);
};

export default PostSkeleton;