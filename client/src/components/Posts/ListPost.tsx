import { useEffect, useState } from "react";
import axios from "axios";

import { CreateComment } from "../Comments/CreateComment";
import { ListComment } from "../Comments/ListComment";

interface Comments {
  id: string;
  content: string;
  status: 'approved' | 'pending' | 'rejected';
}
interface Posts {
  id: string;
  title: string;
  comments: Comments[];
}

function ListPost() {
  const [posts, setPosts] = useState<Posts[]>([]);

  const fetchPosts = async () => {
    const response = await axios.get("http://localhost:4002/posts");
    setPosts(response.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = posts.map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <ListComment comments={post.comments} />
          <CreateComment postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
}

export { ListPost };
