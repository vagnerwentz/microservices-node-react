import { CreatePost } from './components/Posts/CreatePost';
import { ListPost } from './components/Posts/ListPost';

function App() {
  return (
    <div className="container">
      <h1>Create Post</h1>
      <CreatePost />
      <hr />
      <h1>Posts</h1>
      <ListPost />
    </div>
  );
}

export default App;
