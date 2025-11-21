import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import DestinationCard from '../components/DestinationCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ChatInterface from '../components/ChatInterface';

const Home = () => {
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        // Fetch destinations from backend
        const fetchDestinations = async () => {
            try {
                const res = await axios.get('http://localhost:8000/destinations/');
                setDestinations(res.data);
            } catch (err) {
                console.error("Failed to fetch destinations", err);
                // Fallback data for demo if backend is empty
                setDestinations([
                    {
                        id: 1,
                        name: "Kyoto, Japan",
                        country: "Japan",
                        description: "Experience the timeless beauty of ancient temples, traditional tea ceremonies, and stunning cherry blossoms in Japan's cultural capital.",
                        image_url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
                        tags: "Culture, History, Nature",
                        rating: 4.9
                    },
                    {
                        id: 2,
                        name: "Santorini, Greece",
                        country: "Greece",
                        description: "Iconic white-washed buildings with blue domes overlooking the crystal clear Aegean Sea. The perfect romantic getaway.",
                        image_url: "https://images.unsplash.com/photo-1613395877344-13d4c280d288?auto=format&fit=crop&w=800&q=80",
                        tags: "Beach, Romance, Luxury",
                        rating: 4.8
                    },
                    {
                        id: 3,
                        name: "Machu Picchu, Peru",
                        country: "Peru",
                        description: "Explore the mysterious Incan citadel set high in the Andes Mountains. A breathtaking adventure for history buffs and hikers.",
                        image_url: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80",
                        tags: "Adventure, History, Hiking",
                        rating: 4.9
                    }
                ]);
            }
        };

        fetchDestinations();
    }, []);

    return (
        <div className="container" style={{ paddingTop: '100px', paddingBottom: '50px' }}>
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
                <h1 className="text-gradient" style={{ fontSize: '4rem', marginBottom: '1rem', lineHeight: 1.1 }}>
                    Discover Your Next<br />Adventure
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
                    Explore the world's most breathtaking destinations with the help of our AI-powered travel guide.
                </p>
                <Link to="/guide" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    Start Planning <ArrowRight size={20} />
                </Link>
            </motion.section>

            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', margin: 0 }}>Trending Destinations</h2>
                    <button style={{ background: 'transparent', color: 'var(--accent-color)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        View all <ArrowRight size={16} />
                    </button>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {destinations.map((dest, index) => (
                        <motion.div
                            key={dest.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <DestinationCard destination={dest} onClick={() => console.log('Clicked', dest.name)} />
                        </motion.div>
                    ))}
                </div>
            </section>

            <section style={{ marginTop: '6rem', marginBottom: '4rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Ask Our AI Guide</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Get personalized recommendations and travel tips instantly.</p>
                </div>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <ChatInterface />
                </div>
            </section>
        </div>
    );
};

export default Home;
