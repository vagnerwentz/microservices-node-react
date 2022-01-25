import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';

const server = express();

server.use(express.json());
server.use(cors());

interface Comments {
    id: string;
    content: string;
}

const commentsByPostId: Comments[] = [];

server.get('/posts/:id/comments', (request, response) => {
		const postId = request.params.id;
    response.send(commentsByPostId[Number(postId)] || []);
});

server.post('/posts/:id/comments', (request, response) => {
	const commentId = randomBytes(4).toString('hex');
	const { content } = request.body;
	const postId = request.params.id;

	const comments = commentsByPostId[Number(postId)] || [];

	if (Array.isArray(comments)) {
		comments.push({
			id: commentId,
			content,
		});
	}

	commentsByPostId[Number(postId)] = comments;

	response.status(201).send(comments);
});

export default server;