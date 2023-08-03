import React from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

interface EditorProps {
	type: "post" | "comment";
	text: string;
	onTextChange: (text: string) => void;
}

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const Editor: React.FC<EditorProps> = ({ type, text, onTextChange }) => {
	const [height, setHeight] = useState(0);
	const getWindowsHeight = () => {
		const { innerHeight: height } = window;
		setHeight(height);
	};
	useEffect(() => {
		getWindowsHeight();
		window.addEventListener("resize", getWindowsHeight);
	});

	const inputChange = (e: string | undefined) => {
		const typedText = e;
		onTextChange(typedText);
	};
	return (
		<div className="h-[80vh]">
			<MDEditor
				className="w-full"
				value={text}
				height={height * 0.8}
				onChange={e => inputChange(e)}
			/>
		</div>
	);
};

export default Editor;
