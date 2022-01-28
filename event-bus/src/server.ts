import express from 'express';
import cors from 'cors';
import axios from 'axios';

const server = express();

server.use(express.json());
server.use(cors());

server.post('/events', (request, response) => {
	const event = request.body;

    console.log("Event", event);

    axios.post('http://localhost:4000/events', event);
    axios.post('http://localhost:4001/events', event);

    response.send({ status: "OK" });
});

export default server;