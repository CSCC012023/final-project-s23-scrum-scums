"use client";

import React, { useEffect, useState } from "react";
import "@uploadthing/react/styles.css";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../api/uploadthing/core";
import Link from "next/link";
import ProfileImage from "@src/components/ProfileImage";
import axios from "axios";
 
export default function Home() {
	const [images, setImages] = useState<{fileUrl: string; fileKey: string;}[]>([]);
	const [fileUrl, setfileUrl] = useState("");

	const title = images.length ? (
		<>
			<p>Upload Complete!</p>
			<p className="mt-2">{images.length} files</p>
		</>) : null;

	const fetchImage	= async () => {
		try {
			if	(fileUrl	=== "") return;
			else{
				console.log(fileUrl);
				const { data } =  await axios.patch("/api/profileimage", {"imageUrl": fileUrl});
				console.log(data.message);
				window.location.reload();
			}
		}
		catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchImage();
	}, [fileUrl]);


	const imgList = (
		<>
			{title}
			<ul>
				{images.map(image => (
					<li key={image.fileUrl} className="mt-2">
						<Link href={image.fileUrl} target="_blank">
							{image.fileUrl}
						</Link>
					</li>
				))}
			</ul>
		</>
	);



	return (
		<div className="flex min-h-screen flex-col items-center justify-start p-24">
			<UploadButton<OurFileRouter>
				endpoint="profilePicture"
				onClientUploadComplete={(res) => {
					if (res) {
						setImages(res);
						const fileKey = JSON.parse(JSON.stringify(res[0].fileKey));
						const fileUrl = "https://utfs.io/f/" + fileKey;
						console.log(fileUrl);
						setfileUrl(fileUrl);
					}
					// alert("Upload Completed");
				}}
				onUploadError={(error: Error) => {
					// Do something with the error.
					alert(`ERROR! ${error.message}`);
				}}
			/>
			{imgList}
			{/* {<ProfileImage key={fileUrl}/>} */}
		</div>
	);
}