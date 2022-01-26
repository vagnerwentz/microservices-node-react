import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';

const server = express();

server.use(express.json());
server.use(cors());

interface Comments {
  postId: string;
  id: string;
  content: string;
}

const commentsByPostId: Comments[] = [];

server.get('/posts/:id/comments', (request, response) => {
    const postId = request.params.id;
    const comments = commentsByPostId.filter((comment) => {
      if (comment?.postId === postId) return comment;
    })
    response.send(comments);
});

server.post('/posts/:id/comments', (request, response) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = request.body;
  const postId = request.params.id;

  commentsByPostId.push({
    postId: postId,
    id: commentId,
    content
  });

  const comments = commentsByPostId.filter((comment) => {
    if (comment?.postId === postId) return comment;
  })

  response.status(201).send(comments);
});

export default server;