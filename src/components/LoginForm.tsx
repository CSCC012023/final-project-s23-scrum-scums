/// similar to login modal but for the login page itself
"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "../hooks/use-toast";
import Heading from "./Heading";
import Input from "./Inputs/Input";
import { Separator } from "./ui/Separator";
import { Button } from "./ui/Button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Icons } from "./Icons";


const LoginForm: FC = () => {
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
		signIn("credentials", { redirect: false, ...data })
			.then(res => {
				if (res?.error) {
					toast({
						title: "Invalid Login",
						description: "There was an error logging you in, please recheck your inputs and try again.",
						variant: "destructive"
					});
				}

				router.push("/");
			})
			.catch((err) => {
				toast({
					title: "There was an error logging you in",
					description: err.response.data.error,
					variant: "destructive"
				});
			})
			.finally(() => {
				setIsLoading(false);
			});
	};
	return (
		<>
			<div
				className="flex flex-col justify-center w-full h-full gap-4"
			>
				<Heading
					title="Welcome Back"
					subtitle="Login to your account to continue"
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
			<Button
				disabled={isLoading}
				onClick={handleSubmit(onSubmit)}

				className="w-full"
			>
				Login
			</Button>

			<Separator/>
			<div className="flex flex-col justify-center w-full h-full gap-4">
				<Button
					variant={"outline"}
					disabled={isLoading}
					size={"sm"}
					onClick={() => signIn("google", { callbackUrl: "/" })}
				>
					<Icons.google className="mr-2 h-4 w-4" />
						Log in with Google
				</Button>

				<Button
					variant={"outline"}
					disabled={isLoading}
					size={"sm"}
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
						<Link href="/register"
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
		</>
	);
};

export default LoginForm;