"use client";

import { Toaster } from "react-hot-toast";
import React from "react";

const ToasterProvider = () => {
	return (
		<Toaster
			position="top-center"
			reverseOrder={false}
		/>
	);
};

export default ToasterProvider;