"use client";

import React from "react";
import axios from "axios";
import { useState } from "react";
import Modal from "@src/components/Modals/Modal";
import {
	FieldValues,
	SubmitHandler,
	useForm,
} from "react-hook-form";
import { useToast } from "@src/hooks/use-toast";
import Heading from "@src/components/Heading";
import Input from "@src/components/Inputs/Input";
import { Button } from "@src/components/ui/Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icons } from "../Icons";
import { GitHubLogoIcon } from "@radix-ui/react-icons";


const RegisterModal = () => {

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
	const router = useRouter();
	const { toast } = useToast();

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		setIsLoading(true);
		await axios.post("api/register", data)
			.then((response) => {
			// console.log(response);
				if (response.data.error)  {
					toast({
						title: "There was an error logging you in",
						description: response.data.error,
						variant: "destructive"
					});
				} else {
					signIn("credentials", { redirect: false, ...data });
					router.push("/");
				}
			})
			.catch((err) => {
				toast({
					title: "There was an error logging you in",
					description: err,
					variant: "destructive"
				});
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
				title="Hello There"
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
				variant={"outline"}
				disabled={isLoading}
				size={"sm"}
				onClick={() => signIn("google", { callbackUrl: "/" })}
			>
				<Icons.google className="mr-2 h-4 w-4" />
					Register with Google
			</Button>

			<Button
				variant={"outline"}
				disabled={isLoading}
				size={"sm"}
				onClick={() => signIn("github", { callbackUrl: "/" })}
			>
				<GitHubLogoIcon className="mr-2 h-4 w-4" />
					Register with GitHub
			</Button>
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
					<Link href="/login"
						className="
						text-blue-500
						cursor-pointer
						hover:underline
						transition-all
						ease-in-out
						duration-200
						"
					>
					Sign In
					</Link>
				</div>

			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			// isOpen={registerModal.isOpen}
			// onClose={registerModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			title="Sign Up"
			actionLabel="Continue"
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default RegisterModal;