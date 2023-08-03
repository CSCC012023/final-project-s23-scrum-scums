"use client";

import React from "react";

interface InputProps {
	id: string;
	label: string;
	type?: string;
	disabled?: boolean;
	required?: boolean;
}

const Input: React.FC<InputProps> = ({
	id,
	label,
	type = "text",
	disabled,
	required
}) => {
	return (
		<div className="w-full relative">
			<input
				id={id}
				disabled={disabled}
				placeholder=" "
				type={type}
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
			/>
			<label
				className={`
				absolute
				text-md
				duration-150
				transform
				-translate-y-3
				top-5
				z-10
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
