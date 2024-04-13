import React, { useEffect, useRef, useState } from 'react';
import autosize from 'autosize';
import { BsArrowUpCircleFill } from "react-icons/bs";
function Chat() {
    const textareaRef = useRef();
    const [prompt, setPrompt] = useState('');

    useEffect(() => {
        autosize(textareaRef.current);
    }, []);

    const onChange = (e) => {
        setPrompt(e.target.value)
    }
    return (
        <div className="flex flex-col justify-between h-screen">
            <h1 className="text-primary font-bold text-3xl">Chat with Document</h1>

            <div className="btm-nav p-3">
                <form>
                    <label className="input input-primary w-full flex justify-between items-center gap-2 mb-5">
                        <input
                            ref={textareaRef}
                            placeholder='Ask a question'
                            className='w-full'
                            onChange={onChange}
                        />    
                        <button 
                            className='py-5'
                            disabled={prompt.length === 0}
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