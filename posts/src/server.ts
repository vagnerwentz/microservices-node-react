import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';

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

server.post('/posts', async (request, response) => {
		const id = randomBytes(4).toString('hex');
		const { title } = request.body;

		const postCreated = {
			id, title
		}
	
		posts.push(postCreated);
	
		const event = {
			type: "PostCreated",
			data: {
				id,
				title
			}
		}
	
		await axios.post("http://localhost:4005/events", event).catch((error) => {
			console.log(error.message);
		});
	
		response.status(201).send(postCreated);	
});

server.post('/events', (request, response) => {
	console.log("Received Event ", request.body.type);

	response.send({});
});

export default server;