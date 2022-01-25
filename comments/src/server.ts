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
    response.send(commentsByPostId[Number(request.params.id)] || []);
});

server.post('/posts/:id/comments', (request, response) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = request.body;

    const comments = commentsByPostId[Number(request.params.id)] || [];

    if (Array.isArray(comments)) {
        comments.push({
            id: commentId,
            content
        });
    }

    commentsByPostId[Number(request.params.id)] = comments;

    response.status(201).send(comments);
});

export default server;