"use client";
// a generic higher order component for modals

import React, { useCallback, useEffect, useState } from "react";
import Button from "@components/Button";
import { IoMdClose } from "react-icons/io";


// modelled after https://github.com/AntonioErdeljac/next13-airbnb-clone

interface ModalProps {
	isOpen?: boolean;				// whether the modal is open or not
	onClose: () => void; 			// called when the modal is closed
	onSubmit: () => void; 			// called when the modal is submitted
	title?: string; 				// the title of the modal
	body?: React.ReactElement; 		// the body of the modal
	footer?: React.ReactElement;	// the footer of the modal
	actionLabel: string;			// the label of the action button
	disabled?: boolean;				// whether the action button is disabled or not
	secondaryAction?: () => void; 	// called when the secondary action button is clicked
	secondaryActionLabel?: string;	// the label of the secondary action button
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
	title,
	body,
	footer,
	actionLabel,
	disabled,
	secondaryAction,
	secondaryActionLabel,
}) => {
	const [showModal, setShowModal] = useState(isOpen);
	useEffect(() => {
		setShowModal(isOpen);
	}, [isOpen]);

	const handleClose = useCallback(() => {
		if (disabled) {
			return;
		}
		setShowModal(false);
		setTimeout(() => {
			onClose();
		}, 300);
	}, [disabled, onClose]);

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

	if (!showModal) {
		return null;
	}

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
						${showModal ? "opacity-100" : "opacity-0"}
						${showModal ? "translate-y-0" : "translate-y-full"}
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
							bg-base-200
							outline-none
							focus:outline-none
							join join-vertical
							font-sans
							"
						>
							{/*header*/}
							<div
								className="
								flex items-center justify-center
								p-6
								join-item
								relative
								"
							>
								<button
									className="
									btn btn-ghost
									absolute
									left-9
									rounded-full
									"
									onClick={handleClose}

								>
									<IoMdClose
										size={18}
									/>
								</button>
								<div
									className="
									font-semibold
									text-lg
									"
								>
									{title}
								</div>
							</div>

							<div className="divider"></div>
							{/*body*/}
							<div
								className="
								relative
								flex-auto
								p-6
								join-item
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
								join-item
								"
							>
								<div
									className="
									flex
									items-center
									gap-4
									w-full
									"
								>
									{
										secondaryAction && secondaryActionLabel && (
											<Button label={secondaryActionLabel} disabled={disabled}
												onClick={handleSecondaryAction}
												outline secondary
											/>
										)
									}
									<Button label={actionLabel} disabled={disabled}
										onClick={handleSubmit}
									/>
								</div>
								{footer && <div className="divider"></div>}
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