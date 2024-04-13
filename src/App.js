import { useState, useEffect } from "react";
import genAI from "./googleClient";
function App() {
  const [story, setStory] = useState('')
  const [prompt, setPrompt]= useState('')
  const [loading, setLoading] = useState(false)
  const onChange = (e) => {
    setPrompt(e.target.value)
  }
  const run = async (e) => {
    e.preventDefault()
    const model = genAI.getGenerativeModel({model: "gemini-pro"})

    setLoading(true)
    const result = await model.generateContent(prompt)
    const response = await result.response
    setLoading(false)

    const text = response.text()
    setStory(text)
  }
  return (
    <div className="p-5">
      <div className="flex justify-center">
        <form>
          <input 
            className="input input-bordered input-neutral"
            onChange={onChange}
          >

          </input>
          <button type='submit' className="btn btn-primary ml-5" onClick={run}>Run</button>
        </form>
      </div>
      
      <p>{loading ? 'loading' : story}</p>
    </div>
  );
}

export default App;
