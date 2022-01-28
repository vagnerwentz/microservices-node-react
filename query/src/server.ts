import express from "express";
import cors from "cors";

const server = express();

server.use(express.json());
server.use(cors());

interface Comments {
  id: string;
  content: string;
  status: "approved" | "pending" | "rejected";
}

interface Posts {
  id: string;
  title: string;
  comments: Comments[];
}

const posts: Posts[] = [];

server.get("/posts", (request, response) => {
  response.send(posts);
});

server.post("/events", (request, response) => {
  const { type, data } = request.body;

  if (type === "PostCreated") {
    const { id, title } = data;

    const postCreated = {
      id,
      title,
      comments: [],
    };

    posts.push(postCreated);
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts.find((post) => post.id === postId);

    post?.comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;

    const post = posts.find((post) => post.id === postId);

    const comment = post?.comments.find(comment => {
      return comment.id === id;
    });

    comment!.status = status;
    comment!.content = content;
  }

  console.log(posts);

  response.send({});
});

export default server;
