import express from "express";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

import { Comments } from './protocols/interfaces';
import { CommentStatusModeration } from './protocols/enum';

const server = express();

server.use(express.json());
server.use(cors());

const commentsByPostId: Comments[] = [];

server.get("/posts/:id/comments", (request, response) => {
  const postId = request.params.id;
  const comments = commentsByPostId.filter((comment) => {
    if (comment?.postId === postId) return comment;
  });
  response.send(comments);
});

server.post("/posts/:id/comments", async (request, response) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = request.body;
  const postId = request.params.id;

  commentsByPostId.push({
    postId: postId,
    id: commentId,
    content,
    status: CommentStatusModeration.pending
  });

  const event = {
    type: "CommentCreated",
    data: {
      content,
      id: commentId,
      postId: postId,
      status: CommentStatusModeration.pending
    },
  };

  await axios.post("http://localhost:4005/events", event).catch((error) => {
    console.log(error.message);
  });

  const comments = commentsByPostId.filter((comment) => {
    if (comment?.postId === postId) return comment;
  });

  response.status(201).send(comments);
});

server.post("/events", async (request, response) => {
  console.log("Received Event ", request.body.type);

  const { type, data } = request.body;

  if (type === 'CommentModerated') {
    const { postId, id, status, content } = data;

    const comments = commentsByPostId.filter((comment) => {
      if (comment?.postId === postId) return comment;
    });

    const comment = comments.find(comment => {
      return comment.id === id;
    });

    comment!.status = status;

    await axios.post('http://localhost:4005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        postId,
        status,
        content
      }
    })
  }

  response.send({});
});

export default server;
