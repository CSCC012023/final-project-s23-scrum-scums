"use client";

import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
	label: string,
	icon?: IconType,
	disabled?: boolean,
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
	outline?: boolean,
	small?: boolean,
	secondary?: boolean
}

const Button: React.FC<ButtonProps> = ({
	label,
	icon : Icon,
	disabled,
	onClick,
	outline,
	small,
	secondary
}) => {
	return (
		<button
			className={`
			relative
			disabled:opacity-50
			disabled:cursor-not-allowed
			btn
			${secondary ? "btn-secondary " : "btn-primary "}
			${outline ? "btn-outline " : ""}
			${small ? "btn-sm" : ""}
			flex-1
			`}
			onClick={onClick}
			disabled={disabled}
		>
			{Icon &&
				<Icon
					size={24}
				/>
			}
			{label}
		</button>
	);
};

export default Button;