import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';

const server = express();

server.use(express.json());
server.use(cors());

interface Posts {
    id: string;
    title: string;
}

const posts: Posts[] = [];

server.get('/posts', (request, response) => {
    response.send(posts);
});

server.post('/posts', (request, response) => {
	const id = randomBytes(4).toString('hex');
	const { title } = request.body;

	const postCreated = {
		id, title
	}

	posts.push(postCreated)

	response.status(201).send(postCreated);
});

export default server;