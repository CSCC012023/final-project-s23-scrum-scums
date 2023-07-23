"use client";

import React, { useState, useRef } from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

interface EditableProps {
	content: string;
	submit: (bio: string) => Promise<void>;
}


const Editable: React.FC<EditableProps> = ({
	content,
	submit
}) => {
	const editableContent = useRef("");
	const [disabled, setDisabled] = useState(false);

	const handleChange = async (content: ContentEditableEvent) => {
		editableContent.current = content.target.value;
	};

	const handleBlur = async () => {
		setDisabled(true);
		// This should compare to original string. If no actual changes are made, don't submit
		await submit(editableContent.current);
		setDisabled(false);
	};

	return (
		<ContentEditable
			html={content}
			onChange={handleChange}
			onBlur={handleBlur}
			disabled={disabled}
		/>
	);
};


export default Editable;