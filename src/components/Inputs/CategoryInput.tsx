"use client";

import React from "react";
import AsyncCreatableSelect from "react-select/async-creatable";
import { Category } from "@prisma/client";
import axios from "axios";
import Tag from "../Tag";

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

interface CategoryInputProps {
	setCats: (vals: string[]) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({ setCats }) => {
	return (
		<AsyncCreatableSelect
			cacheOptions
			defaultOptions
			isMulti
			loadOptions={getTags}
			onChange={values => {
				const normalized = values.map(val => {
					return val.value;
				});
				setCats(normalized);
			}}
			className="w-full mt-2"
			formatOptionLabel={option => {
				return <Tag name={option.label} fixed />;
			}}
		/>
	);
};

export default CategoryInput;
