import React from "react";
import { IconType } from "react-icons";

interface BtnProps {
	Icon: IconType,
	isActive: boolean,
	color: string,
	children?: React.ReactNode,
	ariaLabel?: string,
	onClick?: () => void
}

const IconBtn: React.FC<BtnProps> = ({
	Icon,
	isActive,
	color,
	children,
	ariaLabel,
	onClick
}) => {
	return (
		<button
			className={`btn icon-btn $(isActive ? "icon-btn-active" : ""} ${color}`}
			aria-label={ariaLabel}
			onClick={onClick}
		>
			<span>
				<Icon />
			</span>
			{children}
		</button>
	);
};

export default IconBtn;