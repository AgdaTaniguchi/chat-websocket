import { useCallback, useEffect, useRef, useState } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import Message from "./components/Message";

function App() {
    const [socketUrl, setSocketUrl] = useState("ws://localhost:8765/");

    const [userMessage, setUserMessage] = useState("");
    const [messageHistory, setMessageHistory] = useState([]);
    const chatRef = useRef(null);

    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

    const handleClickSendMessage = useCallback((event, userMessage) => {
        event.preventDefault();
        event.target.reset();
        sendMessage(userMessage);
    }, []);
    
    useEffect(() => {
        if(lastMessage !== null) {
            setMessageHistory((prev) => prev.concat(lastMessage));
        }

        setTimeout(() => {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }, 100);
    }, [lastMessage, setMessageHistory]);

    return (
        <>
            <div className="h-screen flex flex-col">
                <div ref={chatRef} className="h-full w-full max-w-7xl overflow-y-auto overflow-x-hidden px-24 mx-auto mt-12 scroll-smooth">
                    {
                        messageHistory.length > 0 &&
                        messageHistory.map((message, i) => (
                            <Message key={i} message={message ? message.data : null} />
                        ))
                    }
                </div>
                <form className="w-full max-w-7xl px-24 mx-auto mb-24 mt-12 flex gap-6" onSubmit={(event) => handleClickSendMessage(event, userMessage)} >
                    <input type="text" onChange={(e) => {setUserMessage(e.target.value)}} />
                    <input type="submit" value="Send message" />
                </form>
            </div>
        </>
    );
}

export default App;