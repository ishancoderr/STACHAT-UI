import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]); // Stores chat history
  const [input, setInput] = useState(''); // Stores user input

  // Function to send user query to the backend
  const sendQuery = async () => {
    if (!input.trim()) return; // Ignore empty queries

    // Add user message to chat history
    setMessages((prev) => [...prev, { sender: 'user', text: input }]);

    try {
      // Send query to the FastAPI backend
      const response = await fetch('http://localhost:5100/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await response.json();

      // Add bot response to chat history
      setMessages((prev) => [...prev, { sender: 'bot', text: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Sorry, something went wrong. Please try again.' },
      ]);
    }

    // Clear input field
    setInput('');
  };

  return (
    <div className="App">
      <div className="sidebar">
        <div className="upperSlide">
          <div className="upperSlideTop">
            <button className="mitBtn">
              <img src="" alt="" className="addBtn" />
              New Chat
            </button>
            <div className="upperSideBottom">
              <button className="query">
                <img src="" alt="" />
                What is Programming?
              </button>
              <button className="query">
                <img src="" alt="" />
                What is Programming?
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="chat-container">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <div className="message-content">{msg.text}</div>
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            onKeyPress={(e) => e.key === 'Enter' && sendQuery()}
          />
          <button onClick={sendQuery}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;