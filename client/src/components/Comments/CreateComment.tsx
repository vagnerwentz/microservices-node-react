import { FormEvent, useState } from "react";
import axios from 'axios';

interface CreateCommentProps {
	postId: string;
}

function CreateComment({ postId }: CreateCommentProps) {
	const [content, setContent] = useState('');

	const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
			content
		});

		setContent('');
	}

	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label>New Comment</label>
					<input 
						type="text" 
						className="form-control" 
						value={content} 
						onChange={e => setContent(e.target.value)} 
					/>
				</div>
				<button className="btn btn-primary">Submit</button>
			</form>
		</div>
	);
}

export { CreateComment }