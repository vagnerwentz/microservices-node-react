import express from 'express';
import cors from 'cors';
import axios from 'axios';

const server = express();

server.use(express.json());
server.use(cors());

server.post('/events', (request, response) => {
	const event = request.body;

    console.log("Event", event);

    axios.post('http://localhost:4000/events', event); // Posts
    axios.post('http://localhost:4001/events', event); // Comments
    axios.post('http://localhost:4002/events', event); // Query
    axios.post('http://localhost:4003/events', event); // Moderation

    response.send({ status: "OK" });
});

export default server;