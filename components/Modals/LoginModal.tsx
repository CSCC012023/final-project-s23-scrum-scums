"use client";

import React from "react";
import axios from "axios";
import { useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Modal from "@components/Modals/Modal";
import {
	FieldValues,
	SubmitHandler,
	useForm,
} from "react-hook-form";
import { toast } from "react-hot-toast";

import useLoginModal from "@hooks/useLoginModal";
import useRegisterModal from "@hooks/useRegisterModal";
import Heading from "@components/Heading";
import Input from "@components/Inputs/Input";
import Button from "@components/Button";
import { signIn } from "next-auth/react";


const LoginModal = () => {
	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		setIsLoading(true);
		console.log(data);
		signIn("credentials", { redirect: false, ...data })
			.then(() => {
				loginModal.onClose();
			})
			.catch((err) => {
				toast.error(`Something went wrong (${err.response.status})`);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const bodyContent = (
		<div
			className="flex flex-col justify-center w-full h-full gap-4"
		>
			<Heading
				title="Welcome to Obelisk"
				subtitle="Create an account to get started"
			/>
			<Input
				id="email"
				label="Email"
				type="text"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>

			<Input
				id="password"
				label="Password"
				type="password"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	);

	const footerContent = (
		<div className="flex flex-col justify-center w-full h-full gap-4">
			<Button
				outline
				label="Log in with Google"
				icon={FcGoogle}
				onClick={() => signIn("google", { callbackUrl: "/" })}
			/>
			
			<Button
				outline
				label="Log in with GitHub"
				icon={AiFillGithub}
				onClick={() => signIn("github", { callbackUrl: "/" })}
			/>

			<div
				className="
				text-center
				mt-4
				font-light
				"
			>
				<div
					className="
					justify-center
					flex
					items-center
					gap-2
					"
				>
					<div>Don't have an account?</div>
					<div
						className="
						text-blue-500
						cursor-pointer
						hover:underline
						transition-all
						ease-in-out
						duration-200
						"
						onClick={() => {
							loginModal.onClose();
							registerModal.onOpen();
						}}
					>
					Sign Up
					</div>
				</div>

			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			title="Log In"
			actionLabel="Continue"
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default LoginModal;