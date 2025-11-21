import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatInterface = () => {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I am your AI travel guide. Ask me anything about destinations, itineraries, or local tips!' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8000/ai/chat', {
                prompt: input,
                context: "User is looking for travel advice."
            });

            setMessages(prev => [...prev, { role: 'assistant', content: response.data.response }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error connecting to the travel brain." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-panel" style={{ height: '600px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{
                padding: '1.5rem',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
            }}>
                <div style={{
                    background: 'var(--accent-color)',
                    padding: '8px',
                    borderRadius: '50%',
                    boxShadow: '0 0 15px var(--accent-glow)'
                }}>
                    <Sparkles size={20} color="white" />
                </div>
                <h3 style={{ margin: 0 }}>AI Travel Assistant</h3>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <AnimatePresence>
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                display: 'flex',
                                gap: '12px',
                                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                maxWidth: '80%'
                            }}
                        >
                            {msg.role === 'assistant' && (
                                <div style={{
                                    background: 'var(--bg-accent)',
                                    padding: '8px',
                                    borderRadius: '50%',
                                    height: 'fit-content'
                                }}>
                                    <Bot size={18} />
                                </div>
                            )}

                            <div style={{
                                background: msg.role === 'user' ? 'var(--accent-color)' : 'var(--bg-accent)',
                                color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                                padding: '12px 16px',
                                borderRadius: '16px',
                                borderTopLeftRadius: msg.role === 'assistant' ? '4px' : '16px',
                                borderTopRightRadius: msg.role === 'user' ? '4px' : '16px',
                                lineHeight: '1.5',
                                overflowWrap: 'break-word'
                            }}>
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        img: ({ node, ...props }) => (
                                            <img {...props} style={{ maxWidth: '100%', borderRadius: '8px', marginTop: '10px' }} alt="Travel destination" />
                                        ),
                                        p: ({ node, ...props }) => <p style={{ margin: 0, marginBottom: '0.5em' }} {...props} />,
                                        ul: ({ node, ...props }) => <ul style={{ margin: 0, paddingLeft: '20px' }} {...props} />,
                                        li: ({ node, ...props }) => <li style={{ marginBottom: '4px' }} {...props} />
                                    }}
                                >
                                    {msg.content}
                                </ReactMarkdown>
                            </div>

                            {msg.role === 'user' && (
                                <div style={{
                                    background: 'var(--bg-accent)',
                                    padding: '8px',
                                    borderRadius: '50%',
                                    height: 'fit-content'
                                }}>
                                    <User size={18} />
                                </div>
                            )}
                        </motion.div>
                    ))}
                    {loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ display: 'flex', gap: '12px', alignSelf: 'flex-start' }}
                        >
                            <div style={{ background: 'var(--bg-accent)', padding: '8px', borderRadius: '50%' }}>
                                <Bot size={18} />
                            </div>
                            <div style={{
                                background: 'var(--bg-accent)',
                                padding: '12px 16px',
                                borderRadius: '16px',
                                borderTopLeftRadius: '4px',
                                display: 'flex',
                                gap: '4px'
                            }}>
                                <span className="typing-dot">.</span>
                                <span className="typing-dot">.</span>
                                <span className="typing-dot">.</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} style={{
                padding: '1.5rem',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                gap: '10px'
            }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about a destination..."
                    style={{
                        flex: 1,
                        background: 'var(--bg-primary)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: '1rem'
                    }}
                />
                <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '12px' }}>
                    <Send size={20} />
                </button>
            </form>
        </div>
    );
};

export default ChatInterface;
