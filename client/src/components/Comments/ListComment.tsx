import { useEffect, useState } from "react";
import axios from 'axios';

interface ListCommentProps {
	postId: string;
}

interface CommentsProps {
	id: string;
	content: string;
}

function ListComment({ postId }: ListCommentProps) {
    const [comments, setComments] = useState<CommentsProps[]>([]);

		const fetchData = async() => {
			const response = await axios.get(`http://localhost:4001/posts/${postId}/comments`);

			setComments(response.data);
		}

		useEffect(() => {
			fetchData();
		}, []);

		const renderedComments = comments.map(comment => {
			console.log("comment.id", comment.id);
			return (
				<li key={comment.id}>
					{comment.content}
				</li>
			)
		})

    return (
        <ul>
					{renderedComments}
				</ul>
    )
}

export { ListComment };