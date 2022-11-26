import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function View() {
  const [posts, setPosts] = useState([]);
  async function fetchPosts() {
    const req = await fetch("http://localhost:3000/blog/");
    const json = await req.json();
    setPosts(json);
  }
  useEffect(() => {
    fetchPosts();
  }, []);
  async function Delete(title) {
    const requestData = JSON.stringify({ title });
    const headers = { "content-type": "application/json" };

    const req = await fetch("http://localhost:3000/blog/delete-post", {
      method: "post",
      headers,
      body: requestData,
    });
    setPosts(await req.json());
  }
  const [edit, setEdit] = useState("");
  const [wrong, setWrong] = useState(false);
  const [newTitle, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setWrong(false);
    const requestData = JSON.stringify({
      oldTitle: edit,
      title: newTitle,
      content,
      password,
    });
    const headers = { "content-type": "application/json" };

    const response = await fetch("http://localhost:3000/blog/edit-post", {
      method: "post",
      headers,
      body: requestData,
    });
    const json = await response.json();

    if (json.error) {
      return setWrong(true);
    }
    setEdit(false);
    fetchPosts();
  }
  return (
    <div>
      <Link to="/"> Home</Link>
      {edit && (
        <div>
          <div>Edit {edit}</div>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="title"
              value={newTitle}
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.currentTarget.value)}
              ></textarea>
              <br />
              <input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </div>
            <button>Post</button>

            <br />
            {wrong && <div>Wrong Password</div>}
          </form>
        </div>
      )}
      <div>
        {posts.map((post) => (
          <div
            key={post.title}
            style={{
              border: "2px solid",
              width: "50vw",
              margin: "auto",
              textAlign: "center",
            }}
          >
            <h2 style={{ margin: "0.2rem" }}>{post.title}</h2>
            <div>{post.content}</div>
            <button onClick={() => Delete(post.title)}>Delete</button>
            <button onClick={() => setEdit(post.title)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}
