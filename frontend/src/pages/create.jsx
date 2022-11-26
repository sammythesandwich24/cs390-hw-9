import { useState } from "react";
import { Link } from "react-router-dom";

export function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [done, setDone] = useState(false);
  const [password, setPassword] = useState("");
  const [wrong, setWrong] = useState(false);
  async function handleSubmit(e) {
    setWrong(false);
    e.preventDefault();
    const requestData = JSON.stringify({ title, content, password });
    const headers = { "content-type": "application/json" };

    const response = await fetch("http://localhost:3000/blog/create-post", {
      method: "post",
      headers,
      body: requestData,
    });
    const json = await response.json();

    if (json.error) {
      return setWrong(true);
    }

    setDone(true);

    console.log(requestData);
  }
  if (done) {
    return (
      <div>
        <Link to="/view">Check out your blog post</Link>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="title"
        value={title}
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
  );
}
