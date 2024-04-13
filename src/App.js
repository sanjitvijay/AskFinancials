import { useState, useEffect } from "react";
import genAI from "./googleClient";
function App() {
  const [story, setStory] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const onChange = (e) => {
    setPrompt(e.target.value);
  };
  const STORY_CHUNK_SIZE = 10; // Update story every 100 characters

  const run = async (e) => {
    setStory("");
    e.preventDefault();
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    let text;
    const result = await model.generateContentStream([prompt]);
    for await (const chunk of result.stream) {
      text += chunk.text();
      if (text.length > STORY_CHUNK_SIZE) {
        while (text.length != 0) {
          const slicedText = text.slice(0, 10);
          setStory(prevStory => prevStory + slicedText);
          text = text.slice(10);
        }
      }
    }
  };
  return (
    <div className="p-5">
      <div className="flex justify-center">
        <form>
          <input
            className="input input-bordered input-neutral"
            onChange={onChange}
          ></input>
          <button type="submit" className="btn btn-primary ml-5" onClick={run}>
            Run
          </button>
        </form>
      </div>

      <p>{loading ? "loading" : story}</p>
    </div>
  );
}

export default App;
