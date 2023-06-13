import Comment from "@components/Comment";
import { CommentProps } from "@components/Comment";
import React, { useState, useEffect } from "react";
import axios from "axios";

const comment = `A paragraph with *emphasis* and **strong importance**.
# Big header
## Medium header`;

const Comments = () => {
    return (
        <div className="h-full w-full">
            <Comment
                content={comment}
                author="ObeliskUser1"
                createdAt={new Date()}
            />
        </div>
    )
};

export default Comments;