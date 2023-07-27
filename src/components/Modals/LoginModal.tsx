"use client";

import React from "react";
import { useState } from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Modal from "@src/components/Modals/Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "@src/components/Heading";
import Input from "@src/components/Inputs/Input";
import { Button } from "@src/components/ui/Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icons } from "../Icons";
import { useToast } from "@src/hooks/use-toast";

const LoginModal = () => {
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FieldValues>({
		defaultValues: {
			username: "",
			email: "",
			password: ""
		}
	});
	const router = useRouter();
	const { toast } = useToast();

	const onSubmit: SubmitHandler<FieldValues> = async data => {
		setIsLoading(true);
		console.log(data);
		signIn("credentials", { redirect: false, ...data })
			.then(res => {
				console.log("res", res);
				if (res?.error) {
					toast({
						title: "Invalid Login",
						description:
							"There was an error logging you in, please recheck your inputs and try again.",
						variant: "destructive"
					});
				}
				router.back();
			})
			.catch(err => {
				//
				if (err instanceof TypeError) {
					router.back();
					setIsLoading(false);
					return;
				}
				toast({
					title: "There was an error logging you in",
					description: err.message,
					variant: "destructive"
				});
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const bodyContent = (
		<div className="flex flex-col justify-center w-full h-full gap-4">
			<Heading
				title="Welcome to Obelisk"
				subtitle="Welcome back! Login to your account to continue"
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
				variant={"outline"}
				disabled={isLoading}
				onClick={() => signIn("google", { callbackUrl: "/" })}
			>
				<Icons.google className="mr-2 h-4 w-4" />
				Log in with Google
			</Button>

			<Button
				variant={"outline"}
				disabled={isLoading}
				onClick={() => signIn("github", { callbackUrl: "/" })}
			>
				<GitHubLogoIcon className="mr-2 h-4 w-4" />
				Log in with GitHub
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
					flex
					items-center
					gap-2
					"
				>
					<div>Don&apos;t have an account?</div>
					<Link
						href="/register"
						className="
						text-blue-500
						cursor-pointer
						hover:underline
						transition-all
						ease-in-out
						duration-200
						"
					>
						Sign Up
					</Link>
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			// isOpen={loginModal.isOpen}
			// onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			title="Log In"
			actionLabel="Continue"
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default LoginModal;
