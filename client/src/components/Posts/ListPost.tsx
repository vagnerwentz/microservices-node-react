import { useEffect, useState } from 'react';
import axios from 'axios';

import { CreateComment } from '../Comments/CreateComment';

interface Posts {
	id: string;
	title: string;
}

function ListPost() {
	const [posts, setPosts] = useState<Posts[]>([]);

	const fetchPosts = async () => {
		const response = await axios.get('http://localhost:4000/posts');

		setPosts(response.data);
	}

	useEffect(() => {
		fetchPosts();
	}, []);

	const renderedPosts = posts.map((post) => {
		return (
			<div 
				className="card" 
				style={{ width: "30%", marginBottom: "20px"}}
				key={post.id}
			>
				<div className="card-body">
					<h3>{post.title}</h3>

					<CreateComment postId={post.id}/>
				</div>
			</div>
		)
	});

	return (
		<div className="d-flex flex-row flex-wrap justify-content-between">
			{renderedPosts}
		</div>
	);
}

export { ListPost };