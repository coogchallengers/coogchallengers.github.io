import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="header">
            {/* Logo Section */}
            <div className="logo">
                <img src="images/logo.png" alt="Organization Logo" className="logo-image" />
                <span className="logo-text">Coog Challengers</span>
            </div>

            {/* Hamburger Menu for Small Screens */}
            <div className="hamburger" onClick={toggleMenu}>
                &#9776; {/* Unicode for hamburger icon */}
            </div>

            {/* Navigation Links */}
            <nav className={`nav ${menuOpen ? 'open' : ''}`}>

            {/* -----------------------------------  Home  --------------------------------*/}
                <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link>

                {/* -----------------------------------  Events  --------------------------------*/}
                <Link to="/events" className="nav-link" onClick={() => setMenuOpen(false)}>Events</Link>

                {/*<Link to="/leaderboard/data-science" className="nav-link">Data Science Leaderboard</Link>
                <Link to="/leaderboard/data-structures" className="nav-link">Data Structures Leaderboard</Link>
                <Link to="/competition/1" className="nav-link">Competition Leaderboard</Link>*/}

                {/* Leaderboard Dropdown */}
                <div className="nav-item dropdown"
                    onMouseEnter={() => setMenuOpen(true)}
                    onMouseLeave={() => setMenuOpen(false)}
                >
                    <span className="nav-link">Leaderboard ▾</span>
                    {menuOpen && (
                        <div className="dropdown-menu">
                            <Link to="/leaderboard" className="dropdown-item" onClick={() => setMenuOpen(false)}>Overall Leaderboard</Link>
                            <Link to="/leaderboard/data-science" className="dropdown-item" onClick={() => setMenuOpen(false)}>Data Science Leaderboard</Link>
                            <Link to="/leaderboard/data-structures" className="dropdown-item" onClick={() => setMenuOpen(false)}>Data Structures Leaderboard</Link>
                            {/*<Link to="/competition/1" className="dropdown-item" onClick={() => setMenuOpen(false)}>Competition Leaderboard</Link>*/}
                        </div>
                    )}
                </div>

                {/* ----------------------------------- Volunteer   --------------------------------*/}
                {/*}
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSfr-XR05EBweW-l-DabpTwZL8Ya9hCzGt01LLXt0LPjiLNCHw/viewform" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="nav-link"
                   onClick={() => setMenuOpen(false)}>T-Shirt Form</a>

                */}


                {/* -----------------------------------  Resources  --------------------------------*/}
                <a href="https://github.com/coogchallengers" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="nav-link"
                   onClick={() => setMenuOpen(false)}>Resources</a>


                {/* -----------------------------------  Connect  --------------------------------*/}
                <a href="https://linktr.ee/coogchallengers" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="nav-link"
                   onClick={() => setMenuOpen(false)}>Connect</a>
            </nav>
        </header>
    );
}

export default Header;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Header.css';

// function Header() {
//     return (
//         <header className="header">
//             {/* Logo Section */}
//             <div className="logo">
//                 <img src="images/logo.png" alt="Organization Logo" className="logo-image" />
//                 <span className="logo-text">Coog Challengers</span> {/* Optional text next to the logo */}
//             </div>

//             {/* Navigation Links */}
//             <nav className="nav">
//                 <Link to="/" className="nav-link">Home</Link>

//                 <Link to="/events" className="nav-link">Events</Link>

//                 {/* Volunteer link to Google Form */}
//                 <a href="https://docs.google.com/forms/d/e/1FAIpQLScJbcV7tG3lZus4ps4SBJ0M0ZwMJV8cI9fSnt2U86VPgpgsPA/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" className="nav-link">Volunteer</a>

//                 <a href="https://github.com/coogchallengers" target="_blank" rel="noopener noreferrer" className="nav-link">Resources</a>

//                 <a href="https://linktr.ee/coogchallengers" target="_blank" rel="noopener noreferrer" className="nav-link">Connect</a>


                
//             </nav>
//         </header>
//     );
// }

// export default Header;
