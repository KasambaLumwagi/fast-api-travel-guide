import React from 'react';
import ChatInterface from '../components/ChatInterface';
import { motion } from 'framer-motion';

const Guide = () => {
    return (
        <div className="container" style={{ paddingTop: '100px', paddingBottom: '50px' }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '4rem',
                alignItems: 'center'
            }}>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                        Your Personal <br />
                        <span className="text-gradient">AI Travel Expert</span>
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
                        Not sure where to go? Need a custom itinerary? Our AI assistant can help you plan the perfect trip tailored to your preferences, budget, and style.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="glass-panel" style={{ padding: '1.5rem' }}>
                            <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent-color)' }}>Personalized Itineraries</h3>
                            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Get day-by-day plans based on your interests.</p>
                        </div>
                        <div className="glass-panel" style={{ padding: '1.5rem' }}>
                            <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent-color)' }}>Local Insights</h3>
                            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Discover hidden gems and local customs.</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <ChatInterface />
                </motion.div>
            </div>
        </div>
    );
};

export default Guide;
