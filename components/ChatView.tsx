
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { Icons } from '../constants';
import { chatWithGemini } from '../services/geminiService';

const ChatView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const chatHistory = messages.concat(userMessage).map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await chatWithGemini(chatHistory);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I encountered an error processing your request. Please check your API configuration.",
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/50">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-2xl">
              <Icons.Chat />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Nexus Chat</h2>
              <p>The core of Gemini 3.0. Ask me anything.</p>
            </div>
          </div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center ${
              msg.role === 'user' ? 'bg-blue-600' : 'bg-slate-700'
            }`}>
              {msg.role === 'user' ? <Icons.User /> : <Icons.Assistant />}
            </div>
            <div className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl whitespace-pre-wrap ${
              msg.role === 'user' 
              ? 'bg-blue-600 text-white rounded-tr-none' 
              : 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center animate-pulse">
              <Icons.Assistant />
            </div>
            <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-700">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 md:p-8 bg-gradient-to-t from-slate-900 via-slate-900 to-transparent">
        <div className="max-w-4xl mx-auto relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-2xl py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all placeholder:text-slate-500"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white rounded-xl flex items-center justify-center transition-colors"
          >
            <Icons.Send />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
