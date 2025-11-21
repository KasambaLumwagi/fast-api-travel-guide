import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Map, MessageSquare } from 'lucide-react';
import '../styles/index.css';

const Navbar = () => {
  return (
    <nav className="glass-panel" style={{ 
      position: 'fixed', 
      top: '20px', 
      left: '50%', 
      transform: 'translateX(-50%)', 
      width: '90%', 
      maxWidth: '1200px', 
      zIndex: 1000,
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem', fontWeight: 'bold' }}>
        <Compass color="var(--accent-color)" size={32} />
        <span className="text-gradient">TravelAI</span>
      </Link>
      
      <div style={{ display: 'flex', gap: '30px' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
          <Map size={20} />
          <span>Explore</span>
        </Link>
        <Link to="/guide" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
          <MessageSquare size={20} />
          <span>AI Guide</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
