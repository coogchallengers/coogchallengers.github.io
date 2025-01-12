import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <header className="header">
            {/* Logo Section */}
            <div className="logo">
                <img src="images/logo.png" alt="Organization Logo" className="logo-image" />
                <span className="logo-text">Coog Challenger</span> {/* Optional text next to the logo */}
            </div>

            {/* Navigation Links */}
            <nav className="nav">
                <Link to="/" className="nav-link">Home</Link>

                <Link to="/events" className="nav-link">Events</Link>

                {/* Volunteer link to Google Form */}
                <a href="https://your-google-form-link.com" target="_blank" rel="noopener noreferrer" className="nav-link">Volunteer</a>

                <a href="https://github.com/coogchallengers" target="_blank" rel="noopener noreferrer" className="nav-link">Resources</a>

                <a href="https://linktr.ee/coogchallengers" target="_blank" rel="noopener noreferrer" className="nav-link">Connect</a>


                
            </nav>
        </header>
    );
}

export default Header;
