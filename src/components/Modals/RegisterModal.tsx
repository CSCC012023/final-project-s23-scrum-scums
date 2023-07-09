"use client";

import React from "react";
import axios from "axios";
import { useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Modal from "@src/components/Modals/Modal";
import {
	FieldValues,
	SubmitHandler,
	useForm,
} from "react-hook-form";
import { toast } from "react-hot-toast";

import useRegisterModal from "@src/hooks/useRegisterModal";
import useLoginModal from "@src/hooks/useLoginModal";
import Heading from "@src/components/Heading";
import Input from "@src/components/Inputs/Input";
import Button from "@src/components/Button";
import { signIn } from "next-auth/react";


const RegisterModal = () => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();

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
		await axios.post("api/register", data)
			.then((response) => {
				console.log(response);
				if (response.data.error)  {
					toast.error(response.data.error);
				} else {
					registerModal.onClose();
					signIn("credentials", { redirect: false, ...data });
				}
			})
			.catch((error) => {
				toast.error(error);
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
				id="name"
				label="Name"
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
				label="Sign up with Google"
				icon={FcGoogle}
				onClick={() => signIn("google", { callbackUrl: "/" })}
			/>
			<Button
				outline
				label="Sign up with GitHub"
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
					flex flex-row
					items-center
					gap-2
					"
				>
					<div>Already have an account?</div>
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
							registerModal.onClose();
							loginModal.onOpen();
						}}
					>
					Log In
					</div>
				</div>

			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			onClose={registerModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			title="Sign Up"
			actionLabel="Continue"
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default RegisterModal;