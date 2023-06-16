import ReactMarkdown from "react-markdown";
import React from "react";
import remarkGfm from "remark-gfm";

interface EditorProps {
	type: "inscription" | "comment"
	text: string
	onTextChange: (text: string) => void
}

const Editor = ({
	type,
	text,
	onTextChange
}: EditorProps
) => {
	const inputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const typedText = e.target.value;
		onTextChange(typedText);
	};
	return (
		<div className="flex flex-row items-center justify-center h-[80vh]">
			<label className="flex flex-col items-center w-1/2 h-[80vh] mx-2">
				<textarea spellCheck="false" name="editor" autoFocus onChange={(e) => inputChange(e)} defaultValue={text} maxLength={28000}
					// eslint-disable-next-line react/jsx-no-duplicate-props
					className="border-2 border-black rounded-lg w-full break-words font-mono px-2 h-full resize-none"
				/>
			</label>
			{ type == "inscription" &&
			<div
				className="border-2 border-black rounded-lg w-1/2 h-full mx-2 px-2 font-robotoslab overflow-y-scroll">
				<ReactMarkdown remarkPlugins={[remarkGfm]} children={text} />
			</div>
			}
		</div>
	);
};

export default Editor;