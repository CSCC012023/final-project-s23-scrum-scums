/* eslint-disable @typescript-eslint/no-non-null-assertion */
"use client";
import { FC } from "react";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import rangeParser from "parse-numeric-range";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import c from "react-syntax-highlighter/dist/esm/languages/prism/c";
import csharp from "react-syntax-highlighter/dist/esm/languages/prism/csharp";
import cpp from "react-syntax-highlighter/dist/esm/languages/prism/cpp";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import go from "react-syntax-highlighter/dist/esm/languages/prism/go";
import java from "react-syntax-highlighter/dist/esm/languages/prism/java";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import julia from "react-syntax-highlighter/dist/esm/languages/prism/julia";
import rust from "react-syntax-highlighter/dist/esm/languages/prism/rust";
import haskell from "react-syntax-highlighter/dist/esm/languages/prism/haskell";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import sql from "react-syntax-highlighter/dist/esm/languages/prism/sql";

SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("c", c);
SyntaxHighlighter.registerLanguage("csharp", csharp);
SyntaxHighlighter.registerLanguage("cpp", cpp);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("go", go);
SyntaxHighlighter.registerLanguage("java", java);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("julia", julia);
SyntaxHighlighter.registerLanguage("rust", rust);
SyntaxHighlighter.registerLanguage("haskell", haskell);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("sql", sql);

interface MarkdownRendererProps {
	content?: string;
}

/// from https://amirardalan.com/blog/syntax-highlight-code-in-markdown

const MarkdownRenderer: FC<MarkdownRendererProps> = ({ content }) => {
	const syntaxTheme = oneDark;

	const MarkdownComponents: object = {
		code({ node, inline, className, ...props }) {
			const hasLang = /language-(\w+)/.exec(className || "");
			const hasMeta = node?.data?.meta;

			const applyHighlights: object = (applyHighlights: number) => {
				if (hasMeta) {
					const RE = /{([\d,-]+)}/;
					const metadata = node.data.meta?.replace(/\s/g, "");
					const strlineNumbers = RE?.test(metadata)
						? // @ts-expect-error can't tell meta isn't null if we enter
						  RE?.exec(metadata)[1]
						: "0";
					const highlightLines = rangeParser(strlineNumbers);
					const highlight = highlightLines;
					// @ts-expect-error its fine if data is null
					const data: string = highlight.includes(applyHighlights)
						? "highlight"
						: null;
					return { data };
				} else {
					return {};
				}
			};

			return hasLang ? (
				<SyntaxHighlighter
					style={syntaxTheme}
					language={hasLang[1]}
					PreTag="div"
					className="codeStyle"
					wrapLines={hasMeta}
					useInlineStyles={true}
					lineProps={applyHighlights}
				>
					{props.children}
				</SyntaxHighlighter>
			) : (
				<code className={className} {...props} />
			);
		}
	};

	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			components={MarkdownComponents}
		>
			{content!}
		</ReactMarkdown>
	);
};

export default MarkdownRenderer;
