import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const DestinationCard = ({ destination, onClick }) => {
    return (
        <motion.div
            className="glass-panel hover-scale"
            whileHover={{ y: -10 }}
            onClick={() => onClick(destination)}
            style={{
                overflow: 'hidden',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                <img
                    src={destination.image_url || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80'}
                    alt={destination.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(0,0,0,0.6)',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}>
                    <Star size={14} color="#fbbf24" fill="#fbbf24" />
                    <span style={{ fontSize: '0.9rem' }}>{destination.rating}</span>
                </div>
            </div>

            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{destination.name}</h3>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    <MapPin size={16} />
                    <span style={{ fontSize: '0.9rem' }}>{destination.country}</span>
                </div>

                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    lineHeight: '1.5',
                    margin: '0 0 1rem 0',
                    flex: 1
                }}>
                    {destination.description.substring(0, 100)}...
                </p>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {destination.tags.split(',').map((tag, i) => (
                        <span key={i} style={{
                            background: 'rgba(56, 189, 248, 0.1)',
                            color: 'var(--accent-color)',
                            padding: '4px 10px',
                            borderRadius: '20px',
                            fontSize: '0.8rem'
                        }}>
                            {tag.trim()}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default DestinationCard;
