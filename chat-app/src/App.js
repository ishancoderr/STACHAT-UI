import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import CryptoJS from 'crypto-js';
import chatLogo from './images/logo-.webp';
import newMsg from './images/msg.png';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-3.5-turbo"); 
  const chatRef = useRef(null); 

  const questions = [
    "Which products are associated with the instrument 'TROPOMI,' and what are their respective temporal and spatial extents?",
    "How many products are produced by the organization 'DLR - German Remote Sensing Data Center (DFD),' and what are their names?",
    "How many products use the sensor type 'Optical,' and what are their visualization URLs?",
    "Which products have a temporal extent that includes the year 2022, and what are their download links?",
    "Compare the spatial extents of the products 'Sentinel-2 L2A Maja' and 'Sentinel-2 L3A Monthly WASP Products.' What are the differences in their coverage areas?"
  ];

  useEffect(() => {
    // Automatically scroll to the bottom when messages update
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendQuery = async (question) => {
    const query = question || input;
    if (!query.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text: query }]);
    setInput('');
    setLoading(true);

    try {
      const body = JSON.stringify({ question: query, model_name: selectedModel });
      const secret = process.env.REACT_APP_WEBHOOK_SECRET;
      let headers = {
        'Content-Type': 'application/json',
      };

      if (secret) {
        const signature = CryptoJS.HmacSHA256(body, secret).toString(CryptoJS.enc.Hex);
        headers['X-Hub-Signature-256'] = `sha256=${signature}`;
      }

      const response = await fetch('http://localhost:8000/webhook', {
        method: 'POST',
        headers: headers,
        body: body,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await response.json();
      const formattedResponse = data.response
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
        .replace(/\n/g, '<br/>');

      setMessages((prev) => [...prev, { sender: 'bot', text: formattedResponse, isHtml: true }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Sorry, something went wrong. Please try again.' }]);
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <div className="sidebar">
        <div className="sidebar-header">
          <img src={chatLogo} alt="Stachat Logo" className="chatLogo" />
          <h1>StaChat</h1>
        </div>
        <div className="upperSlide">
          <div className="upperSlideTop">
            <button className="mitBtn" onClick={() => setMessages([])}>
              <img src={newMsg} alt="ChatGPT Logo" className="newMsg" />
              New Chat
            </button>
            <div className="model-selector">
              <label htmlFor="model-select">Select Model:</label>
              <select
                id="model-select"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
              >
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="gpt-4-turbo">GPT-4 Turbo</option> {/* if need to add more models add them here */}
              </select>
            </div>
            <div className="upperSideBottom">
              {questions.map((question, index) => (
                <button key={index} className="query" onClick={() => sendQuery(question)}>
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="chat-container" ref={chatRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <div className="message-content" dangerouslySetInnerHTML={msg.isHtml ? { __html: msg.text } : { __html: msg.text.replace(/\n/g, '<br/>') }}></div>
            </div>
          ))}
          {loading && <div className="loading">Loading...</div>}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            onKeyPress={(e) => e.key === 'Enter' && sendQuery()}
            disabled={loading}
          />
          <button onClick={() => sendQuery()} disabled={loading}>
            {loading ? 'Loading...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;