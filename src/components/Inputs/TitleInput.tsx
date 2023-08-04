"use client";

import { cn } from "@src/lib/utils";
import React from "react";

interface TitleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	required?: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<TitleInputProps> = ({
	label,
	required,
	onChange,
	...props
}) => {
	return (
		<div className={cn("relative", props.className)}>
			<input
				placeholder=" "
				className={`
				peer
				w-full
				p-4
				pt-6
				font-light
				bg-white
				border-2
				rounded-md
				outline-none
				transition
				disabled:opacity-70
				disabled:cursor-not-allowed
				text-neutral-700
				`}
				required={required}
				onChange={onChange}
			/>
			<label
				className={`
				absolute
				text-md
				duration-150
				transform
				-translate-y-3
				top-5
				left-2
				origin-[0]
				peer-placeholder-shown:scale-100
				peer-placeholder-shown:translate-y-0
				peer-focus:scale-75
				peer-focus:-translate-y-4
				`}
			>
				{label}
			</label>
		</div>
	);
};

export default Input;
