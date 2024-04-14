import React, { useEffect, useRef, useState } from 'react';
import autosize from 'autosize';
import { BsArrowUpCircleFill } from "react-icons/bs";
import { useAppContext } from '../context/AppProvider';
import genAI from '../googleClient';

function Chat() {
    const textareaRef = useRef();
    const [prompt, setPrompt] = useState('');
    const [promptEmbedding, setPromptEmbedding]= useState(null)
    const [response, setResponse] = useState('')
    const [loading, setLoading] = useState(false)
    const {embeddingPairs} = useAppContext()
    
    
    let tempEmbedding = null;
    let closest = null; 

    useEffect(() => {
        autosize(textareaRef.current);
    }, []);

    const onChange = (e) => {
        setPrompt(e.target.value)
    }

    function cosineSimilarity(vectorA, vectorB) {
        const dotProduct = vectorA.reduce((acc, curr, index) => acc + (curr * vectorB[index]), 0);
        const magnitudeA = Math.sqrt(vectorA.reduce((acc, curr) => acc + (curr * curr), 0));
        const magnitudeB = Math.sqrt(vectorB.reduce((acc, curr) => acc + (curr * curr), 0));
        return dotProduct / (magnitudeA * magnitudeB);
    }

    const generatePromptEmbedding = async() => {
        const model = genAI.getGenerativeModel({model: "embedding-001"})
        const result = await model.embedContent(prompt)
        const tempEmbedding = result.embedding
        console.log(tempEmbedding)
        return tempEmbedding
    }

    async function findClosestEmbedding(){
        let closestIndex = 0;
        let closestDistance = -1;

        embeddingPairs.forEach((embeddingPair, index) => {
            // Calculate cosine similarity between prompt embedding and current embedding        
            const similarity = cosineSimilarity(tempEmbedding.values, embeddingPair.embedding.values);

            // Update closest index if similarity is higher than previous best
            if (similarity > closestDistance) {
                closestIndex = index;
                closestDistance = similarity;
            }
        });

        closest = closestIndex
        console.log(closest)
    }

    const onSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        tempEmbedding = await generatePromptEmbedding()
        //const tempEmbedding = await generatePromptEmbedding()
        setPromptEmbedding(tempEmbedding) 
        findClosestEmbedding()

        console.log(closest)

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" }, {apiVersion: "v1beta"})
        

        //const {totalTokens} = await model.countTokens("Given this 10-K financial document about a company, " 
        //+ embeddingPairs[closest].chunk + "answer this question: " + prompt)
        //console.log(totalTokens)
        //console.log(embeddingPairs[closest].chunk)
        const result = await model.generateContent("Given this 10-K financial document about a company, " 
        + embeddingPairs[closest].chunk + "answer this question: " + prompt + "and respond in plain text")
        
        const response = await result.response
        const text = response.text()
        setResponse(text)
        setLoading(false)

        setPrompt('')
    }
    
    return (
        <div className="flex flex-col justify-between h-screen">
            <div>
                <h1 className="text-primary font-bold text-3xl">Chat with Documents</h1>
                <p>{loading? 'Loading...' : response}</p>
            </div>
            
            
            <div className="btm-nav p-10">
                <form>
                    <label className="input input-primary w-full flex justify-between items-center gap-2 mb-5">
                        <input
                            ref={textareaRef}
                            placeholder='Ask a question'
                            className='w-full'
                            onChange={onChange}
                        />    
                        <button 
                            type="submit"
                            className='py-5'
                            disabled={prompt.length === 0}
                            onClick={onSubmit}
                        >
                            <BsArrowUpCircleFill 
                                size={30}
                                color={prompt.length === 0 ? 'oklch(var(--s))' : 'oklch(var(--p))'}
                            />
                        </button>
                    </label>
                </form>
            </div>
        </div>
    );
}

export default Chat;