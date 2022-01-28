import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';

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

server.post('/posts/:id/comments', async (request, response) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = request.body;
  const postId = request.params.id;

  commentsByPostId.push({
    postId: postId,
    id: commentId,
    content
  });

  const event = {
    type: "CommentCreated",
    data: {
      content,
      id: commentId,
      postId: postId,
    }
  }

  await axios.post("http://localhost:4005/events", event).catch((error) => {
    console.log(error.message);
  })

  const comments = commentsByPostId.filter((comment) => {
    if (comment?.postId === postId) return comment;
  })

  response.status(201).send(comments);
});

server.post('/events', (request, response) => {
	console.log("Received Event ", request.body.type);

	response.send({});
});

export default server;