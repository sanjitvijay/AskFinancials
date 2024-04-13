import { useState, useEffect } from "react";
import genAI from "../googleClient";
import RightArrow from "../components/RightArrow";
import { useAppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";
function Home() {
    const [story, setStory] = useState('')
    const [prompt, setPrompt] = useState('')
    const [loading, setLoading] = useState(false)
    const [showFileUpload, setShowFileUpload] = useState(false)
    const {files, onFileChange} = useAppContext()

    const navigate = useNavigate()

    const onChange = (e) => {
        setPrompt(e.target.value)
    }


    const run = async (e) => {
        e.preventDefault()
        const model = genAI.getGenerativeModel({ model: "gemini-pro" })

        setLoading(true)
        const result = await model.generateContent(prompt)
        const response = await result.response
        setLoading(false)

        const text = response.text()
        setStory(text)
    }
    return (
        <div>
            <div className="flex justify-center items-center mt-44">
                <h1 className="text-secondary font-bold text-5xl text-center">Financial Research <span className="text-primary"> Made Easy</span></h1>
            </div>
            <p className="mt-3 text-center">Simply upload your company's past three 10-K reports</p>
            <div className="flex justify-center">
                {!showFileUpload && 
                    <button 
                        className="btn btn-primary rounded-full mt-3"
                        onClick={() => setShowFileUpload(true)}
                    >
                        Get Started <RightArrow/>
                    </button>
                }
            </div>

            {showFileUpload &&
                <form>
                    <div className="flex justify-center mt-5">
                        <input 
                            type="file" 
                            multiple
                            className="file-input file-input-primary w-full max-w-xs hover:shadow-md hover:shadow-primary" 
                            onChange={onFileChange}
                        />
                    </div>
                    
                    <div className="flex justify-center mt-5">
                        <button 
                            className="btn btn-primary rounded-full"
                            onClick={navigate('/dashboard')}
                        >
                            Generate Insights <RightArrow/>
                        </button>
                    </div>
                </form>
            }
        </div>
    );
}

export default Home;