"use client";
// a generic higher order component for modals

import React, { useCallback } from "react";
import { Button } from "@src/components/ui/Button";
import CloseModal from "./CloseModal";
import { Separator } from "../ui/Separator";

// modelled after https://github.com/AntonioErdeljac/next13-airbnb-clone

interface ModalProps {
	// isOpen?: boolean;				// whether the modal is open or not3
	// onClose: () => void; 			// called when the modal is closed
	onSubmit: () => void; // called when the modal is submitted
	title?: string; // the title of the modal
	body?: React.ReactElement; // the body of the modal
	footer?: React.ReactElement; // the footer of the modal
	actionLabel: string; // the label of the action button
	disabled?: boolean; // whether the action button is disabled or not
	secondaryAction?: () => void; // called when the secondary action button is clicked
	secondaryActionLabel?: string; // the label of the secondary action button
}

const Modal: React.FC<ModalProps> = ({
	// isOpen,
	// onClose,
	onSubmit,
	title,
	body,
	footer,
	actionLabel,
	disabled,
	secondaryAction,
	secondaryActionLabel
}) => {
	const handleSubmit = useCallback(() => {
		if (disabled) {
			return;
		}
		onSubmit();
	}, [disabled, onSubmit]);

	const handleSecondaryAction = useCallback(() => {
		if (disabled || !secondaryAction) {
			return;
		}
		secondaryAction();
	}, [disabled, secondaryAction]);

	return (
		<>
			{/* overlay */}
			<div
				className="
				justify-center
				items-center
				flex
				overflow-x-hidden
				overflow-y-auto
				fixed
				inset-0
				z-50
				outline-none
				focus:outline-none
				bg-neutral-700/70
				"
			>
				<div
					className={`
					relative
					w-full
					md:w-4/6
					lg:w-3/6
					xl-2/5
					my-6
					mx-auto
					h-full
					md:h-auto
					`}
				>
					{/*content*/}
					<div
						className={`
						translate
						transition-all
						h-full
						animate-[slide-up 0.3s]
						`}
					>
						<div
							className="
							h-full w-full
							md:h-auto
							border-0
							rounded-lg
							shadow-lg
							relative
							flex flex-col
							bg-zinc-50
							outline-none
							focus:outline-none
							font-sans
							"
						>
							{/*header*/}
							<div
								className="
								flex items-center justify-center
								p-6
								relative
								"
							>
								<div
									className="
									font-semibold
									text-lg
									flex-1
									"
								>
									{title}
								</div>
								<CloseModal />
							</div>

							<div className="divider"></div>
							{/*body*/}
							<div
								className="
								relative
								flex-auto
								p-6
								"
							>
								{body}
							</div>
							{/*footer*/}
							<div
								className="
								flex flex-col
								items-center
								justify-end
								gap-2
								p-6
								"
							>
								<div
									className="
									flex
									items-center
									justify-center
									gap-4
									w-full
									"
								>
									{secondaryAction &&
										secondaryActionLabel && (
											<Button
												onClick={handleSecondaryAction}
											>
												{secondaryActionLabel}
											</Button>
										)}
									<Button
										onClick={handleSubmit}
										disabled={disabled}
										className="w-full"
									>
										{actionLabel}
									</Button>
								</div>
								{footer && <Separator />}
								{footer}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
