import express from 'express';
import axios from 'axios';
const server = express();

server.use(express.json());

server.post('/events', async (request, response) => {
	const { type, data } = request.body;

	if (type === 'CommentCreated') {
		const status = data.content.includes('bad') ? 'rejected' : 'approved';

		await axios.post('http://localhost:4005/events', {
			type: 'CommentModerated',
			data: {
				id: data.id,
				postId: data.postId,
				content: data.content,
				status,
			}
		})
	}

	response.send({});
})


export default server;