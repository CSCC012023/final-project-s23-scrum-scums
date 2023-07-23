/// similar to register modal but for the register page itself
"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "./Heading";
import Input from "./Inputs/Input";
import { Separator } from "./ui/Separator";
import { Button } from "./ui/Button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useToast } from "@src/hooks/use-toast";
import { Icons } from "./Icons";


const RegisterForm = () => {
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
	return (
		<>
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

			<Button
				disabled={isLoading}
				onClick={handleSubmit(onSubmit)}
				className="w-full"
			>
				Register
			</Button>

			<Separator/>
			<div className="flex flex-col justify-center w-full h-full gap-4">
				<Button
					variant={"outline"}
					disabled={isLoading}
					onClick={() => signIn("google", { callbackUrl: "/" })}
				>
					<Icons.google className="mr-2 h-4 w-4" />
					Register with Google
				</Button>

				<Button
					variant={"outline"}
					disabled={isLoading}
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
					flex
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
		</>
	);
};

export default RegisterForm;