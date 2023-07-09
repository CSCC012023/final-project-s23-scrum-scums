import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// this is a wrapper around clsx and tailwind-merge
// it allows us to use tailwind classes in clsx
// and also merge tailwind classes
// example:
// cn("text-red-500", "text-lg", "text-center", "text-blue-500")
// will return "text-red-500 text-lg text-center text-blue-500"
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
