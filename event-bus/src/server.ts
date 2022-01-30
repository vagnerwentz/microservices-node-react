import express from 'express';
import cors from 'cors';
import axios from 'axios';

const server = express();

server.use(express.json());
server.use(cors());

interface Events {
    type: string;
    data: Object;
}

const events: Events[] = [];

server.post('/events', (request, response) => {
	const event: Events = request.body;

    events.push(event);

    console.log("Event", event);

    axios.post('http://localhost:4000/events', event).catch((error) => console.log(error.message)); // Posts
    axios.post('http://localhost:4001/events', event).catch((error) => console.log(error.message)); // Comments
    axios.post('http://localhost:4002/events', event).catch((error) => console.log(error.message)); // Query
    axios.post('http://localhost:4003/events', event).catch((error) => console.log(error.message)); // Moderation

    response.send({ status: "OK" });
});

server.get('/events', (request, response) => {
    response.send(events);
});

export default server;