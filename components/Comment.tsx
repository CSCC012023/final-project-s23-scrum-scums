import React from "react";
import ReactMarkdown from "react-markdown";

export interface CommentProps {
    content: string,
    author: string,
    createdAt: Date
}

const Comment = ({ content, author, createdAt }: CommentProps) => {
    return(
        <div>
            <div className="flex flex-row justify-between bg-gray-200 flex-wrap">
                <div className="basis-full flex flex-row justify-between border-b-2 border-gray-600">
                    <div className="text-sm">{author}</div>
                    <div className="text-xs">{createdAt.toLocaleString()}</div>
                </div>
                <ReactMarkdown className="prose lg: prose-base" children={content}/>
            </div>
        </div>
    );
};

export default Comment; 