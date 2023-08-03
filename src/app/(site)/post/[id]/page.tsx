import PostSection from "@src/components/PostSection";
import CommentSection from "@src/components/CommentSection";
import React from "react";
import { Separator } from "@src/components/ui/Separator";

const Post = ({ params }: { params: { id: string } }) => {
	const id = parseInt(params.id);

	// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();
	// 	console.log("submitting", content, id);
	// 	await axios.post("/api/comment", { content, id });
	// 	setContent("");
	// };

	return (
		<div className="h-full w-full">
			<div className="flex flex-col items-center justify-center">
				<PostSection id={id} />
				<Separator />
				<section className="comment-box w-3/5">
					{/* <form
						onSubmit={handleSubmit}
						className="flex flex-col w-full"
					>
						 <textarea
							className="textarea textarea-secondary py-4 w-full"
							name="comment"
							autoComplete="off"
							value={content}
							onChange={e => setContent(e.target.value)}
							required
						/>
						<button type="submit" className="btn btn-primary mt-2">
							Submit Comment
						</button>
					</form>
					*/}
					<div
						className="flex flex-col items-center w-full
							p-6 bg-secondary rounded-md my-4"
					>
						<CommentSection postId={id} />
					</div>
				</section>
			</div>
		</div>
	);
};

export default Post;
