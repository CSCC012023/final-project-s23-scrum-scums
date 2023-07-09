import { getServerSession } from "next-auth";
import { authConfig } from "@src/app/api/auth/[...nextauth]/route";
export const getAuthSession = getServerSession(authConfig);

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

import { formatDistanceToNowStrict } from "date-fns";
import locale from "date-fns/locale/en-US";
const formatDistanceLocale = {
	lessThanXSeconds: "just now",
	xSeconds: "just now",
	halfAMinute: "just now",
	lessThanXMinutes: "{{count}}m",
	xMinutes: "{{count}}m",
	aboutXHours: "{{count}}h",
	xHours: "{{count}}h",
	xDays: "{{count}}d",
	aboutXWeeks: "{{count}}w",
	xWeeks: "{{count}}w",
	aboutXMonths: "{{count}}m",
	xMonths: "{{count}}m",
	aboutXYears: "{{count}}y",
	xYears: "{{count}}y",
	overXYears: "{{count}}y",
	almostXYears: "{{count}}y"
};

function formatDistance(token: string, count: number, options?: any): string {
	options = options || {};

	const result = formatDistanceLocale[
		token as keyof typeof formatDistanceLocale
	].replace("{{count}}", count.toString());

	if (options.addSuffix) {
		if (options.comparison > 0) {
			return "in " + result;
		} else {
			if (result === "just now") return result;
			return result + " ago";
		}
	}

	return result;
}

export function formatTimeToNow(date: Date): string {
	return formatDistanceToNowStrict(date, {
		addSuffix: true,
		locale: {
			...locale,
			formatDistance
		}
	});
}
