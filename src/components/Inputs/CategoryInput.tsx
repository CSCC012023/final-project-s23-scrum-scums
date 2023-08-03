"use client";

import React, { useState } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";
import { Category } from "@prisma/client";
import axios from "axios";

interface CategoryOptions {
	label: string;
	value: string;
}

const getTags = (inputValue: string) => {
	if (inputValue.length < 1) {
		const res: Promise<CategoryOptions[]> = new Promise(() => {
			return [];
		});
		return res;
	}
	const res = axios.get(`/api/post/category?tag=${inputValue}`).then(res => {
		const categories: Category[] = res.data;
		const options: CategoryOptions[] = categories.map(category => {
			return {
				label: category.name,
				value: category.name
			};
		});
		return options;
	});

	return res;
};

interface InputProps {
	label: string;
	type?: string;
	disabled?: boolean;
	required?: boolean;
	getValue: () => CategoryOptions[];
}

const CategoryInput: React.FC<InputProps> = ({ disabled, required }) => {
	const [onChange, setOnChange] = useState<boolean>(false);

	return (
		<AsyncCreatableSelect
			cacheOptions
			defaultOptions
			isMulti
			loadOptions={getTags}
			isDisabled={disabled}
			onChange={values => {
				console.log("new value", values);
			}}
		/>
		// <div className="w-full relative">
		// 	{formatPrice && (
		// 		<BiDollar
		// 			size={24}
		// 			className="
		// 			text-neutral-700
		// 			absolute
		// 			top-5
		// 			left-2
		// 			"
		// 		/>
		// 	)}
		// 	<input
		// 		id={id}
		// 		disabled={disabled}
		// 		{...register(id, { required })}
		// 		placeholder=" "
		// 		type={type}
		// 		className={`
		// 		peer
		// 		w-full
		// 		p-4
		// 		pt-6
		// 		font-light
		// 		bg-white
		// 		border-2
		// 		rounded-md
		// 		outline-none
		// 		transition
		// 		disabled:opacity-70
		// 		disabled:cursor-not-allowed
		// 		${formatPrice ? "pl-9" : "pl-4"}
		// 		${errors[id] ? "border-error" : "border-neutral-300"}
		// 		${errors[id] ? "focus:border-error" : "focus:border-black"}
		// 		text-neutral-700
		// 		`}
		// 	/>
		// 	<label
		// 		className={`
		// 		absolute
		// 		text-md
		// 		duration-150
		// 		transform
		// 		-translate-y-3
		// 		top-5
		// 		z-10
		// 		origin-[0]
		// 		${formatPrice ? "left-9" : "left-4"}
		// 		peer-placeholder-shown:scale-100
		// 		peer-placeholder-shown:translate-y-0
		// 		peer-focus:scale-75
		// 		peer-focus:-translate-y-4
		// 		${errors[id] ? "text-error" : "text-zinc-400"}
		// 		`}
		// 	>
		// 		{label}
		// 	</label>
		// </div>
	);
};

export default CategoryInput;
